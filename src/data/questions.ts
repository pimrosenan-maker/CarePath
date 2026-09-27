export const questionMeta = [
  { key: 'eventType', title: 'What happened?', total: 10 },
  { key: 'bodyLocation', title: 'Where are you injured?', total: 10 },
  { key: 'redFlags', title: 'Before we continue, are any of these happening?', total: 10 },
  { key: 'symptoms', title: 'Which of these happened when you were injured?', total: 10 },
  { key: 'weightBearing', title: 'Can you put weight on your injured leg?', total: 10 },
  { key: 'straighten', title: 'Can you fully straighten your knee?', total: 10 },
  { key: 'bend', title: 'Can you bend your knee normally?', total: 10 },
  { key: 'pain', title: 'How severe is your pain?', total: 10 },
  { key: 'timeline', title: 'When did the injury happen?', total: 10 },
  { key: 'goal', title: 'What are you trying to decide?', total: 10 },
] as const;

export const eventTypeOptions = [
  'Sports injury',
  'Fall',
  'Direct impact',
  'Car or bike accident',
  'Pain without a clear injury',
  'Other',
] as const;

export const bodyLocationOptions = [
  'Knee',
  'Ankle / Foot',
  'Wrist / Hand',
  'Shoulder / Arm',
  'Back',
  'Other',
] as const;

export const redFlagOptions = [
  'Trouble breathing',
  'Loss of consciousness or fainting',
  'Severe uncontrolled bleeding',
  'Limb looks severely deformed',
  'Foot is blue, very pale, cold, or numb',
  'Severe confusion',
  'Sudden unbearable pain',
  'None of these',
] as const;

export const symptomOptions = [
  'I heard or felt a pop',
  'Immediate swelling',
  'Gradual swelling',
  'I could not continue the activity',
  'I could not stand',
  'None of these',
] as const;

export const weightOptions = [
  'Yes, normally',
  'Yes, but it hurts',
  'Barely',
  'Not at all',
] as const;

export const straighteningOptions = ['Yes', 'Almost', 'No'] as const;
export const bendingOptions = ['Yes', 'Somewhat', 'Very little'] as const;
export const timelineOptions = [
  'Within the last few hours',
  'Today',
  '1–3 days ago',
  'More than 3 days ago',
] as const;

export const goalOptions = [
  'Whether I should go somewhere today',
  'Whether I can wait',
  'Where I should go',
  'What my next step should be',
] as const;
