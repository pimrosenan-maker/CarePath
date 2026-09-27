# CarePath

CarePath is a care-navigation prototype for acute musculoskeletal injuries. It helps people organize what happened, screen for emergency warning signs, and consider an appropriate care setting. It does not diagnose medical conditions or replace professional medical advice.

## MVP scope

- A structured, multi-step injury assessment
- Deterministic, safety-first triage rules
- Emergency, emergency-department, same-day, and outpatient recommendation levels
- Recommended next steps, care-setting comparison, and a summary to share with a clinician
- Plain-language care access information

This is a hackathon MVP. Its rules have not been clinically validated. Recommendations are not a substitute for professional evaluation. If you believe you are experiencing a medical emergency, call 911.

## Tech stack

- Next.js 14
- React and TypeScript
- Tailwind CSS

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verify

```bash
npm run build
npm run lint
```

## Project structure

- `app/` - Next.js app entry and global styles
- `src/components/` - reusable interface components
- `src/data/` - assessment questions and options
- `src/logic/triageRules.ts` - deterministic recommendation rules
- `src/screens/` - landing, assessment, and result screens
- `src/types/` - assessment and recommendation types

## Safety and privacy

The prototype runs its assessment locally in the browser and has no database or backend. Do not enter identifying or sensitive health information into a demo deployment. Triage logic and patient-rights content require review by qualified clinical and legal experts before real-world use.