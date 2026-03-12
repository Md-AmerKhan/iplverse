// Official IPL 2026 team brand colors
export interface TeamColorSet {
  primary: string;
  bg: string;
  border: string;
  glow: string;
}

export const TEAM_COLORS: Record<string, TeamColorSet> = {
  SRH: {
    primary: "#FF6B00",
    bg: "rgba(255,107,0,0.18)",
    border: "rgba(255,107,0,0.45)",
    glow: "rgba(255,107,0,0.3)",
  },
  KKR: {
    primary: "#3A225D",
    bg: "rgba(58,34,93,0.35)",
    border: "rgba(130,80,210,0.5)",
    glow: "rgba(130,80,210,0.3)",
  },
  MI: {
    primary: "#004BA0",
    bg: "rgba(0,75,160,0.25)",
    border: "rgba(0,120,220,0.5)",
    glow: "rgba(0,120,220,0.3)",
  },
  CSK: {
    primary: "#F9CD05",
    bg: "rgba(249,205,5,0.18)",
    border: "rgba(249,205,5,0.5)",
    glow: "rgba(249,205,5,0.3)",
  },
  RR: {
    primary: "#E8437A",
    bg: "rgba(232,67,122,0.18)",
    border: "rgba(232,67,122,0.5)",
    glow: "rgba(232,67,122,0.3)",
  },
  RCB: {
    primary: "#C8102E",
    bg: "rgba(200,16,46,0.22)",
    border: "rgba(200,16,46,0.5)",
    glow: "rgba(200,16,46,0.3)",
  },
  GT: {
    primary: "#1C3260",
    bg: "rgba(28,50,96,0.35)",
    border: "rgba(60,100,180,0.5)",
    glow: "rgba(60,100,180,0.3)",
  },
  LSG: {
    primary: "#E63329",
    bg: "rgba(230,51,41,0.2)",
    border: "rgba(230,51,41,0.5)",
    glow: "rgba(230,51,41,0.3)",
  },
  PBKS: {
    primary: "#AA0000",
    bg: "rgba(170,0,0,0.22)",
    border: "rgba(170,0,0,0.5)",
    glow: "rgba(170,0,0,0.3)",
  },
  DC: {
    primary: "#00AEEF",
    bg: "rgba(0,174,239,0.18)",
    border: "rgba(0,174,239,0.5)",
    glow: "rgba(0,174,239,0.3)",
  },
};

// Full name → abbreviation map
const NAME_TO_ABBR: Record<string, string> = {
  "sunrisers hyderabad": "SRH",
  "kolkata knight riders": "KKR",
  "mumbai indians": "MI",
  "chennai super kings": "CSK",
  "rajasthan royals": "RR",
  "royal challengers bengaluru": "RCB",
  "royal challengers bangalore": "RCB",
  "gujarat titans": "GT",
  "lucknow super giants": "LSG",
  "punjab kings": "PBKS",
  "delhi capitals": "DC",
};

const FALLBACK: TeamColorSet = {
  primary: "#a855f7",
  bg: "rgba(168,85,247,0.18)",
  border: "rgba(168,85,247,0.4)",
  glow: "rgba(168,85,247,0.25)",
};

export function getTeamColors(teamName: string): TeamColorSet {
  const upper = teamName.toUpperCase();
  // Direct abbreviation match
  if (TEAM_COLORS[upper]) return TEAM_COLORS[upper];
  // Abbreviation substring match
  const abbrMatch = Object.keys(TEAM_COLORS).find((k) => upper.includes(k));
  if (abbrMatch) return TEAM_COLORS[abbrMatch];
  // Full name match
  const lower = teamName.toLowerCase();
  const nameMatch = NAME_TO_ABBR[lower];
  if (nameMatch) return TEAM_COLORS[nameMatch];
  // Partial full name match
  const partialMatch = Object.entries(NAME_TO_ABBR).find(([key]) =>
    lower.includes(key.split(" ")[0]),
  );
  if (partialMatch) return TEAM_COLORS[partialMatch[1]];
  return FALLBACK;
}

export function getTeamAbbr(teamName: string): string {
  const upper = teamName.toUpperCase();
  const abbrMatch = Object.keys(TEAM_COLORS).find((k) => upper.includes(k));
  if (abbrMatch) return abbrMatch;
  const lower = teamName.toLowerCase();
  const nameMatch = NAME_TO_ABBR[lower];
  if (nameMatch) return nameMatch;
  // fallback: initials
  return teamName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}
