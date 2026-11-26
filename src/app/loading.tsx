// app/loading.tsx
export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] grid place-items-center bg-cream">
      <div className="text-center">
        <div className="mb-4 flex justify-center gap-3" aria-hidden>
          {["bg-coral", "bg-sun", "bg-mint"].map((c, i) => (
            <span
              key={c}
              style={{ animationDelay: `${i * 0.15}s` }}
              className={`animate-bounce-dot h-5 w-5 rounded-full border-[2.5px] border-ink ${c}`}
            />
          ))}
        </div>
        <p className="font-display text-xl font-medium text-ink">
          Warming things up…
        </p>
      </div>
    </main>
  );
}
