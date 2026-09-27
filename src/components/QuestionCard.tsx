import type { ReactNode } from 'react';

type Props = {
    title: string;
    subtitle?: string;
    children: ReactNode;
    action?: ReactNode;
};

export function QuestionCard({ title, subtitle, children, action }: Props) {
    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Question</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
                    {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
                </div>
            </div>

            <div>{children}</div>

            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
