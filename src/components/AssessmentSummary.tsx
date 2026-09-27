type Props = {
    data: {
        eventType: string;
        bodyLocation: string;
        pain: number;
        timeline: string;
        weightBearing: string;
        symptoms: string[];
        notes: string;
    };
    onCopy: () => void;
};

export function AssessmentSummary({ data, onCopy }: Props) {
    return (
        <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Assessment summary</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">Your Assessment Summary</h3>
                </div>
                <button
                    type="button"
                    onClick={onCopy}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                    Copy Summary
                </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Injury</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{data.bodyLocation || 'Not selected'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cause</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{data.eventType || 'Not selected'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Occurred</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{data.timeline || 'Not selected'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Pain</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{data.pain}/10</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Weight bearing</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{data.weightBearing || 'Not selected'}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Symptoms</p>
                    <p className="mt-2 text-base font-semibold text-slate-900">{data.symptoms.length ? data.symptoms.join(', ') : 'Not selected'}</p>
                </div>
            </div>

            {data.notes && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Additional details</p>
                    <p className="mt-2">{data.notes}</p>
                </div>
            )}
        </section>
    );
}
