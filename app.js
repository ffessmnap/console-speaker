const STORAGE_KEY = "napSpeakerFrance2026:v15";

const fallbackData = {
  meet: {
    name: "Championnat de France 2026",
    city: "Limoges"
  },
  events: [
    { id: "50sf", label: "50 m surface", distance: "50 m", discipline: "Surface" },
    { id: "100sf", label: "100 m surface", distance: "100 m", discipline: "Surface" },
    { id: "200sf", label: "200 m surface", distance: "200 m", discipline: "Surface" },
    { id: "400is", label: "400 m immersion", distance: "400 m", discipline: "Immersion" }
  ],
  entrants: [
    { eventId: "50sf", sex: "F", lane: 4, lastName: "Martin", firstName: "Lea", club: "Limoges NAP", category: "Junior", seedTime: "00:19.72", note: "Finaliste 2025 junior" },
    { eventId: "50sf", sex: "F", lane: 5, lastName: "Bernard", firstName: "Ines", club: "Pays d'Aix", category: "Senior", seedTime: "00:19.41", note: "Proche du temps EDF" },
    { eventId: "50sf", sex: "F", lane: 3, lastName: "Roux", firstName: "Camille", club: "CS Gravenchon", category: "Cadet", seedTime: "00:20.08", note: "Meilleure perf d'engagement cadette" },
    { eventId: "50sf", sex: "M", lane: 4, lastName: "Petit", firstName: "Nolan", club: "Pessac", category: "Senior", seedTime: "00:16.84", note: "Tete de serie" },
    { eventId: "50sf", sex: "M", lane: 5, lastName: "Leroy", firstName: "Hugo", club: "ASPTT Lille", category: "Junior", seedTime: "00:17.21", note: "" },
    { eventId: "100sf", sex: "F", lane: 4, lastName: "Bernard", firstName: "Ines", club: "Pays d'Aix", category: "Senior", seedTime: "00:43.12", note: "Reference nationale" },
    { eventId: "100sf", sex: "F", lane: 5, lastName: "Martin", firstName: "Lea", club: "Limoges NAP", category: "Junior", seedTime: "00:44.08", note: "Depart rapide" },
    { eventId: "100sf", sex: "M", lane: 4, lastName: "Petit", firstName: "Nolan", club: "Pessac", category: "Senior", seedTime: "00:37.02", note: "" },
    { eventId: "200sf", sex: "F", lane: 4, lastName: "Faure", firstName: "Sarah", club: "Toulouse OAC", category: "Senior", seedTime: "01:36.72", note: "Gros finish" },
    { eventId: "400is", sex: "M", lane: 4, lastName: "Moreau", firstName: "Adam", club: "Lyon Palme", category: "Senior", seedTime: "03:05.18", note: "A surveiller aux 300 m" }
  ],
  qualifications: [
    { eventId: "50sf", sex: "F", label: "France senior", time: "00:19.35" },
    { eventId: "50sf", sex: "M", label: "France senior", time: "00:16.75" },
    { eventId: "100sf", sex: "F", label: "France senior", time: "00:42.90" },
    { eventId: "100sf", sex: "M", label: "France senior", time: "00:36.80" },
    { eventId: "200sf", sex: "F", label: "France senior", time: "01:35.80" },
    { eventId: "400is", sex: "M", label: "France senior", time: "03:03.50" }
  ],
  top2025: [
    { eventId: "50sf", sex: "F", category: "Cadet", rank: 1, name: "Camille Roux", club: "CS Gravenchon", time: "00:20.01" },
    { eventId: "50sf", sex: "F", category: "Cadet", rank: 2, name: "Maeva Colin", club: "Nice Palme", time: "00:20.30" },
    { eventId: "50sf", sex: "F", category: "Junior", rank: 1, name: "Lea Martin", club: "Limoges NAP", time: "00:19.80" },
    { eventId: "50sf", sex: "F", category: "Senior", rank: 1, name: "Ines Bernard", club: "Pays d'Aix", time: "00:19.43" },
    { eventId: "50sf", sex: "M", category: "Senior", rank: 1, name: "Nolan Petit", club: "Pessac", time: "00:16.88" },
    { eventId: "100sf", sex: "F", category: "Junior", rank: 1, name: "Lea Martin", club: "Limoges NAP", time: "00:44.21" },
    { eventId: "100sf", sex: "F", category: "Senior", rank: 1, name: "Ines Bernard", club: "Pays d'Aix", time: "00:43.00" },
    { eventId: "100sf", sex: "M", category: "Senior", rank: 1, name: "Nolan Petit", club: "Pessac", time: "00:36.95" },
    { eventId: "200sf", sex: "F", category: "Senior", rank: 1, name: "Sarah Faure", club: "Toulouse OAC", time: "01:36.40" },
    { eventId: "400is", sex: "M", category: "Senior", rank: 1, name: "Adam Moreau", club: "Lyon Palme", time: "03:05.00" }
  ],
  records: [
    { eventId: "50sf", sex: "F", category: "Cadet", label: "Meilleure performance cadette", holder: "Reference a renseigner", time: "00:19.98" },
    { eventId: "50sf", sex: "F", category: "Junior", label: "Record de France junior", holder: "Reference a renseigner", time: "00:19.45" },
    { eventId: "50sf", sex: "F", category: "Senior", label: "Record de France senior", holder: "Reference a renseigner", time: "00:18.92" },
    { eventId: "50sf", sex: "M", category: "Junior", label: "Record de France junior", holder: "Reference a renseigner", time: "00:16.96" },
    { eventId: "50sf", sex: "M", category: "Senior", label: "Record de France senior", holder: "Reference a renseigner", time: "00:16.20" },
    { eventId: "100sf", sex: "F", category: "Senior", label: "Record de France senior", holder: "Reference a renseigner", time: "00:41.90" },
    { eventId: "100sf", sex: "M", category: "Senior", label: "Record de France senior", holder: "Reference a renseigner", time: "00:35.90" }
  ],
  notes: {}
};

const sampleData = window.SPEAKER_DATA || fallbackData;

let data = loadData();
let state = {
  eventId: data.events[0]?.id || "",
  sex: "F",
  search: "",
  category: "all",
  series: "all",
  session: "all",
  programKey: "",
  lineOrder: "asc",
  selectedSwimmerId: "",
  selectedRecordKey: "",
  liveMode: true
};

const eventSelect = document.querySelector("#eventSelect");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const sessionControls = document.querySelector("#sessionControls");
const seriesControls = document.querySelector("#seriesControls");
const nextSeriesBtn = document.querySelector("#nextSeriesBtn");
const nextSeriesInlineBtn = document.querySelector("#nextSeriesInlineBtn");
const nextSeriesFloatBtn = document.querySelector("#nextSeriesFloatBtn");
const lineOrderBtn = document.querySelector("#lineOrderBtn");
const entrantsBody = document.querySelector("#entrantsBody");
const entrantCount = document.querySelector("#entrantCount");
const entrantCountLabel = document.querySelector("#entrantCountLabel");
const filteredCount = document.querySelector("#filteredCount");
const bestEntry = document.querySelector("#bestEntry");
const bestEntryName = document.querySelector("#bestEntryName");
const entrantsTitle = document.querySelector("#entrantsTitle");
const entrantsSubtitle = document.querySelector("#entrantsSubtitle");
const rankHeader = document.querySelector("#rankHeader");
const swimmerHeader = document.querySelector("#swimmerHeader");
const searchLabel = document.querySelector("#searchLabel");
const entrantsTableWrap = document.querySelector(".entrants-panel .table-wrap");
const raceTitle = document.querySelector("#raceTitle");
const raceMeta = document.querySelector("#raceMeta");
const raceSexBadge = document.querySelector("#raceSexBadge");
const headerRefs = document.querySelector("#headerRefs");
const headerRefDetails = document.querySelector("#headerRefDetails");
const top2025Box = document.querySelector("#top2025Box");
const dataStatus = document.querySelector("#dataStatus");
const jsonInput = document.querySelector("#jsonInput");
const csvInput = document.querySelector("#csvInput");
const swimmerDetails = document.querySelector("#swimmerDetails");
const meetEyebrow = document.querySelector("#meetEyebrow");
const antoineOverlay = document.querySelector("#antoineOverlay");

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(sampleData);
  try {
    return normalizeData(JSON.parse(saved));
  } catch {
    return structuredClone(sampleData);
  }
}

function normalizeData(nextData) {
  return {
    meet: nextData.meet || sampleData.meet,
    events: Array.isArray(nextData.events) ? nextData.events : [],
    entrants: Array.isArray(nextData.entrants) ? nextData.entrants : [],
    series: Array.isArray(nextData.series) ? nextData.series : [],
    program: Array.isArray(nextData.program) ? nextData.program : [],
    qualifications: Array.isArray(nextData.qualifications) ? nextData.qualifications : [],
    top2025: Array.isArray(nextData.top2025) ? nextData.top2025 : [],
    records: Array.isArray(nextData.records) ? nextData.records : [],
    edfMembers: Array.isArray(nextData.edfMembers) ? nextData.edfMembers : (sampleData.edfMembers || []),
    internationalMedals: Array.isArray(nextData.internationalMedals) ? nextData.internationalMedals : (sampleData.internationalMedals || []),
    sourceVersion: nextData.sourceVersion || sampleData.sourceVersion || "",
    notes: nextData.notes || {}
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
}

function timeToMs(value) {
  if (!value) return Number.POSITIVE_INFINITY;
  const clean = String(value).trim().replace(",", ".");
  const parts = clean.split(":");
  let minutes = 0;
  let seconds = 0;
  if (parts.length === 3) {
    minutes = Number(parts[0]) * 60 + Number(parts[1]);
    seconds = Number(parts[2]);
  } else if (parts.length === 2) {
    minutes = Number(parts[0]);
    seconds = Number(parts[1]);
  } else {
    seconds = Number(parts[0]);
  }
  return Math.round((minutes * 60 + seconds) * 1000);
}

function formatName(swimmer) {
  return `${swimmer.firstName || ""} ${swimmer.lastName || ""}`.trim()
    || swimmer.name
    || (isFemaleContext(swimmer.sex) ? "Nageuse à renseigner" : "Nageur à renseigner");
}

function formatDisplayName(entrant) {
  return isRelayEntrant(entrant) ? (entrant.club || entrant.lastName || "Relais") : formatName(entrant);
}

function clearSearch() {
  state.search = "";
  if (searchInput) searchInput.value = "";
}

function shortClubName(entrant) {
  if (entrant.clubCode) return String(entrant.clubCode).toUpperCase();
  const club = String(entrant.club || "").trim();
  if (!club) return "";
  const words = club
    .replace(/['’]/g, " ")
    .split(/\s+/)
    .filter((word) => word && !["DE", "DU", "DES", "D", "LA", "LE", "LES", "L", "ET", "A", "AU", "AUX"].includes(word.toUpperCase()));
  const initials = words.map((word) => word[0]).join("").toUpperCase();
  return initials || club;
}

function entrantPersonKey(entrant) {
  return `${entrant.sex || ""}|${normalizePersonName(formatName(entrant))}`;
}

function currentEvent() {
  return data.events.find((event) => event.id === state.eventId) || data.events[0];
}

function matchesRace(item) {
  return item.eventId === state.eventId &&
    item.sex === state.sex;
}

function isFinalStage(stage) {
  return String(stage || "").startsWith("finale");
}

function finalStageLabel(stage) {
  const letter = String(stage || "").split("-")[1]?.toUpperCase();
  return letter ? `Finale ${letter}` : "Finale";
}

function isFemaleContext(sex = state.sex) {
  return sex === "F";
}

function categoryLabel(category, sex = state.sex) {
  if (isFemaleContext(sex)) {
    if (sameCategory(category, "Cadet")) return "Cadette";
    if (sameCategory(category, "Junior")) return "Junior";
    if (sameCategory(category, "Senior")) return "Senior";
  }
  return category || "";
}

function entrantWord(count = 2, sex = state.sex) {
  const female = isFemaleContext(sex);
  if (Number(count) === 1) return female ? "engagée" : "engagé";
  return female ? "engagées" : "engagés";
}

function swimmerWord(count = 1, sex = state.sex) {
  const female = isFemaleContext(sex);
  if (Number(count) === 1) return female ? "nageuse" : "nageur";
  return female ? "nageuses" : "nageurs";
}

function displayedWord(count = 2, sex = state.sex) {
  if (Number(count) === 1) return isFemaleContext(sex) ? "affichée" : "affiché";
  return isFemaleContext(sex) ? "affichées" : "affichés";
}

function availableSexesForEvent(eventId = state.eventId) {
  const order = ["F", "M", "X"];
  const sexes = new Set([
    ...data.entrants.filter((item) => item.eventId === eventId).map((item) => item.sex),
    ...data.series.filter((item) => item.eventId === eventId).map((item) => item.sex),
    ...data.program.filter((item) => item.eventId === eventId).map((item) => item.sex)
  ].filter(Boolean));
  return order.filter((sex) => sexes.has(sex));
}

function raceEntrants() {
  const query = state.search.trim().toLowerCase();
  const seriesRows = currentSeriesRows();
  const seriesMap = new Map(seriesRows.map((row) => [row.swimmerId || entrantKey(row), row]));
  const hasSeriesFilter = state.series !== "all";
  return data.entrants
    .filter(matchesRace)
    .filter((entrant) => {
      if (!hasSeriesFilter) return true;
      const seriesRow = seriesMap.get(entrant.swimmerId || entrantKey(entrant));
      return Boolean(seriesRow) && (!seriesRow.session || !entrant.session || entrant.session === seriesRow.session);
    })
    .filter((entrant) => state.category === "all" || sameCategory(entrant.category, state.category))
    .filter((entrant) => {
      const haystack = [
        entrant.lane,
        entrant.lastName,
        entrant.firstName,
        entrant.name,
        entrant.club,
        entrant.category,
        entrant.seedTime,
        entrant.note
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    })
    .map((entrant) => ({ ...entrant, seriesInfo: seriesMap.get(entrant.swimmerId || entrantKey(entrant)) }))
    .sort((a, b) => {
      if (hasSeriesFilter) {
        const direction = state.lineOrder === "desc" ? -1 : 1;
        return direction * (Number(a.seriesInfo?.line || 99) - Number(b.seriesInfo?.line || 99));
      }
      return timeToMs(a.seedTime) - timeToMs(b.seedTime);
    });
}

function raceEntrantsForStats() {
  const raceItems = data.entrants.filter(matchesRace);
  const seriesItems = raceItems.filter((entrant) => {
    if (isFinalStage(entrant.stage)) return false;
    const row = (data.series || []).find((seriesRow) => (
      seriesRow.eventId === entrant.eventId &&
      seriesRow.sex === entrant.sex &&
      (seriesRow.swimmerId || entrantKey(seriesRow)) === (entrant.swimmerId || entrantKey(entrant)) &&
      (!entrant.session || !seriesRow.session || entrant.session === seriesRow.session)
    ));
    return !row || !isFinalStage(row.stage);
  });
  const source = seriesItems.length ? seriesItems : raceItems;
  const bySwimmer = new Map();
  source.forEach((entrant) => {
    const key = entrant.swimmerId || entrantKey(entrant);
    const current = bySwimmer.get(key);
    if (!current || timeToMs(entrant.seedTime) < timeToMs(current.seedTime)) {
      bySwimmer.set(key, entrant);
    }
  });
  return [...bySwimmer.values()];
}

function updateEventSelect() {
  const rows = programRows();
  if (rows.length) {
    const options = [];
    const seen = new Set();
    rows.forEach((row) => {
      if (seen.has(row.eventId)) return;
      const event = data.events.find((item) => item.id === row.eventId);
      seen.add(row.eventId);
      options.push({
        id: row.eventId,
        label: event?.label || row.label || row.eventId.toUpperCase()
      });
    });
    if (!options.some((option) => option.id === state.eventId)) {
      applyProgramRow(rows[0]);
    }
    eventSelect.innerHTML = options.map((option) => (
      `<option value="${escapeHtml(option.id)}">${escapeHtml(option.label)}</option>`
    )).join("");
    eventSelect.value = state.eventId;
    return;
  }
  eventSelect.innerHTML = data.events.map((event) => (
    `<option value="${escapeHtml(event.id)}">${escapeHtml(event.label)}</option>`
  )).join("");
  eventSelect.value = state.eventId;
}

function programKey(row) {
  return [row.order, row.session || "", row.eventId, row.sex, row.stage || "series"].join("|");
}

function programLabel(row) {
  const sexLabel = row.sex === "F" ? "Femmes" : (row.sex === "M" ? "Hommes" : "Mixte");
  const time = row.startTime ? ` - ${row.startTime}` : "";
  const session = row.session ? `S${row.session} - ` : "";
  return `${session}${row.label} - ${sexLabel}${time}`;
}

function selectedProgramRow() {
  if (state.programKey) {
    const exact = programRows().find((row) => programKey(row) === state.programKey);
    if (exact) return exact;
  }
  if (isFinalStage(state.series)) {
    const finalRow = finalProgramRowsForRace().find((row) => row.stage === state.series);
    if (finalRow) return finalRow;
  }
  return programRows().find((row) => row.eventId === state.eventId && row.sex === state.sex) || null;
}

function applyProgramRow(row) {
  if (!row) return;
  state.programKey = programKey(row);
  state.eventId = row.eventId;
  state.sex = row.sex;
}

function sessionRows() {
  const rows = (data.program || []).filter((row) => row.session);
  const bySession = new Map();
  rows.forEach((row) => {
    if (!bySession.has(row.session)) {
      bySession.set(row.session, {
        number: row.session,
        label: row.sessionLabel || `Session ${row.session}`,
        order: Number(row.order || 9999)
      });
    }
  });
  return [...bySession.values()].sort((a, b) => Number(a.number) - Number(b.number) || a.order - b.order);
}

function programRowsForSession() {
  const rows = data.program || [];
  if (state.session === "all") return rows;
  return rows.filter((row) => row.session === state.session);
}

function programRows() {
  const explicitProgram = programRowsForSession()
    .filter((row) => row.hasEntrants === false || hasRowsForProgram(row))
    .sort((a, b) => Number(a.order || 9999) - Number(b.order || 9999));
  if (explicitProgram.length) return explicitProgram;

  const seen = new Set();
  return (data.series || [])
    .filter((row) => row.eventId && row.sex)
    .sort((a, b) => Number(a.heatOrder || 9999) - Number(b.heatOrder || 9999))
    .reduce((rows, row) => {
      const key = `${row.eventId}|${row.sex}`;
      if (seen.has(key)) return rows;
      seen.add(key);
      rows.push({
        eventId: row.eventId,
        sex: row.sex,
        order: Number(row.heatOrder || rows.length + 1)
      });
      return rows;
    }, []);
}

function currentProgramIndex() {
  const current = selectedProgramRow();
  if (!current) return -1;
  return programRows().findIndex((row) => programKey(row) === programKey(current));
}

function raceSeries() {
  return raceSeriesFor(state.eventId, state.sex);
}

function raceSeriesFor(eventId, sex) {
  let officialRows = (data.series || [])
    .filter((row) => row.eventId === eventId && row.sex === sex)
    .sort((a, b) => Number(a.heatOrder || a.series || 999) - Number(b.heatOrder || b.series || 999) || Number(a.line || 99) - Number(b.line || 99));
  if (isFinalStage(state.series)) {
    officialRows = officialRows.filter((row) => row.stage === state.series);
  } else {
    officialRows = officialRows
      .filter((row) => !isFinalStage(row.stage))
      .filter((row) => state.session === "all" || state.series === "all" || !row.session || row.session === state.session);
  }
  if (officialRows.length) return officialRows;
  const entrants = data.entrants
    .filter((entrant) => entrant.eventId === eventId && entrant.sex === sex)
    .sort((a, b) => timeToMs(b.seedTime) - timeToMs(a.seedTime));
  const total = Math.max(1, Math.ceil(entrants.length / 8));
  return entrants.map((entrant, index) => {
    const zeroBasedSeries = Math.floor(index / 8);
    const inSeriesIndex = index % 8;
    return {
      ...entrant,
      series: zeroBasedSeries + 1,
      seriesCount: total,
      line: inSeriesIndex + 1,
      isPreview: true
    };
  });
}

function availableSeriesNumbers() {
  const officialRows = (data.series || [])
    .filter(matchesRace)
    .filter((row) => state.session === "all" || !row.session || row.session === state.session);
  const regularRows = officialRows.filter((row) => !isFinalStage(row.stage));
  const sourceRows = officialRows.length ? regularRows : raceSeries().filter((row) => !isFinalStage(row.stage));
  return [...new Set(sourceRows.map((row) => Number(row.series)).filter(Number.isFinite))].sort((a, b) => a - b);
}

function selectedSeriesTime() {
  if (state.series === "all") return "";
  if (isFinalStage(state.series)) {
    return finalProgramRowsForRace().find((row) => row.stage === state.series)?.startTime ||
      raceSeries().find((row) => row.stage === state.series)?.startTime ||
      "";
  }
  return raceSeries().find((row) => Number(row.series) === Number(state.series))?.startTime || "";
}

function hasNextProgramSeries() {
  const rows = programRows();
  const index = currentProgramIndex();
  return index >= 0 && index < rows.length - 1;
}

function goToNextProgramRace() {
  const rows = programRows();
  const programIndex = currentProgramIndex();
  const nextRace = rows[programIndex + 1];
  if (!nextRace) return false;
  applyProgramRow(nextRace);
  state.category = "all";
  clearSearch();
  state.selectedRecordKey = "";
  const nextNumbers = availableSeriesNumbers();
  const nextFinal = finalProgramRowsForRace()[0]?.stage;
  state.series = String(nextNumbers[0] || nextFinal || "all");
  return true;
}

function goToPreviousProgramRace() {
  const rows = programRows();
  const programIndex = currentProgramIndex();
  const previousRace = rows[programIndex - 1];
  if (!previousRace) return false;
  applyProgramRow(previousRace);
  state.category = "all";
  clearSearch();
  state.selectedRecordKey = "";
  state.series = lastSeriesSelectionForCurrentRace();
  return true;
}

function currentSeriesRows() {
  if (state.series === "all") return [];
  if (isFinalStage(state.series)) {
    return raceSeries().filter((row) => row.stage === state.series);
  }
  const selected = Number(state.series);
  return raceSeries().filter((row) => Number(row.series) === selected);
}

function hasRowsForProgram(row) {
  return (data.series || []).some((seriesRow) => (
    seriesRow.eventId === row.eventId &&
    seriesRow.sex === row.sex &&
    (!row.session || !seriesRow.session || seriesRow.session === row.session) &&
    (!isFinalStage(row.stage) || seriesRow.stage === row.stage)
  ));
}

function programRowsForCurrentRace() {
  return programRowsForSession()
    .filter((row) => row.eventId === state.eventId && row.sex === state.sex)
    .sort((a, b) => Number(a.order || 9999) - Number(b.order || 9999));
}

function finalProgramRowsForRace() {
  const seen = new Set();
  return programRowsForCurrentRace()
    .filter((row) => isFinalStage(row.stage))
    .filter((row) => {
      if (seen.has(row.stage)) return false;
      seen.add(row.stage);
      return true;
    });
}

function firstSeriesSelectionForCurrentRace() {
  const numbers = availableSeriesNumbers();
  if (numbers.length) return String(numbers[0]);
  return finalProgramRowsForRace()[0]?.stage || "all";
}

function lastSeriesSelectionForCurrentRace() {
  const finals = finalProgramRowsForRace();
  if (finals.length) return finals[finals.length - 1].stage;
  const numbers = availableSeriesNumbers();
  if (numbers.length) return String(numbers[numbers.length - 1]);
  return "all";
}

function syncSexSegments() {
  const available = availableSexesForEvent();
  document.querySelectorAll(".segment").forEach((button) => {
    const isAvailable = available.length ? available.includes(button.dataset.sex) : button.dataset.sex !== "X";
    button.hidden = !isAvailable;
    button.classList.toggle("active", button.dataset.sex === state.sex);
  });
}

function render() {
  document.body.classList.add("live-mode");
  if (!data.events.length) {
    data.events = structuredClone(sampleData.events);
    state.eventId = data.events[0].id;
  }
  if (!data.events.some((event) => event.id === state.eventId)) {
    state.eventId = data.events[0].id;
  }
  const availableSexes = availableSexesForEvent();
  if (availableSexes.length && !availableSexes.includes(state.sex)) {
    state.sex = availableSexes[0];
  }

  if (meetEyebrow) {
    meetEyebrow.textContent = [data.meet?.name, data.meet?.city].filter(Boolean).join(" - ");
  }
  updateEventSelect();
  renderSessionControls();
  syncSexSegments();
  renderSeriesControls();
  renderCategorySelect();
  renderHeader();
  renderHeaderReferences();
  renderEntrants();
  renderTop2025();
  renderDataStatus();
}

function renderSessionControls() {
  if (!sessionControls) return;
  const sessions = sessionRows();
  if (!sessions.length) {
    sessionControls.innerHTML = "";
    sessionControls.closest(".top-session-field")?.setAttribute("hidden", "");
    state.session = "all";
    return;
  }
  sessionControls.closest(".top-session-field")?.removeAttribute("hidden");
  if (state.session !== "all" && !sessions.some((session) => session.number === state.session)) {
    state.session = "all";
  }
  sessionControls.innerHTML = [
    `<button class="session-chip ${state.session === "all" ? "active" : ""}" type="button" data-session="all">Toutes</button>`,
    ...sessions.map((session) => `
      <button class="session-chip ${state.session === session.number ? "active" : ""}" type="button" data-session="${escapeHtml(session.number)}" title="${escapeHtml(session.label)}">
        S${escapeHtml(session.number)}
      </button>
    `)
  ].join("");
}

function renderDataStatus(message = "") {
  if (!dataStatus) return;
  dataStatus.classList.remove("warning", "source");
  if (message) {
    dataStatus.hidden = false;
    dataStatus.textContent = message;
    dataStatus.classList.add("warning");
    return;
  }
  if (data.sourceVersion) {
    const sourceLabel = data.notes?.sourceLabel || "Données officielles chargées";
    const sourceFile = data.notes?.sourceFile || "";
    const results = data.notes?.resultFiles?.length
      ? `${data.notes.resultFiles.length} fichier${data.notes.resultFiles.length > 1 ? "s" : ""} résultats`
      : "aucun fichier résultats";
    const generatedAt = data.notes?.generatedAt || "";
    const seriesCount = data.notes?.seriesLineCount || data.series?.length || 0;
    const entrantTotal = data.notes?.entrantCount || data.entrants?.length || 0;
    dataStatus.hidden = false;
    dataStatus.innerHTML = `
      <span><strong>Source active</strong> ${escapeHtml(sourceLabel)}${sourceFile ? ` - ${escapeHtml(sourceFile)}` : ""}</span>
      <span>${escapeHtml(String(entrantTotal))} engagements</span>
      <span>${escapeHtml(String(seriesCount))} lignes de séries</span>
      <span>${escapeHtml(results)}</span>
      ${generatedAt ? `<span>mise à jour ${escapeHtml(generatedAt)}</span>` : ""}
      <span class="footer-credit">outil développé par AF</span>
    `;
    dataStatus.classList.add("source");
    return;
  }
  dataStatus.hidden = false;
  dataStatus.textContent = "Données officielles non chargées. Sur GitHub Pages, vérifie que data.generated.js et donnees-speaker-france-2026.json sont bien publiés.";
  dataStatus.classList.add("warning");
}

function renderSeriesControls() {
  const numbers = availableSeriesNumbers();
  const finalRows = finalProgramRowsForRace();
  const finalStages = finalRows.map((row) => row.stage);
  if (isFinalStage(state.series) && !finalStages.includes(state.series)) {
    state.series = numbers.length ? "all" : (finalStages[0] || "all");
  }
  if (!isFinalStage(state.series) && state.series !== "all" && !numbers.includes(Number(state.series))) {
    state.series = "all";
  }
  if (!numbers.length && finalStages.length && state.series === "all") {
    state.series = finalStages[0];
  }
  const preview = raceSeries().some((row) => row.isPreview);
  const programRow = selectedProgramRow();
  if (programRow?.hasEntrants === false) {
    seriesControls.innerHTML = `<span class="no-series-note">${escapeHtml(programRow.startTime ? `Finale - ${programRow.startTime}` : "Finale")}</span>`;
    setNextSeriesButtons(!hasNextProgramSeries(), "Course suivante");
    return;
  }
  const controls = [
    ...(numbers.length ? [`<button class="series-chip ${state.series === "all" ? "active" : ""}" type="button" data-series="all">Toutes</button>`] : []),
    ...numbers.map((number) => {
      const time = (data.series || [])
        .filter(matchesRace)
        .filter((row) => !isFinalStage(row.stage))
        .find((row) => Number(row.series) === number)?.startTime || "";
      return `
        <button class="series-chip ${Number(state.series) === number ? "active" : ""}" type="button" data-series="${number}">
          <strong>${number}</strong>${time ? `<span>${escapeHtml(time)}</span>` : ""}
        </button>
      `;
    }),
    ...finalRows.map((row) => `
      <button class="series-chip final-chip ${state.series === row.stage ? "active" : ""}" type="button" data-series="${escapeHtml(row.stage)}">
        <strong>${escapeHtml(finalStageLabel(row.stage))}</strong>${row.startTime ? `<span>${escapeHtml(row.startTime)}</span>` : ""}
      </button>
    `)
  ];
  seriesControls.innerHTML = controls.length
    ? controls.join("")
    : `<span class="no-series-note">Aucune série disponible</span>`;
  const atLastCurrentRace = isFinalStage(state.series)
    ? finalStages.indexOf(state.series) >= finalStages.length - 1
    : state.series !== "all" && Number(state.series) >= numbers[numbers.length - 1];
  setNextSeriesButtons(
    (!numbers.length && !finalStages.length) || (atLastCurrentRace && !hasNextProgramSeries()),
    state.series === "all" ? "Choisir une série" : (atLastCurrentRace ? "Course suivante" : "Série suivante")
  );
  seriesControls.title = preview ? "Aperçu généré automatiquement en attendant le fichier officiel des séries" : "";
}

function setNextSeriesButtons(disabled, label) {
  [nextSeriesBtn, nextSeriesInlineBtn, nextSeriesFloatBtn].forEach((button) => {
    if (!button) return;
    button.disabled = disabled;
    button.textContent = label;
  });
}

function renderCategorySelect() {
  const categories = [...new Set(data.entrants.filter(matchesRace).map((entrant) => entrant.category).filter(Boolean))];
  const preferred = ["Cadet", "Junior", "Senior"];
  categories.sort((a, b) => {
    const ai = preferred.indexOf(a);
    const bi = preferred.indexOf(b);
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    return a.localeCompare(b, "fr");
  });
  if (state.category !== "all" && !categories.some((category) => sameCategory(category, state.category))) {
    state.category = "all";
  }
  categorySelect.innerHTML = [
    `<option value="all">Toutes catégories</option>`,
    ...categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(categoryLabel(category))}</option>`)
  ].join("");
  categorySelect.value = state.category;
}

function renderHeader() {
  const event = currentEvent();
  const sexLabel = state.sex === "F" ? "Femmes" : (state.sex === "M" ? "Hommes" : "Mixte");
  raceTitle.textContent = `${event?.label || "Course"} - ${sexLabel}`;
  const meta = [event?.discipline, event?.distance].filter(Boolean).join(" - ");
  raceMeta.textContent = meta;
  raceSexBadge.textContent = sexLabel;
}

function renderHeaderReferences() {
  const recordRows = currentRecordRows();
  const qualificationRows = data.qualifications
    .filter(matchesRace)
    .sort((a, b) => timeToMs(a.time) - timeToMs(b.time));
  const chips = [
    ...recordRows.map((row) => {
      const key = recordKey(row);
      return `
      <button class="ref-chip ref-chip-button ${categoryClass(row.category)} ${state.selectedRecordKey === key ? "active-ref" : ""}" data-record-key="${escapeHtml(key)}">
        <strong>${escapeHtml(shortRecordLabel(row))}</strong>
        ${escapeHtml(row.time || "-")}
      </button>
    `;
    }),
    ...qualificationRows.map((row) => `
      <span class="ref-chip qualification-chip">
        <strong>${escapeHtml(row.label || "EDF")}</strong>
        ${escapeHtml(row.time || "-")}
      </span>
    `)
  ];
  headerRefs.innerHTML = chips.join("");
  renderHeaderRefDetails();
}

function renderHeaderRefDetails() {
  if (!state.selectedRecordKey) {
    headerRefDetails.hidden = true;
    headerRefDetails.innerHTML = "";
    return;
  }
  const row = currentRecordRows().find((record) => recordKey(record) === state.selectedRecordKey);
  if (!row) {
    state.selectedRecordKey = "";
    headerRefDetails.hidden = true;
    headerRefDetails.innerHTML = "";
    return;
  }
  headerRefDetails.hidden = false;
  headerRefDetails.innerHTML = `
    <div>
      <strong>${escapeHtml(shortRecordLabel(row))} - ${escapeHtml(row.time || "-")}</strong>
      <span>${escapeHtml(recordDescription(row))}</span>
    </div>
    <button class="icon-button close-ref-details" title="Fermer le détail" aria-label="Fermer le détail">×</button>
  `;
}

function recordKey(row) {
  return [row.eventId, row.sex, row.category, row.label].join("|").toLowerCase();
}

function renderEntrants() {
  const entrants = raceEntrants();
  const allRaceEntrants = data.entrants.filter(matchesRace);
  const statsEntrants = raceEntrantsForStats();
  const visibleEntrants = entrants;
  const seriesNumbers = availableSeriesNumbers();
  const selectedSeries = Number(state.series);
  const hasSeriesFilter = state.series !== "all";
  const programRow = selectedProgramRow() || programRows().find((row) => row.eventId === state.eventId && row.sex === state.sex);
  const seriesTime = selectedSeriesTime();
  const statsCount = statsEntrants.length || allRaceEntrants.length;
  entrantCount.textContent = statsCount;
  if (entrantCountLabel) entrantCountLabel.textContent = entrantWord(statsCount);
  filteredCount.textContent = hasSeriesFilter
    ? `${seriesTime ? `Horaire ${seriesTime} - ` : ""}${visibleEntrants.length} ${swimmerWord(visibleEntrants.length)}`
    : `${visibleEntrants.length} ${displayedWord(visibleEntrants.length)}`;
  const selectedSeriesCount = currentSeriesRows()[0]?.seriesCount || seriesNumbers.length || selectedSeries;
  const seriesLabel = isFinalStage(state.series)
    ? finalStageLabel(state.series)
    : `Série ${selectedSeries} / ${selectedSeriesCount}`;
  entrantsTitle.textContent = hasSeriesFilter
    ? seriesLabel
    : `${entrantWord(2).replace(/^./, (letter) => letter.toUpperCase())} 2026`;
  if (entrantsSubtitle) {
    entrantsSubtitle.textContent = hasSeriesFilter
      ? [seriesTime ? `Horaire ${seriesTime}` : "", `${visibleEntrants.length} ${swimmerWord(visibleEntrants.length)}`].filter(Boolean).join(" - ")
      : "";
  }
  rankHeader.textContent = hasSeriesFilter ? "Ligne" : "Rang";
  if (swimmerHeader) swimmerHeader.textContent = isFemaleContext() ? "Nageuse" : "Nageur";
  if (searchLabel) searchLabel.textContent = `Recherche ${entrantWord(1)}`;
  if (lineOrderBtn) {
    lineOrderBtn.hidden = !hasSeriesFilter;
    lineOrderBtn.textContent = state.lineOrder === "desc" ? "Lignes 8→1" : "Lignes 1→8";
    lineOrderBtn.title = state.lineOrder === "desc" ? "Afficher les lignes de 1 à 8" : "Afficher les lignes de 8 à 1";
  }
  entrantsTableWrap?.classList.toggle("series-table", hasSeriesFilter);
  const best = [...(statsEntrants.length ? statsEntrants : allRaceEntrants)].sort((a, b) => timeToMs(a.seedTime) - timeToMs(b.seedTime))[0];
  bestEntry.textContent = best?.seedTime || "--";
  if (bestEntryName) {
    const club = best ? shortClubName(best) : "";
    bestEntryName.textContent = best
      ? `${formatDisplayName(best)}${club ? ` - ${club}` : ""}`
      : "";
  }

  entrantsBody.innerHTML = visibleEntrants.length ? visibleEntrants.map((entrant, index) => {
    const reference = getEntrantReference(entrant);
    const swimmerId = entrant.swimmerId || entrantKey(entrant);
    const lineLabel = hasSeriesFilter ? (entrant.seriesInfo?.line || "-") : index + 1;
    return `
      <tr class="${state.selectedSwimmerId === swimmerId ? "selected-row" : ""} category-row ${categoryClass(entrant.category)}" data-swimmer-id="${escapeHtml(swimmerId)}">
        <td><span class="lane">${escapeHtml(lineLabel)}</span></td>
        <td class="name-cell">
          <button class="swimmer-button" data-swimmer-id="${escapeHtml(swimmerId)}">${escapeHtml(formatDisplayName(entrant))}${!isRelayEntrant(entrant) ? ` <span class="birth-year">(${escapeHtml(getBirthYearLabel(entrant.birthDate))})</span>` : ""}${renderEdfBadges(entrant)}</button>
          ${!isRelayEntrant(entrant) ? `<span class="club-name">${escapeHtml(entrant.club || "-")}</span>` : ""}
        </td>
        <td><span class="category-pill">${escapeHtml(categoryLabel(entrant.category, entrant.sex))}</span></td>
        <td class="time-cell">
          <span class="time">${escapeHtml(entrant.seedTime || "-")}</span>
          ${renderRecordGapAlert(entrant)}
          ${entrant.seedSource ? `<span class="seed-source">${escapeHtml(entrant.seedSource)}</span>` : ""}
        </td>
        <td>${reference}</td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="5" class="empty">${programRow?.hasEntrants === false ? `Finale à afficher, ${entrantWord(2)} non disponibles pour le moment.` : `Aucun${isFemaleContext() ? "e" : ""} ${entrantWord(1)} pour cette sélection.`}</td></tr>`;
  renderSwimmerDetails();
}

function getEntrantReference(entrant) {
  const references = [];
  const seed = timeToMs(entrant.seedTime);
  const recordSeed = findRecordByTime(entrant, entrant.seedTime, entrant.category);
  if (recordSeed) {
    references.push(`<span class="badge record-alert">${escapeHtml(shortRecordLabel(recordSeed))} actuel</span>`);
  }
  if (sameCategory(entrant.category, "Senior")) {
    const quals = data.qualifications
      .filter(matchesRace)
      .filter((item) => isQualificationEligible(entrant, item))
      .sort((a, b) => timeToMs(a.time) - timeToMs(b.time));
    const qual = quals.find((item) => seed <= timeToMs(item.time));
    if (qual) {
      references.push(`<span class="badge">${escapeHtml(qual.label)} EDF</span>`);
    }
  }
  const top2025Match = findTop2025ForEntrant(entrant);
  if (top2025Match) {
    const record2025 = findRecordByTime(entrant, top2025Match.time, top2025Match.category);
    references.push(`<span class="badge category-mini ${categoryClass(top2025Match.category)}">FRA 25: ${escapeHtml(formatRank(top2025Match.rank))} ${escapeHtml(categoryLabel(top2025Match.category, entrant.sex))} - ${escapeHtml(top2025Match.time || "-")}</span>`);
    if (record2025) {
      references.push(`<span class="badge record-alert">Temps FRA 25 = ${escapeHtml(shortRecordLabel(record2025))}</span>`);
    }
  }
  const heldRecords = findRecordsHeldByEntrant(entrant).filter((record) => (
    !sameTime(record.time, entrant.seedTime) && (!top2025Match || !sameTime(record.time, top2025Match.time))
  ));
  heldRecords.forEach((record) => {
    references.push(`<span class="badge holder-alert">${isRelayEntrant(entrant) ? "Club recordman" : "Détient"} ${escapeHtml(shortRecordLabel(record))}</span>`);
  });
  const raceMedals = findInternationalMedalsForRace(entrant);
  raceMedals.forEach((medal) => {
    references.push(`<span class="badge international-alert">${escapeHtml(medal.medal || "Médaille")} ${escapeHtml(shortChampionshipLabel(medal.championship))}</span>`);
  });
  return references.length ? `<div class="reference-badges">${references.join("")}</div>` : "";
}

function recordTargetsForEntrant(entrant) {
  return data.records
    .filter((record) => record.eventId === entrant.eventId && record.sex === entrant.sex)
    .filter((record) => sameCategory(record.category, entrant.category));
}

function formatGap(ms) {
  const total = Math.abs(ms) / 1000;
  if (total >= 60) {
    const minutes = Math.floor(total / 60);
    const seconds = (total % 60).toFixed(2).padStart(5, "0");
    return `${minutes}:${seconds}`;
  }
  return total.toFixed(2);
}

function renderRecordGapAlert(entrant) {
  const seed = timeToMs(entrant.seedTime);
  if (!Number.isFinite(seed)) return "";
  const target = recordTargetsForEntrant(entrant)
    .map((record) => ({ record, diff: seed - timeToMs(record.time) }))
    .filter((item) => Number.isFinite(item.diff))
    .sort((a, b) => Math.abs(a.diff) - Math.abs(b.diff))[0];
  if (!target) return "";
  const label = shortRecordLabel(target.record);
  if (target.diff <= 0) {
    return `<span class="record-gap under-record">sous ${escapeHtml(label)}</span>`;
  }
  const threshold = seed < 60000 ? 1000 : (seed < 180000 ? 2500 : 5000);
  if (target.diff > threshold) return "";
  return `<span class="record-gap">à ${escapeHtml(formatGap(target.diff))} du ${escapeHtml(label)}</span>`;
}

function renderEdfBadges(entrant) {
  const memberships = findEdfMemberships(entrant);
  return memberships.map((member) => (
    `<span class="edf-badge" title="${escapeHtml(member.label || "Equipe de France")}">${escapeHtml(member.team || "E")}</span>`
  )).join("");
}

function findEdfMemberships(entrant) {
  const key = entrantPersonKey(entrant);
  return (data.edfMembers || []).filter((member) => member.personKey === key);
}

function findInternationalMedals(entrant) {
  const key = entrantPersonKey(entrant);
  return (data.internationalMedals || []).filter((medal) => medal.personKey === key);
}

function findInternationalMedalsForRace(entrant) {
  return findInternationalMedals(entrant).filter((medal) => medal.eventId === entrant.eventId);
}

function shortChampionshipLabel(value) {
  const text = String(value || "").toUpperCase();
  if (text.includes("MONDE")) return text.replace("MONDE", "Monde");
  if (text.includes("EURO")) return text.replace("EURO", "Europe");
  return value || "";
}

function findRecordByTime(entrant, time, category) {
  if (!time) return null;
  return data.records.find((record) => (
    record.eventId === entrant.eventId &&
    record.sex === entrant.sex &&
    sameCategory(record.category, category) &&
    sameTime(record.time, time)
  ));
}

function isRelayEntrant(entrant) {
  return String(entrant.eventId || "").startsWith("4x");
}

function isBestClubRelayEntry(entrant) {
  if (!isRelayEntrant(entrant) || !entrant.clubCode) return false;
  const sameClubEntries = data.entrants.filter((row) => (
    row.eventId === entrant.eventId &&
    row.sex === entrant.sex &&
    String(row.clubCode || "").toUpperCase() === String(entrant.clubCode || "").toUpperCase()
  ));
  const best = sameClubEntries.sort((a, b) => timeToMs(a.seedTime) - timeToMs(b.seedTime))[0];
  return best && (best.swimmerId || entrantKey(best)) === (entrant.swimmerId || entrantKey(entrant));
}

function findRelayClubRecords(entrant) {
  if (!isBestClubRelayEntry(entrant)) return [];
  const clubCode = String(entrant.clubCode || "").toUpperCase();
  return data.records.filter((record) => (
    record.eventId === entrant.eventId &&
    record.sex === entrant.sex &&
    sameCategory(record.category, entrant.category) &&
    String(record.club || "").toUpperCase() === clubCode
  ));
}

function findRecordsHeldByEntrant(entrant) {
  if (isRelayEntrant(entrant)) {
    return findRelayClubRecords(entrant);
  }
  const entrantName = normalizePersonName(formatName(entrant));
  return data.records.filter((record) => (
    record.eventId === entrant.eventId &&
    record.sex === entrant.sex &&
    normalizePersonName(record.holder) === entrantName
  ));
}

function findAllRecordsHeldByEntrant(entrant) {
  const entrantName = normalizePersonName(formatName(entrant));
  return data.records.filter((record) => (
    record.sex === entrant.sex &&
    normalizePersonName(record.holder) === entrantName
  ));
}

function sameTime(left, right) {
  return Number.isFinite(timeToMs(left)) && timeToMs(left) === timeToMs(right);
}

function isQualificationEligible(entrant, qualification) {
  if (qualification.label !== "TRP") return true;
  const birthYear = getBirthYear(entrant.birthDate);
  return Number.isFinite(birthYear) && birthYear >= 2005;
}

function getBirthYear(birthDate) {
  const match = String(birthDate || "").match(/(\d{4})$/);
  return match ? Number(match[1]) : Number.NaN;
}

function getBirthYearLabel(birthDate) {
  const year = getBirthYear(birthDate);
  return Number.isFinite(year) ? String(year) : "----";
}

function findTop2025ForEntrant(entrant) {
  const entrantName = normalizePersonName(formatName(entrant));
  return data.top2025.find((item) => (
    matchesRace(item) && normalizePersonName(item.name) === entrantName
  ));
}

function normalizePersonName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z ]/g, " ")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .sort()
    .join(" ");
}

function formatRank(rank) {
  const value = Number(rank);
  if (!Number.isFinite(value)) return "-";
  return value === 1 ? "1er" : `${value}e`;
}

function entrantKey(entrant) {
  return [entrant.lastName, entrant.firstName, entrant.birthDate, entrant.sex].join("|").toLowerCase();
}

function categoryClass(category) {
  if (sameCategory(category, "Cadet")) return "cat-cadet";
  if (sameCategory(category, "Junior")) return "cat-junior";
  if (sameCategory(category, "Senior")) return "cat-senior";
  return "cat-other";
}

function selectRecordForCategory(category) {
  if (category === "all") {
    state.selectedRecordKey = "";
    return;
  }
  const record = currentRecordRows().find((row) => sameCategory(row.category, category));
  state.selectedRecordKey = record ? recordKey(record) : "";
}

function renderSwimmerDetails() {
  if (!state.selectedSwimmerId) {
    swimmerDetails.hidden = true;
    swimmerDetails.innerHTML = "";
    return;
  }
  const entries = data.entrants
    .filter((entrant) => (entrant.swimmerId || entrantKey(entrant)) === state.selectedSwimmerId)
    .sort((a, b) => eventOrder(a.eventId) - eventOrder(b.eventId) || timeToMs(a.seedTime) - timeToMs(b.seedTime));
  if (!entries.length) {
    swimmerDetails.hidden = true;
    swimmerDetails.innerHTML = "";
    return;
  }
  const swimmer = entries[0];
  const france2025 = findFrance2025Results(swimmer);
  const internationalMedals = findInternationalMedals(swimmer);
  const heldRecords = findAllRecordsHeldByEntrant(swimmer);
  swimmerDetails.hidden = false;
  swimmerDetails.innerHTML = `
    <div class="details-title">
      <div class="swimmer-identity">
        <h4>${escapeHtml(formatName(swimmer))} ${renderEdfBadges(swimmer)}</h4>
        <span>${escapeHtml(swimmer.club || "")} - ${escapeHtml(categoryLabel(swimmer.category, swimmer.sex))} - ${escapeHtml(getBirthYearLabel(swimmer.birthDate))}</span>
      </div>
      <div class="compact-program" aria-label="Courses engagées du weekend">
        ${entries.map((entry) => `
          <span class="${categoryClass(entry.category)}">
            <strong>${escapeHtml(shortEventLabel(entry.eventId))}</strong>
            ${escapeHtml(entry.seedTime || "-")}
          </span>
        `).join("")}
      </div>
      <button class="icon-button close-details" title="Fermer la fiche" aria-label="Fermer la fiche">×</button>
    </div>
    ${heldRecords.length ? `
      <div class="detail-section">
        <h5>Records actuels détenus</h5>
        <div class="detail-list">
          ${heldRecords.map((record) => `
            <div class="detail-row record-detail ${categoryClass(record.category)}">
              <span>${renderRecordFlag(record)} ${renderRecordCategoryFlag(record)} <strong>${escapeHtml(eventLabel(record.eventId))}</strong> - ${escapeHtml([record.time, record.date, record.place].filter(Boolean).join(" - ") || "-")}</span>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
    ${internationalMedals.length ? `
      <div class="detail-section">
        <h5>International</h5>
        <div class="compact-achievement-list">
          ${internationalMedals.map((medal) => `
            <div class="compact-achievement ${categoryClass(swimmer.category)}">
              <span class="medal-dot ${medalClass(medal.medal)}" aria-label="${escapeHtml(medal.medal || "Médaille")}">●</span>
              <span><strong>${escapeHtml(medal.eventLabel || eventLabel(medal.eventId))}</strong>${escapeHtml([medal.time, shortChampionshipLabel(medal.championship)].filter(Boolean).join(" - ")) ? ` - ${escapeHtml([medal.time, shortChampionshipLabel(medal.championship)].filter(Boolean).join(" - "))}` : ""}</span>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
    ${france2025.length ? `
      <div class="detail-section">
        <h5>France 2025</h5>
        <div class="compact-achievement-list france-compact">
          ${france2025.map((row) => `
            <div class="compact-achievement ${categoryClass(row.category)}">
              <span><strong>${escapeHtml(formatRank(row.rank))}</strong> ${escapeHtml(categoryLabel(row.category, row.sex))}</span>
              <span>${escapeHtml(eventLabel(row.eventId))}</span>
              <span>${escapeHtml(row.time || "-")}</span>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
  `;
}

function eventOrder(eventId) {
  const index = data.events.findIndex((event) => event.id === eventId);
  return index === -1 ? 99 : index;
}

function eventLabel(eventId) {
  const event = data.events.find((item) => item.id === eventId);
  return event?.label || String(eventId || "").toUpperCase();
}

function shortEventLabel(eventId) {
  return String(eventId || "").toUpperCase();
}

function findFrance2025Results(entrant) {
  const entrantName = normalizePersonName(formatName(entrant));
  return data.top2025
    .filter((item) => item.sex === entrant.sex && normalizePersonName(item.name) === entrantName)
    .sort((a, b) => eventOrder(a.eventId) - eventOrder(b.eventId) || (a.rank || 99) - (b.rank || 99));
}

function medalForRank(rank) {
  const value = Number(rank);
  if (value === 1) return "Or";
  if (value === 2) return "Argent";
  if (value === 3) return "Bronze";
  return "Finaliste";
}

function medalClass(value) {
  const text = String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  if (text.includes("or")) return "medal-gold";
  if (text.includes("argent")) return "medal-silver";
  if (text.includes("bronze")) return "medal-bronze";
  return "medal-neutral";
}

function sameCategory(a, b) {
  return String(a || "").toLowerCase() === String(b || "").toLowerCase();
}

function currentRecordRows() {
  const order = { Cadet: 1, Junior: 2, Senior: 3 };
  const relayCategories = isRelayEntrant({ eventId: state.eventId })
    ? new Set(data.entrants.filter(matchesRace).map((entrant) => entrant.category).filter(Boolean))
    : null;
  return data.records
    .filter(matchesRace)
    .filter((record) => !relayCategories || relayCategories.has(record.category))
    .sort((a, b) => (order[a.category] || 99) - (order[b.category] || 99));
}

function shortRecordLabel(row) {
  if (sameCategory(row.category, "Cadet")) return state.sex === "F" ? "MPF cadette" : "MPF cadet";
  if (sameCategory(row.category, "Junior")) return "RF junior";
  if (sameCategory(row.category, "Senior")) return "RF senior";
  return row.label || row.category || "Record";
}

function recordFlagText(row) {
  if (sameCategory(row.category, "Cadet")) return "MPF";
  if (sameCategory(row.category, "Junior")) return "RFJ";
  if (sameCategory(row.category, "Senior")) return "RF";
  return "REC";
}

function renderRecordFlag(row) {
  return `<span class="record-flag" title="${escapeHtml(shortRecordLabel(row))}">${escapeHtml(recordFlagText(row))}</span>`;
}

function shortCategoryLabel(category) {
  if (sameCategory(category, "Cadet")) return "CAD";
  if (sameCategory(category, "Junior")) return "JUN";
  if (sameCategory(category, "Senior")) return "SEN";
  return String(category || "").slice(0, 3).toUpperCase();
}

function renderRecordCategoryFlag(row) {
  return `<span class="record-category-flag ${categoryClass(row.category)}">${escapeHtml(shortCategoryLabel(row.category))}</span>`;
}

function renderTop2025() {
  const categories = ["Cadet", "Junior", "Senior"];
  top2025Box.innerHTML = categories.map((category) => {
    const rows = data.top2025
      .filter((item) => matchesRace(item) && sameCategory(item.category, category))
      .sort((a, b) => (a.rank || 99) - (b.rank || 99))
      .slice(0, 5);
    return `
      <div class="ranking-list ${categoryClass(category)}">
        <h4>${escapeHtml(categoryLabel(category))}</h4>
        <ol>
          ${rows.length ? rows.map((row) => `
            <li>
              <span class="rank">${escapeHtml(row.rank || "-")}</span>
              <span>
                <strong>${escapeHtml(row.name || "-")}</strong>
                <span class="muted-text">${escapeHtml(row.club || "")}</span>
              </span>
              <span class="time">${escapeHtml(row.time || "-")}</span>
            </li>
          `).join("") : `<li class="empty">À renseigner</li>`}
        </ol>
      </div>
    `;
  }).join("");
}

function recordDescription(row) {
  return [
    row.holder || "Titulaire à renseigner",
    row.club,
    row.date,
    row.place
  ].filter(Boolean).join(" - ");
}

function noteKey() {
  return `${state.eventId}:${state.sex}`;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return [];
  const separator = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(separator).map((header) => header.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const cells = line.split(separator).map((cell) => cell.trim());
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""]));
    return {
      eventId: state.eventId,
      sex: state.sex,
      lane: row.ligne || row.couloir || row.lane,
      lastName: row.nom || row.lastname || "",
      firstName: row.prenom || row["prénom"] || row.firstname || "",
      birthDate: row.naissance || row.birthdate || "",
      swimmerId: [row.nom || row.lastname || "", row.prenom || row["prénom"] || row.firstname || "", row.naissance || row.birthdate || "", state.sex].join("|").toLowerCase(),
      club: row.club || "",
      category: row.categorie || row["catégorie"] || row.category || "",
      seedTime: row.temps || row.time || row.seedtime || "",
      note: row.note || ""
    };
  });
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "donnees-speaker-france-2026.json";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

eventSelect.addEventListener("change", () => {
  state.eventId = eventSelect.value;
  state.programKey = "";
  clearSearch();
  state.category = "all";
  state.series = "all";
  state.selectedSwimmerId = "";
  state.selectedRecordKey = "";
  render();
});

sessionControls?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-session]");
  if (!button) return;
  state.session = button.dataset.session;
  const firstProgram = programRows()[0];
  if (firstProgram) {
    applyProgramRow(firstProgram);
  }
  clearSearch();
  state.category = "all";
  state.series = state.session === "all" ? "all" : firstSeriesSelectionForCurrentRace();
  state.selectedSwimmerId = "";
  state.selectedRecordKey = "";
  render();
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.sex = button.dataset.sex;
    clearSearch();
    state.category = "all";
    state.series = "all";
    state.selectedSwimmerId = "";
    state.selectedRecordKey = "";
    render();
  });
});

headerRefs.addEventListener("click", (event) => {
  const button = event.target.closest(".ref-chip-button");
  if (!button) return;
  state.selectedRecordKey = state.selectedRecordKey === button.dataset.recordKey ? "" : button.dataset.recordKey;
  renderHeaderReferences();
});

headerRefDetails.addEventListener("click", (event) => {
  if (!event.target.closest(".close-ref-details")) return;
  state.selectedRecordKey = "";
  renderHeaderReferences();
});

seriesControls.addEventListener("click", (event) => {
  const button = event.target.closest("[data-series]");
  if (!button) return;
  state.series = button.dataset.series;
  state.selectedSwimmerId = "";
  render();
});

function goToNextSeries() {
  const numbers = availableSeriesNumbers();
  const finals = finalProgramRowsForRace();
  const finalStages = finals.map((row) => row.stage);
  if (!numbers.length && !finalStages.length) return;
  if (state.series === "all") {
    state.series = String(numbers[0] || finalStages[0] || "all");
  } else if (isFinalStage(state.series)) {
    const currentFinalIndex = finalStages.indexOf(state.series);
    const nextFinal = finalStages[currentFinalIndex + 1];
    if (nextFinal) {
      state.series = nextFinal;
    } else {
      goToNextProgramRace();
    }
  } else {
    const currentIndex = numbers.indexOf(Number(state.series));
    const next = numbers[currentIndex + 1];
    if (next) {
      state.series = String(next);
    } else {
      goToNextProgramRace();
    }
  }
  state.selectedSwimmerId = "";
  render();
}

function goToPreviousSeries() {
  const numbers = availableSeriesNumbers();
  const finals = finalProgramRowsForRace();
  const finalStages = finals.map((row) => row.stage);
  if (!numbers.length && !finalStages.length) return;
  if (isFinalStage(state.series)) {
    const currentFinalIndex = finalStages.indexOf(state.series);
    const previousFinal = finalStages[currentFinalIndex - 1];
    if (previousFinal) {
      state.series = previousFinal;
    } else if (numbers.length) {
      state.series = String(numbers[numbers.length - 1]);
    } else {
      goToPreviousProgramRace();
    }
  } else if (state.series === "all") {
    goToPreviousProgramRace();
  } else {
    const currentIndex = numbers.indexOf(Number(state.series));
    const previous = numbers[currentIndex - 1];
    if (previous) {
      state.series = String(previous);
    } else {
      goToPreviousProgramRace();
    }
  }
  state.selectedSwimmerId = "";
  render();
}

function toggleAntoineOverlay() {
  if (!antoineOverlay) return;
  antoineOverlay.hidden = !antoineOverlay.hidden;
}

nextSeriesBtn?.addEventListener("click", goToNextSeries);
nextSeriesInlineBtn?.addEventListener("click", goToNextSeries);
nextSeriesFloatBtn?.addEventListener("click", goToNextSeries);

document.addEventListener("keydown", (event) => {
  const target = event.target;
  if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goToNextSeries();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToPreviousSeries();
  } else if (event.key.toLowerCase() === "s") {
    event.preventDefault();
    sessionControls?.querySelector("[data-session]")?.focus();
  } else if (event.key.toLowerCase() === "a") {
    event.preventDefault();
    toggleAntoineOverlay();
  }
});

lineOrderBtn?.addEventListener("click", () => {
  state.lineOrder = state.lineOrder === "desc" ? "asc" : "desc";
  renderEntrants();
});

searchInput?.addEventListener("input", () => {
  state.search = searchInput.value;
  state.selectedSwimmerId = "";
  renderEntrants();
});

categorySelect.addEventListener("change", () => {
  state.category = categorySelect.value;
  state.selectedSwimmerId = "";
  selectRecordForCategory(state.category);
  renderHeaderReferences();
  renderEntrants();
});

entrantsBody.addEventListener("click", (event) => {
  const row = event.target.closest("tr[data-swimmer-id]");
  if (!row) return;
  state.selectedSwimmerId = row.dataset.swimmerId;
  renderEntrants();
});

swimmerDetails.addEventListener("click", (event) => {
  if (!event.target.closest(".close-details")) return;
  state.selectedSwimmerId = "";
  renderEntrants();
});

document.querySelector("#printBtn")?.addEventListener("click", () => window.print());
document.querySelector("#exportBtn")?.addEventListener("click", downloadJson);

async function fetchGeneratedData() {
  try {
    const response = await fetch(`donnees-speaker-france-2026.json?v=${Date.now()}`);
    if (response.ok) {
      const freshData = normalizeData(await response.json());
      if (freshData.sourceVersion) {
        renderDataStatus();
      }
      return freshData;
    }
  } catch {
    if (!data.sourceVersion) {
      renderDataStatus("Impossible de charger donnees-speaker-france-2026.json. Vérifie que le fichier est publié au même niveau que index.html.");
    }
    return null;
  }
  return null;
}

function applyFreshData(freshData, resetView = false) {
  data = normalizeData(freshData || sampleData);
  if (resetView) {
    state.eventId = data.events[0]?.id || "";
    state.sex = "F";
    state.programKey = "";
    state.category = "all";
    state.series = "all";
    state.selectedSwimmerId = "";
    state.selectedRecordKey = "";
    document.querySelectorAll(".segment").forEach((item) => item.classList.toggle("active", item.dataset.sex === "F"));
  } else {
    if (!data.events.some((event) => event.id === state.eventId)) {
      state.eventId = data.events[0]?.id || "";
      state.programKey = "";
    }
    state.selectedSwimmerId = "";
  }
  saveData();
  render();
}

async function reloadBaseData() {
  renderDataStatus("Régénération des données en cours...");
  let regenerateOk = true;
  try {
    const response = await fetch("regenerate", { method: "POST" });
    if (!response.ok) {
      regenerateOk = false;
      renderDataStatus("La régénération automatique n'est pas disponible ici. En local, lance la console avec Demarrer la console.bat.");
    }
  } catch {
    regenerateOk = false;
    renderDataStatus("La régénération automatique n'est pas disponible ici. En local, lance la console avec Demarrer la console.bat.");
  }
  const freshData = await fetchGeneratedData();
  if (freshData?.sourceVersion) {
    applyFreshData(freshData, true);
  } else if (regenerateOk) {
    renderDataStatus("Les données n'ont pas pu être rechargées. Vérifie que donnees-speaker-france-2026.json existe bien.");
  }
}

async function checkForGeneratedUpdates() {
  const freshData = await fetchGeneratedData();
  if (!freshData?.sourceVersion) return;
  if (freshData.sourceVersion === data.sourceVersion) {
    renderDataStatus();
    return;
  }
  applyFreshData(freshData, false);
}

document.querySelector("#reloadDataBtn")?.addEventListener("click", reloadBaseData);
document.querySelector("#loadSampleBtn")?.addEventListener("click", reloadBaseData);
setInterval(checkForGeneratedUpdates, 5000);

jsonInput?.addEventListener("change", async () => {
  const file = jsonInput.files[0];
  if (!file) return;
  const text = await file.text();
  data = normalizeData(JSON.parse(text));
  state.eventId = data.events[0]?.id || sampleData.events[0].id;
  state.series = "all";
  saveData();
  render();
  jsonInput.value = "";
});

document.querySelector("#importCsvBtn")?.addEventListener("click", () => {
  const imported = parseCsv(csvInput.value);
  if (!imported.length) return;
  data.entrants = data.entrants.concat(imported);
  csvInput.value = "";
  saveData();
  render();
});

render();
checkForGeneratedUpdates();
