// app/loading.tsx
export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] grid place-items-center bg-[#050505]">
      <div className="text-center">
        <div className="mb-4 flex justify-center gap-3" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.15}s` }}
              className="animate-bounce-dot h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
            />
          ))}
        </div>
        <p className="text-sm tracking-[0.3em] text-slate-400">LOADING</p>
      </div>
    </main>
  );
}
