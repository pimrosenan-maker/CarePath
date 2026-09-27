type Props = {
    label: string;
    selected?: boolean;
    onClick: () => void;
    description?: string;
    ariaLabel?: string;
};

export function OptionButton({ label, selected = false, onClick, description, ariaLabel }: Props) {
    return (
        <button
            type="button"
            aria-label={ariaLabel ?? label}
            onClick={onClick}
            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${selected
                    ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-sm ring-2 ring-teal-200'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                }`}
        >
            <span className="text-base font-medium">{label}</span>
            {description && <span className="text-xs text-slate-500">{description}</span>}
        </button>
    );
}
