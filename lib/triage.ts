export type InjuryType = 'knee' | 'ankle' | 'shoulder' | 'wrist';

export type RecommendationLevel = 'emergency' | 'same-day' | 'urgent' | 'outpatient';

export interface AssessmentForm {
  injuryType: InjuryType;
  mechanism: 'twisted' | 'fell' | 'impact' | 'other';
  heardPop: boolean;
  immediateSwelling: boolean;
  unableBearWeight: boolean;
  cannotStraighten: boolean;
  severeDeformity: boolean;
  troubleBreathing: boolean;
  lossOfConsciousness: boolean;
  severeBleeding: boolean;
  severePain: boolean;
}

export interface Recommendation {
  level: RecommendationLevel;
  title: string;
  summary: string;
  reasons: string[];
  options: string[];
  nextSteps: string[];
  rights: string[];
}

export function buildDemoState(): AssessmentForm {
  return {
    injuryType: 'knee',
    mechanism: 'twisted',
    heardPop: true,
    immediateSwelling: true,
    unableBearWeight: true,
    cannotStraighten: true,
    severeDeformity: false,
    troubleBreathing: false,
    lossOfConsciousness: false,
    severeBleeding: false,
    severePain: false,
  };
}

export function evaluateAssessment(form: AssessmentForm): Recommendation {
  if (
    form.troubleBreathing ||
    form.lossOfConsciousness ||
    form.severeBleeding ||
    form.severeDeformity
  ) {
    return {
      level: 'emergency',
      title: 'Emergency evaluation recommended',
      summary:
        'Your answers include warning signs that can require immediate medical evaluation. Do not wait for follow-up.',
      reasons: [
        'Possible emergency warning signs were reported',
        'Serious trauma or a severe physical problem may require urgent hospital care',
      ],
      options: ['Call 911', 'Go to the nearest emergency department'],
      nextSteps: ['Do not continue activity', 'Bring your insurance card', 'Tell staff what happened and when it started'],
      rights: [
        'Many emergency departments must screen for emergency medical conditions regardless of ability to pay.',
        'Emergency services may be protected from some surprise-billing rules depending on your plan and service type.',
      ],
    };
  }

  const reasons: string[] = [];

  if (form.heardPop) reasons.push('You reported a popping sound');
  if (form.immediateSwelling) reasons.push('Swelling happened right away');
  if (form.unableBearWeight) reasons.push('You cannot bear weight normally');
  if (form.cannotStraighten) reasons.push('You have limited ability to straighten the joint');
  if (form.mechanism === 'twisted') reasons.push('The injury was caused by a twisting or sudden movement');

  if (form.heardPop && form.immediateSwelling && (form.unableBearWeight || form.cannotStraighten)) {
    return {
      level: 'same-day',
      title: 'Same-day evaluation recommended',
      summary:
        'This pattern can warrant prompt orthopedic or urgent care evaluation today. CarePath is not diagnosing the injury, but it is flagging the need for same-day assessment.',
      reasons,
      options: ['Orthopedic urgent care', 'Urgent care with musculoskeletal capability', 'Emergency department if symptoms worsen or if options are unavailable'],
      nextSteps: [
        'Seek evaluation today or tonight',
        'Bring your insurance card and a short injury timeline',
        'If imaging is recommended, ask whether a referral or authorization is needed',
      ],
      rights: [
        'You can ask providers what type of follow-up they recommend and whether the visit is in-network.',
        'Emergency-care protections can apply in serious situations, but same-day urgent evaluation is still a separate pathway.',
      ],
    };
  }

  if (form.heardPop || form.immediateSwelling || form.unableBearWeight || form.cannotStraighten || form.severePain) {
    return {
      level: 'urgent',
      title: 'Prompt evaluation is recommended',
      summary:
        'Your symptoms suggest a problem that should not be ignored, but they do not clearly indicate an emergency. A same-day or next-available assessment is reasonable.',
      reasons,
      options: ['Urgent care', 'Primary care if it is open', 'Specialist follow-up if directed'],
      nextSteps: [
        'Avoid further strain on the affected area',
        'Use rest, ice, and elevation if appropriate and safe',
        'Schedule medical follow-up promptly unless symptoms worsen',
      ],
      rights: [
        'You can ask providers whether this is a same-day visit or whether a referral is needed.',
        'Understanding your plan and out-of-network rules can prevent surprise costs later.',
      ],
    };
  }

  return {
    level: 'outpatient',
    title: 'Outpatient evaluation may be appropriate',
    summary:
      'Your answers do not show the warning signs that usually require emergency care. This looks more like a routine follow-up issue than an immediate emergency.',
    reasons: ['No emergency warning signs were reported', 'Symptoms appear manageable enough for outpatient follow-up'],
    options: ['Primary care', 'Specialist evaluation', 'Self-care with scheduled follow-up'],
    nextSteps: ['Monitor symptoms over the next 24–48 hours', 'Schedule a follow-up if pain or function does not improve', 'Document what happened and what you have already tried'],
    rights: [
      'You can ask a clinic whether they handle this type of issue without a referral.',
      'If your symptoms worsen, escalate to same-day or emergency care sooner.',
    ],
  };
}
