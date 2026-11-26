export default function Footer() {
  return (
    <footer className="border-t border-sky-400/15 bg-[#050505] py-8 text-center">
      <p className="text-sm font-light uppercase tracking-[0.35em] text-slate-300">
        Anderson Macuche
      </p>
      <p className="mt-2 text-xs text-slate-500">
        © {new Date().getFullYear()} · Maputo, Mozambique
      </p>
    </footer>
  );
}
