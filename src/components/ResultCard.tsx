type Props = {
    title: string;
    subtitle: string;
    accent: 'red' | 'orange' | 'yellow' | 'green';
    reasons: string[];
};

const accentClasses = {
    red: 'border-red-200 bg-red-50 text-red-900',
    orange: 'border-orange-200 bg-orange-50 text-orange-900',
    yellow: 'border-amber-200 bg-amber-50 text-amber-900',
    green: 'border-emerald-200 bg-emerald-50 text-emerald-900',
};

export function ResultCard({ title, subtitle, accent, reasons }: Props) {
    return (
        <div className={`rounded-[28px] border p-6 shadow-sm ${accentClasses[accent]}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-current/80">Your Care Recommendation</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{title}</h2>
            <p className="mt-3 text-base font-medium">{subtitle}</p>

            <div className="mt-6 rounded-2xl border border-current/15 bg-white/35 p-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-current/80">Why this recommendation?</p>
                <ul className="space-y-2 text-sm">
                    {reasons.map((reason) => (
                        <li key={reason} className="flex gap-2">
                            <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-current" />
                            <span>{reason}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
