export type AssessmentStep =
  | 'eventType'
  | 'bodyLocation'
  | 'redFlags'
  | 'symptoms'
  | 'weightBearing'
  | 'straighten'
  | 'bend'
  | 'pain'
  | 'timeline'
  | 'goal';

export type RecommendationLevel =
  | 'Emergency Services'
  | 'Emergency Department'
  | 'Urgent Care / Same-Day Evaluation'
  | 'Specialist / Outpatient Follow-Up';

export type UserEventType =
  | 'Sports injury'
  | 'Fall'
  | 'Direct impact'
  | 'Car or bike accident'
  | 'Pain without a clear injury'
  | 'Other';

export type BodyLocation =
  | 'Knee'
  | 'Ankle / Foot'
  | 'Wrist / Hand'
  | 'Shoulder / Arm'
  | 'Back'
  | 'Other';

export interface AssessmentData {
  eventType: UserEventType | '';
  bodyLocation: BodyLocation | '';
  redFlags: string[];
  symptoms: string[];
  weightBearing: '' | 'Yes, normally' | 'Yes, but it hurts' | 'Barely' | 'Not at all';
  straighten: '' | 'Yes' | 'Almost' | 'No';
  bend: '' | 'Yes' | 'Somewhat' | 'Very little';
  pain: number;
  timeline: '' | 'Within the last few hours' | 'Today' | '1–3 days ago' | 'More than 3 days ago';
  goal: '' | 'Whether I should go somewhere today' | 'Whether I can wait' | 'Where I should go' | 'What my next step should be';
  notes: string;
}

export interface RecommendationResult {
  level: RecommendationLevel;
  urgency: string;
  summary: string;
  reasons: string[];
  options: string[];
  nextSteps: string[];
  rights: string[];
  isEmergency: boolean;
}
