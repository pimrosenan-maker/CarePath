import type { AssessmentData, RecommendationResult } from '@/src/types/assessment';

export const initialAssessment: AssessmentData = {
  eventType: '',
  bodyLocation: '',
  redFlags: [],
  symptoms: [],
  weightBearing: '',
  straighten: '',
  bend: '',
  pain: 0,
  timeline: '',
  goal: '',
  notes: '',
};

const hasEmergencyRedFlag = (redFlags: string[]) => redFlags.some((flag) => flag !== 'None of these');

const significantTrauma = (eventType: string) =>
  ['Sports injury', 'Fall', 'Direct impact', 'Car or bike accident'].includes(eventType);

export function evaluateAssessment(data: AssessmentData): RecommendationResult {
  if (hasEmergencyRedFlag(data.redFlags)) {
    return {
      level: 'Emergency Services',
      urgency: 'Seek immediate emergency care',
      summary:
        'Your answers include emergency warning signs that can require immediate medical evaluation. CarePath is not diagnosing your condition, but the triage result is an emergency pathway.',
      reasons: [
        'At least one emergency red flag was selected',
        'Symptoms may require immediate clinician evaluation',
      ],
      options: ['Call 911', 'Go to the nearest emergency department'],
      nextSteps: [
        'Do not continue activity or try to walk it off',
        'Bring your ID and insurance card if available',
        'Tell staff what happened and what symptoms are active now',
      ],
      rights: [
        'Emergency care requirements apply in many serious situations, but exact coverage depends on your insurance and the care received.',
        'Coverage and cost depend on your insurance plan and situation. CarePath does not guarantee coverage.',
      ],
      isEmergency: true,
    };
  }

  const immediateSwelling = data.symptoms.includes('Immediate swelling');
  const heardPop = data.symptoms.includes('I heard or felt a pop');
  const unableContinue = data.symptoms.includes('I could not continue the activity');
  const couldNotStand = data.symptoms.includes('I could not stand');
  const cannotStraighten = data.straighten === 'No' || data.straighten === 'Almost';
  const severePain = data.pain >= 9;
  const majorLoss = data.weightBearing === 'Not at all' || data.weightBearing === 'Barely';
  const rapidWorsening = data.timeline === 'Within the last few hours' || data.timeline === 'Today';

  if (
    significantTrauma(data.eventType) &&
    (data.weightBearing === 'Not at all' || severePain || (majorLoss && rapidWorsening))
  ) {
    return {
      level: 'Emergency Department',
      urgency: 'Emergency Department',
      summary:
        'This combination of trauma and major loss of function can warrant hospital-level evaluation. CarePath is not determining the diagnosis, but it is flagging the need for emergency assessment.',
      reasons: [
        data.eventType ? `Significant traumatic event: ${data.eventType}` : 'Significant traumatic event',
        data.weightBearing === 'Not at all' ? 'Unable to bear weight at all' : 'Major functional loss',
        severePain ? 'Pain is severe' : 'Symptoms are ongoing and function is limited',
      ],
      options: ['Emergency department', 'Urgent care if a hospital is unavailable and symptoms are not worsening'],
      nextSteps: [
        'Seek urgent evaluation today',
        'Bring your insurance card and medication list',
        'Do not continue activity while symptoms remain significant',
      ],
      rights: [
        'Hospital emergency departments are subject to federal emergency-care requirements. In certain situations, patients have protections related to emergency screening, stabilization, and surprise out-of-network billing.',
        'Coverage and cost depend on your insurance plan and situation. CarePath does not guarantee coverage.',
      ],
      isEmergency: true,
    };
  }

  const sameDayCriteria = [
    immediateSwelling,
    heardPop,
    cannotStraighten,
    majorLoss,
    unableContinue,
    couldNotStand,
    data.pain >= 6,
  ].filter(Boolean).length;

  if (!hasEmergencyRedFlag(data.redFlags) && sameDayCriteria >= 2) {
    return {
      level: 'Urgent Care / Same-Day Evaluation',
      urgency: 'Same-day evaluation',
      summary:
        'This pattern can warrant prompt medical evaluation today. CarePath is not diagnosing the injury, but these findings suggest urgent assessment is reasonable.',
      reasons: [
        data.eventType ? `Acute event: ${data.eventType}` : 'Acute event',
        heardPop ? 'Heard or felt a pop' : 'Urgent injury symptoms reported',
        immediateSwelling ? 'Immediate swelling' : 'Swelling noted',
        cannotStraighten ? 'Limited ability to straighten the knee' : 'Movement is limited',
        majorLoss ? 'Difficulty bearing weight' : 'Movement is restricted',
      ],
      options: ['Urgent care', 'Orthopedic urgent care', 'Emergency department if symptoms worsen'],
      nextSteps: [
        'Seek evaluation today',
        'Bring your insurance card and medication list',
        'Tell the clinician exactly how the injury happened',
        'Mention swelling, popping, and difficulty moving the joint',
        'Ask what follow-up is needed',
        'Keep your discharge paperwork',
      ],
      rights: [
        'You can ask whether a same-day visit is appropriate and whether a referral or authorization is needed.',
        'Coverage and cost depend on your insurance plan and situation. CarePath does not guarantee coverage.',
      ],
      isEmergency: false,
    };
  }

  if (
    !hasEmergencyRedFlag(data.redFlags) &&
    data.weightBearing !== 'Not at all' &&
    data.pain <= 5 &&
    (data.weightBearing === 'Yes, normally' || data.weightBearing === 'Yes, but it hurts') &&
    (data.straighten === 'Yes' || data.straighten === 'Almost') &&
    (data.bend === 'Yes' || data.bend === 'Somewhat')
  ) {
    return {
      level: 'Specialist / Outpatient Follow-Up',
      urgency: 'Outpatient follow-up',
      summary:
        'Your symptoms do not indicate emergency-level care, and function is relatively preserved. A specialist or outpatient follow-up may be reasonable depending on symptoms and the clinician’s exam.',
      reasons: [
        'No emergency warning signs were reported',
        'Weight-bearing is still possible',
        'Pain is relatively low and movement is more preserved',
      ],
      options: ['Primary care', 'Orthopedic specialist', 'Self-care plus planned follow-up'],
      nextSteps: [
        'Monitor symptoms over the next 24–48 hours',
        'Schedule follow-up if pain or function does not improve',
        'Document what happened and any treatment you have already tried',
      ],
      rights: [
        'You can ask whether a referral is needed and what type of specialist is appropriate.',
        'Coverage and cost depend on your insurance plan and situation. CarePath does not guarantee coverage.',
      ],
      isEmergency: false,
    };
  }

  return {
    level: 'Urgent Care / Same-Day Evaluation',
    urgency: 'Prompt evaluation',
    summary:
      'Your answers fall between the urgent and outpatient range, so the safer path is prompt evaluation. CarePath is not determining the specific injury.',
    reasons: [
      'Some concerning symptoms were reported',
      'Function or symptoms remain significant enough to warrant prompt follow-up',
      'The assessment favors a safer level of care given the uncertainty',
    ],
    options: ['Urgent care', 'Same-day orthopedic evaluation', 'Emergency department if symptoms worsen'],
    nextSteps: [
      'Seek prompt evaluation',
      'Bring your insurance card and medication list',
      'Ask whether imaging or specialist follow-up is appropriate',
    ],
    rights: [
      'You can ask about same-day options and who should evaluate the injury first.',
      'Coverage and cost depend on your insurance plan and situation. CarePath does not guarantee coverage.',
    ],
    isEmergency: false,
  };
}
