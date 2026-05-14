const STORAGE_KEY = "napSpeakerFrance2026:v3";

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
  selectedSwimmerId: "",
  selectedRecordKey: ""
};

const eventSelect = document.querySelector("#eventSelect");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const entrantsBody = document.querySelector("#entrantsBody");
const entrantCount = document.querySelector("#entrantCount");
const filteredCount = document.querySelector("#filteredCount");
const bestEntry = document.querySelector("#bestEntry");
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
  return `${swimmer.firstName || ""} ${swimmer.lastName || ""}`.trim() || swimmer.name || "Nageur à renseigner";
}

function entrantPersonKey(entrant) {
  return `${entrant.sex || ""}|${normalizePersonName(formatName(entrant))}`;
}

function currentEvent() {
  return data.events.find((event) => event.id === state.eventId) || data.events[0];
}

function matchesRace(item) {
  return item.eventId === state.eventId && item.sex === state.sex;
}

function raceEntrants() {
  const query = state.search.trim().toLowerCase();
  return data.entrants
    .filter(matchesRace)
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
    .sort((a, b) => timeToMs(a.seedTime) - timeToMs(b.seedTime));
}

function updateEventSelect() {
  eventSelect.innerHTML = data.events.map((event) => (
    `<option value="${escapeHtml(event.id)}">${escapeHtml(event.label)}</option>`
  )).join("");
  eventSelect.value = state.eventId;
}

function render() {
  if (!data.events.length) {
    data.events = structuredClone(sampleData.events);
    state.eventId = data.events[0].id;
  }
  if (!data.events.some((event) => event.id === state.eventId)) {
    state.eventId = data.events[0].id;
  }

  updateEventSelect();
  renderCategorySelect();
  renderHeader();
  renderHeaderReferences();
  renderEntrants();
  renderTop2025();
  renderDataStatus();
}

function renderDataStatus(message = "") {
  if (!dataStatus) return;
  if (message) {
    dataStatus.hidden = false;
    dataStatus.textContent = message;
    dataStatus.classList.add("warning");
    return;
  }
  if (data.sourceVersion) {
    dataStatus.hidden = true;
    dataStatus.textContent = "";
    return;
  }
  dataStatus.hidden = false;
  dataStatus.textContent = "Données officielles non chargées. Sur GitHub Pages, vérifie que data.generated.js et donnees-speaker-france-2026.json sont bien publiés.";
  dataStatus.classList.add("warning");
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
    ...categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
  ].join("");
  categorySelect.value = state.category;
}

function renderHeader() {
  const event = currentEvent();
  const sexLabel = state.sex === "F" ? "Femmes" : "Hommes";
  raceTitle.textContent = event?.label || "Course";
  raceMeta.textContent = `${event?.discipline || "Discipline"} - ${event?.distance || ""} - toutes catégories`;
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
      <span class="ref-chip cat-senior">
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
  const visibleEntrants = entrants;
  entrantCount.textContent = allRaceEntrants.length;
  filteredCount.textContent = `${visibleEntrants.length} affichés`;
  const best = [...allRaceEntrants].sort((a, b) => timeToMs(a.seedTime) - timeToMs(b.seedTime))[0];
  bestEntry.textContent = best?.seedTime || "--";

  entrantsBody.innerHTML = visibleEntrants.length ? visibleEntrants.map((entrant, index) => {
    const reference = getEntrantReference(entrant);
    const swimmerId = entrant.swimmerId || entrantKey(entrant);
    return `
      <tr class="${state.selectedSwimmerId === swimmerId ? "selected-row" : ""} category-row ${categoryClass(entrant.category)}" data-swimmer-id="${escapeHtml(swimmerId)}">
        <td><span class="lane">${index + 1}</span></td>
        <td class="name-cell">
          <button class="swimmer-button" data-swimmer-id="${escapeHtml(swimmerId)}">${escapeHtml(formatName(entrant))} <span class="birth-year">(${escapeHtml(getBirthYearLabel(entrant.birthDate))})</span>${renderEdfBadges(entrant)}</button>
          <span>${escapeHtml(entrant.club || "-")}</span>
        </td>
        <td><span class="category-pill">${escapeHtml(entrant.category || "-")}</span></td>
        <td class="time-cell">
          <span class="time">${escapeHtml(entrant.seedTime || "-")}</span>
          <span class="seed-source">${escapeHtml(entrant.seedSource || "régional")}</span>
        </td>
        <td>${reference}</td>
      </tr>
    `;
  }).join("") : `<tr><td colspan="5" class="empty">Aucun engage pour cette selection.</td></tr>`;
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
    references.push(`<span class="badge category-mini ${categoryClass(top2025Match.category)}">2025: ${escapeHtml(formatRank(top2025Match.rank))} ${escapeHtml(top2025Match.category)} - ${escapeHtml(top2025Match.time || "-")}</span>`);
    if (record2025) {
      references.push(`<span class="badge record-alert">Temps 2025 = ${escapeHtml(shortRecordLabel(record2025))}</span>`);
    }
  }
  const heldRecords = findRecordsHeldByEntrant(entrant).filter((record) => (
    !sameTime(record.time, entrant.seedTime) && (!top2025Match || !sameTime(record.time, top2025Match.time))
  ));
  heldRecords.forEach((record) => {
    references.push(`<span class="badge holder-alert">Détient ${escapeHtml(shortRecordLabel(record))}</span>`);
  });
  const raceMedals = findInternationalMedalsForRace(entrant);
  raceMedals.forEach((medal) => {
    references.push(`<span class="badge international-alert">${escapeHtml(medal.medal || "Médaille")} ${escapeHtml(shortChampionshipLabel(medal.championship))}</span>`);
  });
  return references.length ? `<div class="reference-badges">${references.join("")}</div>` : `<span class="muted-text">Repère libre</span>`;
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

function findRecordsHeldByEntrant(entrant) {
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
        <span>${escapeHtml(swimmer.club || "")} - ${escapeHtml(swimmer.category || "")} - ${escapeHtml(getBirthYearLabel(swimmer.birthDate))}</span>
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
            <div class="detail-row ${categoryClass(record.category)}">
              <span><strong>${escapeHtml(shortRecordLabel(record))}</strong> ${escapeHtml(eventLabel(record.eventId))}</span>
              <span>${escapeHtml([record.time, record.date, record.place].filter(Boolean).join(" - ") || "-")}</span>
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
              <span class="medal-dot ${medalClass(medal.medal)}" aria-label="${escapeHtml(medal.medal || "Médaille")}"></span>
              <span><strong>${escapeHtml(shortChampionshipLabel(medal.championship))}</strong> ${escapeHtml(medal.eventLabel || eventLabel(medal.eventId))}</span>
              <span>${escapeHtml(medal.time || "")}</span>
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
              <span><strong>${escapeHtml(formatRank(row.rank))}</strong> ${escapeHtml(row.category || "")}</span>
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
  return data.records
    .filter(matchesRace)
    .sort((a, b) => (order[a.category] || 99) - (order[b.category] || 99));
}

function shortRecordLabel(row) {
  if (sameCategory(row.category, "Cadet")) return state.sex === "F" ? "MPF cadette" : "MPF cadet";
  if (sameCategory(row.category, "Junior")) return "RF junior";
  if (sameCategory(row.category, "Senior")) return "RF senior";
  return row.label || row.category || "Record";
}

function renderTop2025() {
  const categories = ["Cadet", "Junior", "Senior"];
  top2025Box.innerHTML = categories.map((category) => {
    const rows = data.top2025
      .filter((item) => matchesRace(item) && sameCategory(item.category, category))
      .sort((a, b) => (a.rank || 99) - (b.rank || 99))
      .slice(0, 5);
    return `
      <div class="ranking-list">
        <h4>${category}</h4>
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
  state.search = "";
  state.category = "all";
  state.selectedSwimmerId = "";
  state.selectedRecordKey = "";
  searchInput.value = "";
  render();
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.sex = button.dataset.sex;
    state.search = "";
    state.category = "all";
    state.selectedSwimmerId = "";
    state.selectedRecordKey = "";
    searchInput.value = "";
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

searchInput.addEventListener("input", () => {
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

document.querySelector("#printBtn").addEventListener("click", () => window.print());
document.querySelector("#exportBtn").addEventListener("click", downloadJson);

async function fetchGeneratedData() {
  try {
    const response = await fetch(`donnees-speaker-france-2026.json?v=${Date.now()}`);
    if (response.ok) {
      return normalizeData(await response.json());
    }
  } catch {
    renderDataStatus("Impossible de charger donnees-speaker-france-2026.json. Vérifie que le fichier est publié au même niveau que index.html.");
    return null;
  }
  return null;
}

function applyFreshData(freshData, resetView = false) {
  const previousNotes = data.notes || {};
  data = normalizeData(freshData || sampleData);
  data.notes = { ...data.notes, ...previousNotes };
  if (resetView) {
    state.eventId = data.events[0]?.id || "";
    state.sex = "F";
    state.category = "all";
    state.selectedSwimmerId = "";
    state.selectedRecordKey = "";
    document.querySelectorAll(".segment").forEach((item) => item.classList.toggle("active", item.dataset.sex === "F"));
  } else {
    if (!data.events.some((event) => event.id === state.eventId)) {
      state.eventId = data.events[0]?.id || "";
    }
    state.selectedSwimmerId = "";
  }
  saveData();
  render();
}

async function reloadBaseData() {
  const freshData = await fetchGeneratedData();
  applyFreshData(freshData || structuredClone(sampleData), true);
}

async function checkForGeneratedUpdates() {
  const freshData = await fetchGeneratedData();
  if (!freshData?.sourceVersion || freshData.sourceVersion === data.sourceVersion) return;
  applyFreshData(freshData, false);
}

document.querySelector("#reloadDataBtn").addEventListener("click", reloadBaseData);
document.querySelector("#loadSampleBtn").addEventListener("click", reloadBaseData);
setInterval(checkForGeneratedUpdates, 5000);

jsonInput.addEventListener("change", async () => {
  const file = jsonInput.files[0];
  if (!file) return;
  const text = await file.text();
  data = normalizeData(JSON.parse(text));
  state.eventId = data.events[0]?.id || sampleData.events[0].id;
  saveData();
  render();
  jsonInput.value = "";
});

document.querySelector("#importCsvBtn").addEventListener("click", () => {
  const imported = parseCsv(csvInput.value);
  if (!imported.length) return;
  data.entrants = data.entrants.concat(imported);
  csvInput.value = "";
  saveData();
  render();
});

render();
checkForGeneratedUpdates();
