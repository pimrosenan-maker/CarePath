import { useMemo, useState } from 'react';
import { CareComparison } from '@/src/components/CareComparison';
import { Disclaimer } from '@/src/components/Disclaimer';
import { Header } from '@/src/components/Header';
import { OptionButton } from '@/src/components/OptionButton';
import { ProgressBar } from '@/src/components/ProgressBar';
import { QuestionCard } from '@/src/components/QuestionCard';
import { AssessmentSummary } from '@/src/components/AssessmentSummary';
import { ResultCard } from '@/src/components/ResultCard';
import { bodyLocationOptions, eventTypeOptions, goalOptions, questionMeta, redFlagOptions, straighteningOptions, symptomOptions, timelineOptions, weightOptions, bendingOptions } from '@/src/data/questions';
import { evaluateAssessment, initialAssessment } from '@/src/logic/triageRules';
import type { AssessmentData } from '@/src/types/assessment';

const pageTotal = 10;

const checkboxClass =
    'flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-slate-300 hover:bg-slate-100';

export function AssessmentPage() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<AssessmentData>(initialAssessment);
    const [notes, setNotes] = useState('');

    const currentTitle = questionMeta[step - 1]?.title ?? '';

    const isValid = useMemo(() => {
        if (step === 1) return Boolean(data.eventType);
        if (step === 2) return Boolean(data.bodyLocation);
        if (step === 3) return data.redFlags.length > 0;
        if (step === 4) return data.symptoms.length > 0;
        if (step === 5) return Boolean(data.weightBearing);
        if (step === 6) return Boolean(data.straighten);
        if (step === 7) return Boolean(data.bend);
        if (step === 8) return data.pain > 0 || data.pain === 0;
        if (step === 9) return Boolean(data.timeline);
        if (step === 10) return Boolean(data.goal);
        return true;
    }, [data, step]);

    const next = () => {
        if (step < pageTotal) setStep((prev) => prev + 1);
    };

    const back = () => {
        if (step > 1) setStep((prev) => prev - 1);
    };

    const setField = <K extends keyof AssessmentData>(key: K, value: AssessmentData[K]) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const toggleArrayValue = (key: 'symptoms' | 'redFlags', value: string) => {
        setData((prev) => {
            const existing = prev[key];
            const next = existing.includes(value)
                ? existing.filter((item) => item !== value)
                : [...existing, value];
            return { ...prev, [key]: next };
        });
    };

    const handleEmergencyRoute = () => {
        if (data.redFlags.includes('None of these')) {
            setData((prev) => ({ ...prev, redFlags: [] }));
        }
    };

    if (step === 3 && data.redFlags.some((flag) => flag !== 'None of these')) {
        return <EmergencyResult data={data} onReset={() => setData(initialAssessment)} notes={notes} />;
    }

    if (step === 11) {
        const recommendation = evaluateAssessment({ ...data, notes });
        return <ResultsPage data={data} recommendation={recommendation} onRestart={() => { setData(initialAssessment); setStep(1); setNotes(''); }} />;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <ProgressBar current={step} total={pageTotal} />
                </div>

                <QuestionCard title={currentTitle}>
                    {step === 1 && (
                        <div className="grid gap-3">
                            {eventTypeOptions.map((option) => (
                                <OptionButton
                                    key={option}
                                    label={option}
                                    selected={data.eventType === option}
                                    onClick={() => setField('eventType', option)}
                                />
                            ))}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {bodyLocationOptions.map((option) => (
                                    <OptionButton
                                        key={option}
                                        label={option}
                                        selected={data.bodyLocation === option}
                                        onClick={() => setField('bodyLocation', option)}
                                    />
                                ))}
                            </div>

                            {data.bodyLocation && data.bodyLocation !== 'Knee' && (
                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                                    This prototype currently demonstrates the knee injury pathway.
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="grid gap-3">
                            {redFlagOptions.map((option) => (
                                <label key={option} className={checkboxClass}>
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                        checked={data.redFlags.includes(option)}
                                        onChange={() => {
                                            if (option !== 'None of these') handleEmergencyRoute();
                                            toggleArrayValue('redFlags', option);
                                        }}
                                    />
                                    <span className="text-base font-medium text-slate-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {step === 4 && (
                        <div className="grid gap-3">
                            {symptomOptions.map((option) => (
                                <label key={option} className={checkboxClass}>
                                    <input
                                        type="checkbox"
                                        className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                        checked={data.symptoms.includes(option)}
                                        onChange={() => toggleArrayValue('symptoms', option)}
                                    />
                                    <span className="text-base font-medium text-slate-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {step === 5 && (
                        <div className="grid gap-3">
                            {weightOptions.map((option) => (
                                <OptionButton
                                    key={option}
                                    label={option}
                                    selected={data.weightBearing === option}
                                    onClick={() => setField('weightBearing', option)}
                                />
                            ))}
                        </div>
                    )}

                    {step === 6 && (
                        <div className="grid gap-3">
                            {straighteningOptions.map((option) => (
                                <OptionButton
                                    key={option}
                                    label={option}
                                    selected={data.straighten === option}
                                    onClick={() => setField('straighten', option)}
                                />
                            ))}
                        </div>
                    )}

                    {step === 7 && (
                        <div className="grid gap-3">
                            {bendingOptions.map((option) => (
                                <OptionButton
                                    key={option}
                                    label={option}
                                    selected={data.bend === option}
                                    onClick={() => setField('bend', option)}
                                />
                            ))}
                        </div>
                    )}

                    {step === 8 && (
                        <div className="space-y-5">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="mb-4 flex items-center justify-between text-sm font-medium text-slate-700">
                                    <span>0 = No pain</span>
                                    <span>{data.pain}/10</span>
                                    <span>10 = Worst pain imaginable</span>
                                </div>
                                <input
                                    aria-label="Pain score"
                                    type="range"
                                    min={0}
                                    max={10}
                                    value={data.pain}
                                    onChange={(e) => setField('pain', Number(e.target.value))}
                                    className="h-2 w-full accent-teal-600"
                                />
                            </div>
                        </div>
                    )}

                    {step === 9 && (
                        <div className="grid gap-3">
                            {timelineOptions.map((option) => (
                                <OptionButton
                                    key={option}
                                    label={option}
                                    selected={data.timeline === option}
                                    onClick={() => setField('timeline', option)}
                                />
                            ))}
                        </div>
                    )}

                    {step === 10 && (
                        <div className="grid gap-3">
                            {goalOptions.map((option) => (
                                <OptionButton
                                    key={option}
                                    label={option}
                                    selected={data.goal === option}
                                    onClick={() => setField('goal', option)}
                                />
                            ))}
                        </div>
                    )}

                    {step === 10 && (
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Tell us anything else about what happened</label>
                            <textarea
                                aria-label="Additional details"
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                rows={4}
                                placeholder="My knee locked after I fell. I’m on blood thinners."
                                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-teal-600"
                            />
                        </div>
                    )}
                </QuestionCard>

                <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={back}
                        disabled={step === 1}
                        className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            if (step === pageTotal) {
                                setStep(11);
                                return;
                            }
                            if (isValid) next();
                        }}
                        disabled={!isValid}
                        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {step === pageTotal ? 'See My Result' : 'Continue'}
                    </button>
                </div>

                <Disclaimer />
            </main>
        </div>
    );
}

function EmergencyResult({ data, onReset, notes }: { data: AssessmentData; onReset: () => void; notes: string }) {
    const summary = evaluateAssessment({ ...data, notes });

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-4xl rounded-[28px] border border-red-200 bg-white p-8 shadow-sm">
                <ResultCard
                    title="Call 911 / Emergency Services"
                    subtitle="Seek immediate emergency care"
                    accent="red"
                    reasons={summary.reasons}
                />

                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
                    <p className="font-semibold">Emergency guidance</p>
                    <p className="mt-2">This tool is not a diagnosis. Your responses include emergency warning signs that may require immediate evaluation. If you believe you are experiencing a medical emergency, call 911.</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={onReset}
                        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    );
}

function ResultsPage({
    data,
    recommendation,
    onRestart,
}: {
    data: AssessmentData;
    recommendation: ReturnType<typeof evaluateAssessment>;
    onRestart: () => void;
}) {
    const accent =
        recommendation.level === 'Emergency Services'
            ? 'red'
            : recommendation.level === 'Emergency Department'
                ? 'orange'
                : recommendation.level === 'Urgent Care / Same-Day Evaluation'
                    ? 'yellow'
                    : 'green';

    const summaryText = `Injury: ${data.bodyLocation || 'Not selected'}\nCause: ${data.eventType || 'Not selected'}\nOccurred: ${data.timeline || 'Not selected'}\nPain: ${data.pain}/10\nWeight bearing: ${data.weightBearing || 'Not selected'}\nSwelling: ${data.symptoms.includes('Immediate swelling') ? 'Immediate' : data.symptoms.includes('Gradual swelling') ? 'Gradual' : 'Not reported'}\nPop: ${data.symptoms.includes('I heard or felt a pop') ? 'Yes' : 'No'}\nRange of motion: ${data.straighten === 'No' ? 'Limited' : data.straighten === 'Almost' ? 'Reduced' : 'Relatively preserved'}`;

    const copySummary = async () => {
        try {
            await navigator.clipboard.writeText(summaryText);
        } catch {
            // ignore clipboard errors for prototype
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <Header />
            <main className="mx-auto max-w-6xl py-8">
                <ResultCard
                    title={recommendation.level}
                    subtitle={recommendation.urgency}
                    accent={accent}
                    reasons={recommendation.reasons}
                />

                <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">What should I do next?</p>
                    <ol className="mt-4 space-y-3 text-slate-700">
                        {recommendation.nextSteps.map((step, index) => (
                            <li key={step} className="flex gap-3 rounded-2xl bg-slate-50 p-3">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                    {index + 1}
                                </span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Know Before You Go</p>
                    <div className="mt-4 space-y-4 text-sm text-slate-700">
                        <p>
                            <span className="font-semibold text-slate-900">Emergency care:</span> Hospital emergency departments are subject to federal emergency-care requirements. In certain situations, patients have protections related to emergency screening, stabilization, and surprise out-of-network billing.
                        </p>
                        <p>
                            <span className="font-semibold text-slate-900">Coverage and cost:</span> Coverage and cost depend on your insurance plan and situation. CarePath does not guarantee coverage.
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">CarePath helps with navigation, not diagnosis.</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">AI / software can:</p>
                            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                                <li>Organize symptoms</li>
                                <li>Identify care-setting options</li>
                                <li>Explain next steps</li>
                                <li>Summarize the user’s answers</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">Healthcare professionals should:</p>
                            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                                <li>Examine the injury</li>
                                <li>Order imaging</li>
                                <li>Diagnose the condition</li>
                                <li>Decide treatment</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <CareComparison />

                <AssessmentSummary
                    data={{
                        eventType: data.eventType,
                        bodyLocation: data.bodyLocation,
                        pain: data.pain,
                        timeline: data.timeline,
                        weightBearing: data.weightBearing,
                        symptoms: data.symptoms,
                        notes: data.notes,
                    }}
                    onCopy={copySummary}
                />

                <div className="mt-8 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={onRestart}
                        className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                        Start Over
                    </button>
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Print / Save Summary
                    </button>
                    <button
                        type="button"
                        className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Find Care Near Me
                    </button>
                </div>

                <Disclaimer />
            </main>
        </div>
    );
}
