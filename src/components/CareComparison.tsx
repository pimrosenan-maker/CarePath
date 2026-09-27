const cards = [
    {
        title: 'Emergency Department',
        bullets: [
            'Open 24/7',
            'Hospital-level care',
            'Imaging available',
            'Best for serious or potentially dangerous conditions',
            'Typically highest cost',
        ],
    },
    {
        title: 'Urgent Care',
        bullets: [
            'Often same-day',
            'May have X-ray',
            'Appropriate for many non-life-threatening injuries',
            'Lower cost than ER in many cases',
        ],
    },
    {
        title: 'Orthopedic Specialist',
        bullets: [
            'Musculoskeletal expertise',
            'Often requires appointment',
            'Useful for follow-up, advanced imaging, treatment planning',
            'Not always available nights or weekends',
        ],
    },
];

export function CareComparison() {
    return (
        <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Care options</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">Compare care settings</h3>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {cards.map((card) => (
                    <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <h4 className="text-lg font-bold text-slate-900">{card.title}</h4>
                        <ul className="mt-4 space-y-2 text-sm text-slate-700">
                            {card.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-2">
                                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-500" />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
