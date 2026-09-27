export function Header() {
    return (
        <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-lg font-bold text-teal-700">
                        C
                    </div>
                    <div>
                        <p className="text-xl font-bold text-slate-900">CarePath</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
