export default function Footer() {
  return (
    <footer className="bg-navy-deep py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 sm:flex-row sm:px-8 lg:px-14">
        <p className="text-xl font-extrabold tracking-tight">
          ander<span className="text-brand">s</span>on
        </p>
        <p className="eyebrow text-[0.68rem] text-mist">
          © {new Date().getFullYear()} Anderson Macuche · Maputo, Mozambique
        </p>
      </div>
    </footer>
  );
}
