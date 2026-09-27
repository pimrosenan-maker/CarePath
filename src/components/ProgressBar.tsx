type Props = {
    current: number;
    total: number;
};

export function ProgressBar({ current, total }: Props) {
    const progress = (current / total) * 100;

    return (
        <div className="w-full">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span>Step {current} of {total}</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
