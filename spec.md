# IPLVERSE – IPL Match Prediction Platform

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Hero section with animated purple gradient arc background, title, and CTA buttons
- Upcoming Matches section with match cards showing team names, date, venue, countdown timer, and conditional prediction unlock (enabled only within 24 hours of match)
- Prediction Result page/modal: predicted winner, win probability donut/bar chart, AI reasoning breakdown (form, head-to-head, player perf, venue stats, pitch)
- Prediction History dashboard: table of past predictions with date, match, predicted winner, actual winner, result (+1/0); summary stats (total, correct, accuracy %)
- Feature Cards section: 4 cards explaining Match Prediction, AI Match Analysis, Upcoming Matches, Prediction Accuracy Tracker
- Dark futuristic fintech UI: #0a0a0a background, neon purple accents, glassmorphism cards, smooth animations

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend (Motoko)
- Store IPL 2026 match schedule (team1, team2, date, venue)
- Store predictions per match: predicted winner, win probability, AI reasoning
- Store prediction history: date, match id, predicted winner, actual winner, result
- Query functions: getUpcomingMatches, getPrediction(matchId), getPredictionHistory, getStats
- Logic: prediction only unlockable if match is within 24 hours
- Seed realistic IPL 2026 schedule data

### Frontend (React + Tailwind)
- Single-page app with sections: Hero, Upcoming Matches, Features, Prediction History
- Prediction modal/page triggered by 'Predict Match' button
- Recharts for win probability visualization
- Countdown timers per match card
- Glassmorphism card components
- Framer-motion-style animations via Tailwind transitions
- Fully responsive
