import json
import re
import csv
import html
import hashlib
from collections import defaultdict
from datetime import datetime
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parent
SERIES_DIR = ROOT / "series"
ENGAGEMENT_FILES = [
    ROOT / "engagements-txt-limoges-22-05-2026__cadet.txt",
    ROOT / "engagements-txt-limoges-22-05-2026__junior senior.txt",
    ROOT / "engagements-txt-limoges-22-05-2026 __bonus.txt",
]
LEGACY_SERIES_PDF = ROOT / "2026031226mn1_series.pdf"
PDF_2025 = ROOT / "2025060125cfe_protocolecomplet_cf-limoges-2025.pdf"
FFESSM_RECORDS = ROOT / "ffessm-records.html"
FFESSM_MPF = [
    ("M", ROOT / "ffessm-mpf-cadets.html"),
    ("F", ROOT / "ffessm-mpf-cadettes.html"),
]
QUALIFICATION_FILES = [
    ("F", ROOT / "qualifs-edf-2026.csv"),
    ("M", ROOT / "qualifs-edf-2026-hommes.csv"),
]
EDF_MEMBERS_FILE = ROOT / "Membres EDF 25S 26J.csv"
INTERNATIONAL_MEDALS_FILE = ROOT / "Médaillés EDF 2025.csv"
RESULTS_DIR = ROOT / "Résultats"
RESULT_SOURCE_FILES = [
    ("Rennes", RESULTS_DIR / "Résultats Meeting Rennes.txt"),
    ("Aix", RESULTS_DIR / "Résultats meeting Aix.txt"),
    ("Dijon", RESULTS_DIR / "Résultats Dijon France Club.txt"),
]


def source_files():
    result_files = list(RESULTS_DIR.glob("*.txt")) if RESULTS_DIR.exists() else []
    series_files = series_pdf_files()
    files = [
        SERIES_DIR,
        RESULTS_DIR,
        *ENGAGEMENT_FILES,
        *series_files,
        LEGACY_SERIES_PDF,
        PDF_2025,
        FFESSM_RECORDS,
        *(path for _, path in FFESSM_MPF),
        *(path for _, path in QUALIFICATION_FILES),
        EDF_MEMBERS_FILE,
        INTERNATIONAL_MEDALS_FILE,
        *result_files,
    ]
    return [path for path in files if path.exists()]


def series_pdf_files():
    if SERIES_DIR.exists():
        return sorted(
            SERIES_DIR.glob("*.pdf"),
            key=lambda path: path.stat().st_mtime_ns,
        )
    if LEGACY_SERIES_PDF.exists():
        return [LEGACY_SERIES_PDF]
    return []


def active_series_pdf():
    pdfs = series_pdf_files()
    return pdfs[-1] if pdfs else None


def series_source_label(path):
    if not path:
        return ""
    return "Séries"


def parse_series_meet_metadata(reader):
    lines = []
    for page in reader.pages[:2]:
        for line in (page.extract_text() or "").splitlines():
            line = re.sub(r"\s+", " ", line.strip())
            if line:
                lines.append(line)
        if len(lines) >= 2:
            break

    competition = ""
    city = ""
    year = ""
    first_line = lines[0] if lines else ""
    if first_line:
        combined_match = re.match(r"^FFESSM\s+(.+?)\s+CNNP\s*([A-Za-zÀ-ÖØ-öø-ÿ' -]+)\s+-\s+(.+)$", first_line, flags=re.I)
        glued_match = re.match(r"^FFESSM\s+(.+?)\s+CNNP([A-Za-zÀ-ÖØ-öø-ÿ' -]+?)\s+-\s+(.+)$", first_line, flags=re.I)
        match = combined_match or glued_match
        if match:
            competition = match.group(1).strip()
            city = match.group(2).strip()
            year_match = re.search(r"\b(20\d{2})\b", match.group(3))
            if year_match:
                year = year_match.group(1)
        else:
            competition = re.sub(r"^FFESSM\s+", "", first_line, flags=re.IGNORECASE).strip()
            competition = re.sub(r"\s+CNNP$", "", competition, flags=re.IGNORECASE).strip()
    if len(lines) > 1 and not city:
        city = re.split(r"\s+-\s+", lines[1], maxsplit=1)[0].strip()
        year_match = re.search(r"\b(20\d{2})\b", lines[1])
        if year_match:
            year = year_match.group(1)
    if year and year not in competition:
        competition = f"{competition} {year}".strip()

    return {
        "name": competition or "Séries importées",
        "city": city,
        "year": year,
    }


def source_version():
    digest = hashlib.sha1()
    for path in sorted(source_files(), key=lambda item: item.name.lower()):
        stat = path.stat()
        digest.update(path.name.encode("utf-8", errors="ignore"))
        digest.update(str(stat.st_size).encode())
        digest.update(str(stat.st_mtime_ns).encode())
    return digest.hexdigest()


def result_file_names():
    if not RESULTS_DIR.exists():
        return []
    return [path.name for path in sorted(RESULTS_DIR.glob("*.txt"), key=lambda item: item.name.lower())]

EVENTS = {
    "50AP": ("50 m apnée", "50 m", "Apnée"),
    "50SF": ("50 m surface", "50 m", "Surface"),
    "100SF": ("100 m surface", "100 m", "Surface"),
    "200SF": ("200 m surface", "200 m", "Surface"),
    "400SF": ("400 m surface", "400 m", "Surface"),
    "800SF": ("800 m surface", "800 m", "Surface"),
    "1500SF": ("1500 m surface", "1500 m", "Surface"),
    "100IS": ("100 m immersion", "100 m", "Immersion"),
    "200IS": ("200 m immersion", "200 m", "Immersion"),
    "400IS": ("400 m immersion", "400 m", "Immersion"),
    "50BI": ("50 m bipalmes", "50 m", "Bipalmes"),
    "100BI": ("100 m bipalmes", "100 m", "Bipalmes"),
    "200BI": ("200 m bipalmes", "200 m", "Bipalmes"),
    "400BI": ("400 m bipalmes", "400 m", "Bipalmes"),
    "4X50SF": ("4x50 m surface", "4x50 m", "Relais surface"),
    "4X100SF": ("4x100 m surface", "4x100 m", "Relais surface"),
    "4X200SF": ("4x200 m surface", "4x200 m", "Relais surface"),
    "4X100BI": ("4x100 m bipalmes", "4x100 m", "Relais bipalmes"),
    "4X100BIX": ("4x100 m bipalmes mixte", "4x100 m", "Relais bipalmes"),
    "4X100SB": ("4x100 m SB mixte", "4x100 m", "Relais SB"),
}

PDF_EVENT_TO_ID = {
    "50m Apnee": "50AP",
    "50m Apnée": "50AP",
    "50m Surface": "50SF",
    "100m Surface": "100SF",
    "200m Surface": "200SF",
    "400m Surface": "400SF",
    "800m Surface": "800SF",
    "1500m Surface": "1500SF",
    "100m Immersion": "100IS",
    "200m Immersion": "200IS",
    "400m Immersion": "400IS",
    "50m Bipalmes": "50BI",
    "100m Bipalmes": "100BI",
    "200m Bipalmes": "200BI",
    "400m Bipalmes": "400BI",
    "4x50m Surface": "4X50SF",
    "4x100m Surface": "4X100SF",
    "4x200m Surface": "4X200SF",
    "4x100m Bipalmes": "4X100BIX",
    "4x100m SB": "4X100SB",
}

PDF_SERIES_EVENT_TO_ID = {
    "50m Apnée": "50AP",
    "50m Apnee": "50AP",
    "50m Surface": "50SF",
    "100m Surface": "100SF",
    "200m Surface": "200SF",
    "400m Surface": "400SF",
    "800m Surface": "800SF",
    "1500m Surface": "1500SF",
    "100m Immersion": "100IS",
    "200m Immersion": "200IS",
    "400m Immersion": "400IS",
    "50m Bipalmes": "50BI",
    "100m Bipalmes": "100BI",
    "200m Bipalmes": "200BI",
    "400m Bipalmes": "400BI",
    "4x50m Surface": "4X50SF",
    "4x100m Surface": "4X100SF",
    "4x200m Surface": "4X200SF",
    "4x100m Bipalmes": "4X100BIX",
    "4x100m SB": "4X100SB",
}

CATEGORY_LABELS = {
    "CA": "Cadet",
    "JU": "Junior",
    "SE": "Senior",
}


def sex_label(code):
    return "F" if str(code).startswith("F") else "M"


def category_label(code):
    code = str(code or "")
    if "MI" in code:
        return "Minime"
    if "CA" in code:
        return "Cadet"
    if "JU" in code:
        return "Junior"
    if "SE" in code:
        return "Senior"
    return code or "Non classe"


def is_relay_event(event_id):
    return str(event_id or "").upper().startswith("4X")


def is_mixed_relay_event(event_id):
    return str(event_id or "").lower() in {"4x100bix", "4x100sb"}


def format_seed_time(raw):
    digits = re.sub(r"\D", "", str(raw or ""))
    if not digits or set(digits) == {"0"}:
        return ""
    digits = digits.zfill(6)
    cent = digits[-2:]
    seconds = int(digits[-4:-2])
    minutes = int(digits[:-4] or "0")
    return f"{minutes:02d}:{seconds:02d}.{cent}"


def normalize_pdf_series_time(value):
    value = str(value or "").strip().replace(",", ".")
    if not value:
        return ""
    parts = value.split(":")
    if len(parts) == 3:
        return f"{int(parts[0]):02d}:{int(parts[1]):02d}.{int(parts[2]):02d}"
    if len(parts) == 2:
        return f"{int(parts[0]):02d}:{float(parts[1]):05.2f}"
    try:
        seconds = float(value)
        minutes = int(seconds // 60)
        rest = seconds - minutes * 60
        return f"{minutes:02d}:{rest:05.2f}"
    except ValueError:
        return value


def birth_year_from_two_digits(value):
    year = int(value)
    return 2000 + year if year < 30 else 1900 + year


def normalize_result_time(value):
    value = str(value or "").strip().replace(",", ".")
    if not value or value in {"00.00", "0", "0.00", ":."}:
        return ""
    parts = value.split(":")
    try:
        if len(parts) == 2:
            minutes = int(parts[0])
            seconds = float(parts[1])
            return f"{minutes:02d}:{seconds:05.2f}"
        seconds = float(value)
        minutes = int(seconds // 60)
        rest = seconds - minutes * 60
        return f"{minutes:02d}:{rest:05.2f}"
    except ValueError:
        return ""


def time_to_centiseconds(value):
    if not value:
        return 10**12
    value = str(value).replace(",", ".")
    parts = value.split(":")
    try:
        if len(parts) == 3:
            minutes = int(parts[0]) * 60 + int(parts[1])
            seconds = float(parts[2])
        elif len(parts) == 2:
            minutes = int(parts[0])
            seconds = float(parts[1])
        else:
            minutes = 0
            seconds = float(parts[0])
    except ValueError:
        return 10**12
    return int(round((minutes * 60 + seconds) * 100))


def normalize_person_key(last_name, first_name, sex):
    text = f"{last_name or ''} {first_name or ''}"
    text = (
        html.unescape(text)
        .replace("-", " ")
        .replace("'", " ")
        .lower()
    )
    replacements = str.maketrans(
        "àâäéèêëîïôöùûüçñ",
        "aaaeeeeiioouuucn",
    )
    text = text.translate(replacements)
    text = re.sub(r"[^a-z ]", " ", text)
    text = re.sub(r"\bgabriel\s+allain\b|\ballain\s+gabriel\b", "gabryel allain", text)
    text = re.sub(r"\bmatheo\s+baglio\b|\bbaglio\s+matheo\b", "mattheo baglio", text)
    tokens = sorted(token for token in text.split() if token)
    return f"{sex}|{' '.join(tokens)}"


def normalize_sex(value):
    value = str(value or "").strip().upper()
    if value in {"F", "FEMME", "FEMMES"}:
        return "F"
    return "M"


def parse_engagements():
    clubs = {}
    entrants = []
    seen = set()
    seed_sources = parse_result_sources()

    for path in ENGAGEMENT_FILES:
        current_club = None
        for line in path.read_text(encoding="utf-8").splitlines():
            parts = line.split(";")
            if not parts:
                continue
            if parts[0] == "CLU" and len(parts) >= 4:
                current_club = parts[1]
                clubs[current_club] = parts[2]
            elif parts[0] == "NAG" and len(parts) >= 11 and parts[7] != "REL":
                event_id = parts[7]
                if event_id not in EVENTS:
                    continue
                sex = parts[4]
                cat_code = parts[9]
                seed_time = format_seed_time(parts[8])
                key = (parts[1], parts[2], parts[3], sex, parts[5], event_id, cat_code, seed_time)
                if key in seen:
                    continue
                seen.add(key)
                entrants.append(
                    {
                        "eventId": event_id.lower(),
                        "sex": sex,
                        "lane": "",
                        "lastName": parts[1].title(),
                        "firstName": parts[2],
                        "birthDate": parts[3],
                        "swimmerId": f"{parts[1].lower()}|{parts[2].lower()}|{parts[3]}|{sex}",
                        "club": clubs.get(parts[5], current_club or parts[5]),
                        "clubCode": parts[5],
                        "category": category_label(cat_code),
                        "categoryCode": cat_code,
                        "seedTime": seed_time,
                        "seedSource": seed_sources.get((parts[3], sex, event_id.lower(), seed_time), "régional"),
                        "note": "",
                    }
                )

    entrants.sort(key=lambda item: (item["eventId"], item["sex"], time_to_centiseconds(item["seedTime"]), item["lastName"]))
    lanes_by_race = defaultdict(int)
    for entrant in entrants:
        key = (entrant["eventId"], entrant["sex"])
        lanes_by_race[key] += 1
        entrant["lane"] = lanes_by_race[key]
    return entrants


def split_pdf_person_name(value):
    tokens = str(value or "").split()
    first_index = len(tokens) - 1
    for index, token in enumerate(tokens):
        letters = re.sub(r"[^A-Za-zÀ-ÖØ-öø-ÿ-]", "", token)
        if letters and not letters.isupper():
            first_index = index
            break
    last = " ".join(tokens[:first_index]).title()
    first = " ".join(tokens[first_index:])
    return last, first


def parse_mn1_series_pdf(series_pdf=None):
    series_pdf = series_pdf or active_series_pdf()
    if not series_pdf:
        return None
    seed_sources = parse_result_sources()
    reader = PdfReader(str(series_pdf))
    meet = parse_series_meet_metadata(reader)
    entrants = []
    series_rows = []
    program = []
    seen_events = set()
    seen_entries = set()
    current = None
    pending_final = None
    current_order = 0
    current_session = {"number": "", "label": ""}

    title_pattern = re.compile(r"^(.+?) - Seniors (Femmes|Hommes)(?:(?: - Finale\(s\).*)|(?: Meilleure série.*))?$")
    final_title_pattern = re.compile(r"^(.+?) - (?:Seniors )?(Femmes|Hommes|Mixte).*Finale.*?(?:Horaire indicatif : (\d{2}:\d{2}))?.*$")
    final_heat_pattern = re.compile(r"^finale\s+([AB])\s+Horaire indicatif : (\d{2}:\d{2})(?: \((\d+)\))?", flags=re.I)
    relay_title_pattern = re.compile(r"^(.+?) - (Femmes|Hommes|Mixte)(?: Meilleure série.*)?$")
    heat_pattern = re.compile(r"^série: (\d+) / (\d+) Horaire indicatif : (\d{2}:\d{2})(?: \((\d+)\))?")
    swimmer_pattern = re.compile(r"^(\d+)\s+(.+?)\s+(\d{2})\s+([FH][A-Z0-9+]+)\s+(\S+)\s+([0-9:.]+)(?:\s+IN)?$")
    speaker_swimmer_pattern = re.compile(r"^(\d+)\s+(.+?)\s+(\d{2})\s+([FH][A-Z0-9+]+)\s+\*\s+(\S+)\s+([0-9:.]+)(.*)$")

    for page in reader.pages:
        for line in (page.extract_text() or "").splitlines():
            line = re.sub(r"\s+", " ", line.strip())
            if not line:
                continue
            session_match = re.search(r"\bSession\s*(\d+)\b", line)
            if session_match:
                current_session = {**current_session, "number": session_match.group(1)}
                continue
            if "Session du" in line or "Session de l" in line:
                current_session = {**current_session, "label": line}
                continue

            final_match = final_title_pattern.match(line)
            if final_match:
                label, sex_label_text, start_time = final_match.groups()
                event_id = PDF_SERIES_EVENT_TO_ID.get(label)
                if event_id:
                    sex = {"Femmes": "F", "Hommes": "M", "Mixte": "X"}[sex_label_text]
                    pending_final = {
                        "eventId": event_id.lower(),
                        "sex": sex,
                        "baseLabel": EVENTS[event_id][0],
                        "startTime": start_time or "",
                    }
                current = None
                continue

            final_heat_match = final_heat_pattern.match(line)
            if final_heat_match and pending_final:
                final_letter, start_time, heat_order = final_heat_match.groups()
                current_order += 1
                stage = f"finale-{final_letter.upper()}"
                label = f"{pending_final['baseLabel']} - Finale {final_letter.upper()}"
                program.append(
                    {
                        "eventId": pending_final["eventId"],
                        "sex": pending_final["sex"],
                        "order": current_order,
                        "label": label,
                        "session": current_session.get("number", ""),
                        "sessionLabel": current_session.get("label", ""),
                        "stage": stage,
                        "startTime": start_time,
                        "hasEntrants": True,
                    }
                )
                current = {
                    "eventId": pending_final["eventId"],
                    "sex": pending_final["sex"],
                    "series": 1 if final_letter.upper() == "A" else 2,
                    "seriesCount": 1,
                    "heatOrder": int(heat_order or current_order),
                    "startTime": start_time,
                    "isRelay": is_relay_event(pending_final["eventId"]),
                    "session": current_session.get("number", ""),
                    "sessionLabel": current_session.get("label", ""),
                    "stage": stage,
                }
                pending_final = None
                continue

            title_match = title_pattern.match(line)
            relay_title_match = relay_title_pattern.match(line)
            if title_match or relay_title_match:
                pending_final = None
                label, sex_label_text = (title_match or relay_title_match).groups()
                if "Finale" in line:
                    current = None
                    continue
                event_id = PDF_SERIES_EVENT_TO_ID.get(label)
                if not event_id:
                    current = None
                    continue
                sex = {"Femmes": "F", "Hommes": "M", "Mixte": "X"}[sex_label_text]
                key = (event_id.lower(), sex, current_session.get("number", ""), "series")
                if key not in seen_events:
                    current_order += 1
                    seen_events.add(key)
                    stage = "meilleure-serie" if "Meilleure série" in line else "series"
                    program.append(
                        {
                            "eventId": event_id.lower(),
                            "sex": sex,
                            "order": current_order,
                            "label": f"{EVENTS[event_id][0]} - Meilleure série" if stage == "meilleure-serie" else EVENTS[event_id][0],
                            "session": current_session.get("number", ""),
                            "sessionLabel": current_session.get("label", ""),
                            "stage": stage,
                            "hasEntrants": True,
                        }
                    )
                current = {
                    "eventId": event_id.lower(),
                    "sex": sex,
                    "series": None,
                    "seriesCount": None,
                    "heatOrder": None,
                    "startTime": "",
                    "isRelay": is_relay_event(event_id),
                    "session": current_session.get("number", ""),
                    "sessionLabel": current_session.get("label", ""),
                }
                continue

            heat_match = heat_pattern.match(line)
            if heat_match and current:
                number, total, start_time, heat_order = heat_match.groups()
                heat_order = heat_order or len({(row["eventId"], row["sex"], row["series"]) for row in series_rows}) + 1
                current = {
                    **current,
                    "series": int(number),
                    "seriesCount": int(total),
                    "startTime": start_time,
                    "heatOrder": int(heat_order),
                    "stage": current.get("stage", "series"),
                }
                continue

            swimmer_match = swimmer_pattern.match(line)
            speaker_match = speaker_swimmer_pattern.match(line)
            relay_match = relay_swimmer_pattern.match(line) if "relay_swimmer_pattern" in locals() else None
            if current and current.get("isRelay") and current["series"]:
                relay_match = re.match(r"^(\d+)\s+(.+?)\s+(?:(?P<cat>[FHX][A-Z0-9+]+)\s+)?(?:\*\s+)?(?P<club>[A-Z0-9]+)\s+(?P<time>[0-9:.]+)(?P<full>.*)$", line)
            if relay_match and current and current["series"]:
                lane = relay_match.group(1)
                raw_name = relay_match.group(2).strip()
                birth = ""
                cat_code = relay_match.group("cat") or ("XSE" if current["sex"] == "X" else ("FSE" if current["sex"] == "F" else "HSE"))
                club = relay_match.group("club")
                seed_time = relay_match.group("time")
                full_club = relay_match.group("full").strip() or raw_name
                last_name, first_name = raw_name, ""
                birth_year = ""
                swimmer_id = f"relay|{current['eventId']}|{current['sex']}|{club.lower()}|{lane}|{current['series']}"
            elif swimmer_match and current and current["series"]:
                lane, raw_name, birth, cat_code, club, seed_time = swimmer_match.groups()
                full_club = club
                last_name, first_name = split_pdf_person_name(raw_name)
                birth_year = birth_year_from_two_digits(birth)
                swimmer_id = f"{last_name.lower()}|{first_name.lower()}|{birth_year}|{current['sex']}"
            elif speaker_match and current and current["series"]:
                lane, raw_name, birth, cat_code, club, seed_time, full_club = speaker_match.groups()
                full_club = full_club.strip() or club
                last_name, first_name = split_pdf_person_name(raw_name)
                birth_year = birth_year_from_two_digits(birth)
                swimmer_id = f"{last_name.lower()}|{first_name.lower()}|{birth_year}|{current['sex']}"
            else:
                continue

            if current and current["series"]:
                seed_time = normalize_pdf_series_time(seed_time)
                seed_source = seed_sources.get(("person", normalize_person_key(last_name, first_name, current["sex"]), current["eventId"], seed_time), "")
                key = (current["eventId"], current["sex"], swimmer_id)
                key = (current["eventId"], current["sex"], current.get("session", ""), swimmer_id)
                if key not in seen_entries:
                    seen_entries.add(key)
                    entrants.append(
                        {
                            "eventId": current["eventId"],
                            "sex": current["sex"],
                            "lane": int(lane),
                            "lastName": last_name,
                            "firstName": first_name,
                            "birthDate": str(birth_year),
                            "swimmerId": swimmer_id,
                            "club": full_club,
                            "clubCode": club,
                            "category": category_label(cat_code),
                            "categoryCode": cat_code,
                            "seedTime": seed_time,
                            "seedSource": seed_source,
                            "session": current.get("session", ""),
                            "sessionLabel": current.get("sessionLabel", ""),
                            "note": "",
                        }
                    )
                series_rows.append(
                    {
                        "eventId": current["eventId"],
                        "sex": current["sex"],
                        "swimmerId": swimmer_id,
                        "series": current["series"],
                        "seriesCount": current["seriesCount"],
                        "line": int(lane),
                        "startTime": current["startTime"],
                        "heatOrder": current["heatOrder"],
                        "session": current.get("session", ""),
                        "sessionLabel": current.get("sessionLabel", ""),
                        "stage": current.get("stage", "series"),
                    }
                )

    return {
        "entrants": entrants,
        "series": series_rows,
        "program": program,
        "sourceFile": series_pdf.name,
        "sourceName": series_source_label(series_pdf),
        "meet": meet,
    }


def parsed_sessions(parsed):
    sessions = {
        str(row.get("session", ""))
        for section in ("entrants", "series", "program")
        for row in parsed.get(section, [])
        if row.get("session")
    }
    return sorted(sessions, key=lambda value: int(value) if value.isdigit() else 999)


def normalize_program_order(program):
    ordered = sorted(
        program,
        key=lambda row: (
            int(row.get("session") or 0) if str(row.get("session") or "").isdigit() else 0,
            Number_like(row.get("order"), 9999),
            Number_like(row.get("heatOrder"), 9999),
        ),
    )
    for index, row in enumerate(ordered, start=1):
        row["order"] = index
    return ordered


def Number_like(value, fallback):
    try:
        return int(value)
    except (TypeError, ValueError):
        return fallback


def merge_series_documents(parsed_documents):
    if not parsed_documents:
        return None
    base = parsed_documents[0]
    merged = {
        "entrants": [dict(row) for row in base.get("entrants", [])],
        "series": [dict(row) for row in base.get("series", [])],
        "program": [dict(row) for row in base.get("program", [])],
        "sourceFile": base.get("sourceFile", ""),
        "sourceName": base.get("sourceName", "Séries"),
        "meet": base.get("meet") or {"name": "Séries importées", "city": ""},
    }

    applied_files = [base.get("sourceFile", "")]
    for parsed in parsed_documents[1:]:
        sessions = parsed_sessions(parsed)
        applied_files.append(parsed.get("sourceFile", ""))
        if not sessions:
            merged = {
                "entrants": [dict(row) for row in parsed.get("entrants", [])],
                "series": [dict(row) for row in parsed.get("series", [])],
                "program": [dict(row) for row in parsed.get("program", [])],
                "sourceFile": parsed.get("sourceFile", ""),
                "sourceName": parsed.get("sourceName", "Séries"),
                "meet": parsed.get("meet") or merged.get("meet"),
            }
            continue

        session_set = set(sessions)
        for section in ("entrants", "series", "program"):
            merged[section] = [
                row for row in merged[section]
                if str(row.get("session", "")) not in session_set
            ]
            merged[section].extend(dict(row) for row in parsed.get(section, []))
        if parsed.get("meet", {}).get("name"):
            merged["meet"] = parsed["meet"]

    merged["program"] = normalize_program_order(merged["program"])
    merged["sourceFile"] = ", ".join(file for file in applied_files if file)
    return merged


def parse_series_documents():
    parsed = []
    for series_pdf in series_pdf_files():
        document = parse_mn1_series_pdf(series_pdf)
        if document and document["entrants"]:
            parsed.append(document)
    return merge_series_documents(parsed)


def parse_result_sources():
    sources = {}
    labeled_paths = list(RESULT_SOURCE_FILES)
    if RESULTS_DIR.exists():
        known_paths = {path.resolve() for _, path in labeled_paths if path.exists()}
        for path in sorted(RESULTS_DIR.glob("*.txt"), key=lambda item: item.name.lower()):
            if path.resolve() not in known_paths:
                labeled_paths.append((path.stem.replace("Résultats", "").replace("meeting", "").strip() or path.stem, path))

    for label, path in labeled_paths:
        if not path.exists():
            continue
        for line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
            parts = line.split(";")
            if len(parts) < 17 or parts[0] != "NAG":
                continue
            event_id = parts[7].strip().lower()
            if event_id.upper() not in EVENTS:
                continue
            status = parts[10].strip()
            final_time = normalize_result_time(parts[15])
            if status != "NAG" or not final_time:
                continue
            key = (parts[3].strip(), parts[4].strip(), event_id, final_time)
            sources.setdefault(key, label)
            person_key = normalize_person_key(parts[1], parts[2], parts[4].strip())
            sources.setdefault(("person", person_key, event_id, final_time), label)
    return sources


def parse_qualifications():
    qualifications = []
    for sex, path in QUALIFICATION_FILES:
        if not path.exists():
            continue
        with path.open(encoding="utf-8-sig", newline="") as handle:
            rows = list(csv.reader(handle))

        in_2026 = False
        headers = []
        for row in rows:
            title = row[0].strip() if row else ""
            if title.startswith("2026"):
                in_2026 = True
                continue
            if title.startswith("2025"):
                in_2026 = False
                continue
            if not in_2026:
                continue
            if len(row) > 2 and row[1].strip() == "TSP" and row[2].strip() == "TRP":
                headers = row
                continue
            event_label = title.replace(" ", "")
            event_id = event_label.upper()
            if event_id not in EVENTS:
                continue
            for index in (1, 2):
                if index >= len(row) or not row[index].strip():
                    continue
                qualifications.append(
                    {
                        "eventId": event_id.lower(),
                        "sex": sex,
                        "label": headers[index].strip() if index < len(headers) else ("TSP" if index == 1 else "TRP"),
                        "scope": "Senior",
                        "time": format_seed_time(row[index]),
                    }
                )
    return qualifications


def parse_edf_members():
    members = []
    if not EDF_MEMBERS_FILE.exists():
        return members
    with EDF_MEMBERS_FILE.open(encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle):
            label = (row.get("EDF") or "").strip()
            if not label:
                continue
            sex = normalize_sex(row.get("SEXE"))
            team_type = "J" if " J " in f" {label.upper()} " else "S"
            members.append(
                {
                    "lastName": (row.get("NOM") or "").strip().title(),
                    "firstName": (row.get("PRENOM") or "").strip(),
                    "sex": sex,
                    "label": label,
                    "team": team_type,
                    "personKey": normalize_person_key(row.get("NOM"), row.get("PRENOM"), sex),
                }
            )
    return members


def parse_international_medals():
    medals = []
    if not INTERNATIONAL_MEDALS_FILE.exists():
        return medals
    with INTERNATIONAL_MEDALS_FILE.open(encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle):
            sex = normalize_sex(row.get("SEXE"))
            event_id = re.sub(r"\s+", "", row.get("COURSE") or "").upper()
            medals.append(
                {
                    "lastName": (row.get("NOM") or "").strip().title(),
                    "firstName": (row.get("PRENOM") or "").strip(),
                    "sex": sex,
                    "eventId": event_id.lower(),
                    "eventLabel": event_id,
                    "time": format_seed_time(row.get("Temps")),
                    "medal": (row.get("Médaille") or "").strip().title(),
                    "championship": (row.get("Championnat") or "").strip().upper(),
                    "personKey": normalize_person_key(row.get("NOM"), row.get("PRENOM"), sex),
                }
            )
    return medals


def clean_html_text(value):
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def parse_record_rows(block):
    rows = []
    for row_html in re.findall(r"<tr[^>]*>(.*?)</tr>", block, flags=re.I | re.S):
        if "colspan" in row_html.lower():
            continue
        cells = re.findall(r"<td[^>]*>(.*?)</td>", row_html, flags=re.I | re.S)
        if len(cells) < 6:
            continue
        event_id = clean_html_text(cells[0]).upper()
        if event_id not in EVENTS:
            continue
        time = clean_html_text(cells[1])
        if not time or time == ":.":
            continue
        club = clean_html_text(cells[3]).upper()
        if is_relay_event(event_id) and club.replace(" ", "").replace(".", "") in {"EDF", "EDFJ"}:
            continue
        rows.append(
            {
                "eventId": event_id.lower(),
                "time": time,
                "holder": clean_html_text(cells[2]).title(),
                "club": club,
                "date": clean_html_text(cells[4]),
                "place": clean_html_text(cells[5]),
            }
        )
    return rows


def parse_ffessm_records():
    records = []

    for sex, path in FFESSM_MPF:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for row in parse_record_rows(text):
            record_sex = "X" if is_mixed_relay_event(row["eventId"]) and sex == "M" else sex
            if is_mixed_relay_event(row["eventId"]) and sex != "M":
                continue
            records.append(
                {
                    **row,
                    "sex": record_sex,
                    "category": "Cadet",
                    "label": "Meilleure performance cadette" if sex == "F" else "Meilleure performance cadet",
                    "source": "FFESSM MPF",
                }
            )

    if FFESSM_RECORDS.exists():
        text = FFESSM_RECORDS.read_text(encoding="utf-8", errors="ignore")
        panel_pattern = re.compile(
            r"<h4[^>]*panel-title[^>]*>(.*?)</h4>.*?<table[^>]*>(.*?)</table>",
            flags=re.I | re.S,
        )
        for title_html, block in panel_pattern.findall(text):
            title = clean_html_text(title_html)
            if title not in {"Jeunes Hommes", "Jeunes Femmes", "Toutes catégories Hommes", "Toutes catégories Femmes"}:
                continue
            sex = "F" if "Femmes" in title else "M"
            category = "Junior" if "Jeunes" in title else "Senior"
            label = "Record de France junior" if category == "Junior" else "Record de France senior"
            for row in parse_record_rows(block):
                record_sex = "X" if is_mixed_relay_event(row["eventId"]) and sex == "M" else sex
                if is_mixed_relay_event(row["eventId"]) and sex != "M":
                    continue
                records.append(
                    {
                        **row,
                        "sex": record_sex,
                        "category": category,
                        "label": label,
                        "source": "FFESSM Records de France",
                    }
                )

    deduped = {}
    for record in records:
        key = (record["eventId"], record["sex"], record["category"], record["label"])
        current = deduped.get(key)
        if current is None or time_to_centiseconds(record["time"]) < time_to_centiseconds(current["time"]):
            deduped[key] = record
    return sorted(deduped.values(), key=lambda row: (row["eventId"], row["sex"], row["category"]))


def parse_pdf_top_2025():
    reader = PdfReader(str(PDF_2025))
    current_event = None
    swimmers = {}
    time_pattern = re.compile(r"^\d{1,2}:\d{2}(?::\d{2})?(?:\.\d{2})?$|^\d{1,2}\.\d{2}$")
    result_pattern = re.compile(r"^(\d+)\s+(.+?)\s+(\d{2})\s+([FH](?:CA|JU|SE))\s+\*\s+([A-Z0-9]+)\s+(.+)$")

    for page in reader.pages[9:46]:
        for line in (page.extract_text() or "").splitlines():
            line = line.strip()
            if not line:
                continue

            for pdf_name, event_id in PDF_EVENT_TO_ID.items():
                if line.startswith(pdf_name):
                    current_event = event_id
                    break
            else:
                if not current_event:
                    continue
                match = result_pattern.match(line)
                if not match:
                    continue
                rank, raw_name, birth_year, cat_code, club_code, tail = match.groups()
                if current_event.startswith("4x"):
                    continue
                tokens = tail.replace("(en finale)", "").split()
                times = [token for token in tokens if time_pattern.match(token)]
                if not times:
                    continue
                final_time = times[-1]
                sex = sex_label(cat_code)
                category = category_label(cat_code)
                key = (current_event.lower(), sex, category, raw_name, club_code)
                current = swimmers.get(key)
                if current and time_to_centiseconds(current["time"]) <= time_to_centiseconds(final_time):
                    continue
                swimmers[key] = {
                    "eventId": current_event.lower(),
                    "sex": sex,
                    "category": category,
                    "name": raw_name.title(),
                    "club": club_code,
                    "time": normalize_pdf_time(final_time),
                }

    grouped = defaultdict(list)
    for row in swimmers.values():
        grouped[(row["eventId"], row["sex"], row["category"])].append(row)

    top_rows = []
    for key, rows in grouped.items():
        rows.sort(key=lambda row: time_to_centiseconds(row["time"]))
        for index, row in enumerate(rows[:5], start=1):
            top_rows.append({**row, "rank": index})
    top_rows.sort(key=lambda row: (row["eventId"], row["sex"], row["category"], row["rank"]))
    return top_rows


def normalize_pdf_time(value):
    value = str(value)
    if ":" not in value:
        return f"00:{value.zfill(5)}"
    parts = value.split(":")
    if len(parts) == 2:
        return f"{int(parts[0]):02d}:{parts[1].zfill(5)}"
    return value


def build_data():
    mn1_series = parse_series_documents()
    if mn1_series and mn1_series["entrants"]:
        entrants = mn1_series["entrants"]
        series = mn1_series["series"]
        program = mn1_series["program"]
        event_ids = []
        for row in program:
            code = row["eventId"].upper()
            if code not in event_ids:
                event_ids.append(code)
        source_name = mn1_series.get("sourceName") or "Séries"
        meet = mn1_series.get("meet") or {"name": "Séries importées", "city": ""}
        notes = {
            "sourceMode": "series",
            "sourceLabel": source_name if source_name.lower().startswith("séries") else f"Séries : {source_name}",
            "sourceFile": mn1_series.get("sourceFile", ""),
        }
    else:
        entrants = parse_engagements()
        series = []
        program = []
        event_ids = sorted({item["eventId"].upper() for item in entrants}, key=lambda code: list(EVENTS).index(code))
        meet = {"name": "Championnat de France 2026", "city": "Limoges"}
        notes = {
            "sourceMode": "engagements",
            "sourceLabel": "Engagements France 2026",
            "sourceFile": "",
        }

    notes.update(
        {
            "generatedAt": datetime.now().strftime("%d/%m/%Y %H:%M"),
            "seriesFiles": [path.name for path in series_pdf_files()],
            "resultFiles": result_file_names(),
            "entrantCount": len(entrants),
            "seriesLineCount": len(series),
            "programCount": len(program),
        }
    )

    events = [
        {
            "id": code.lower(),
            "label": EVENTS[code][0],
            "distance": EVENTS[code][1],
            "discipline": EVENTS[code][2],
        }
        for code in event_ids
    ]

    return {
        "meet": meet,
        "events": events,
        "entrants": entrants,
        "series": series,
        "program": program,
        "qualifications": parse_qualifications(),
        "top2025": parse_pdf_top_2025(),
        "records": parse_ffessm_records(),
        "edfMembers": parse_edf_members(),
        "internationalMedals": parse_international_medals(),
        "sourceVersion": source_version(),
        "notes": notes,
    }


def main():
    data = build_data()
    json_text = json.dumps(data, ensure_ascii=False, indent=2)
    (ROOT / "donnees-speaker-france-2026.json").write_text(json_text, encoding="utf-8")
    (ROOT / "data.generated.js").write_text("window.SPEAKER_DATA = " + json_text + ";\n", encoding="utf-8")
    print(f"{len(data['events'])} epreuves")
    print(f"{len(data['entrants'])} engagements individuels")
    print(f"{len(data['top2025'])} lignes Top 2025")


if __name__ == "__main__":
    main()
