const valueCards = [
    'Understand urgency',
    'Compare care options',
    'Know what to do next',
];

export function LandingPage({ onStart }: { onStart: () => void }) {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-lg font-bold text-teal-700">
                                C
                            </div>
                            <p className="text-2xl font-bold text-slate-900">CarePath</p>
                        </div>
                    </div>

                    <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Acute care navigation</p>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Not sure where to go for care?
                            </h1>
                            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                                Answer a few questions about what happened. CarePath helps you understand whether emergency care, urgent care, or specialist follow-up may be appropriate.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <button
                                    type="button"
                                    onClick={onStart}
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-700"
                                >
                                    Start Assessment
                                </button>
                            </div>

                            <p className="mt-4 text-sm text-slate-500">
                                Not a diagnosis. If you believe you are experiencing a life-threatening emergency, call 911.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {valueCards.map((card) => (
                                <div key={card} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                                        ✓
                                    </div>
                                    <p className="text-lg font-semibold text-slate-900">{card}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
