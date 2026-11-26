// app/loading.tsx
export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] grid place-items-center bg-navy">
      <div className="text-center">
        <div className="mb-4 flex justify-center gap-3" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.15}s` }}
              className="animate-bounce-dot h-3 w-3 bg-brand"
            />
          ))}
        </div>
        <p className="eyebrow text-mist">Loading</p>
      </div>
    </main>
  );
}
