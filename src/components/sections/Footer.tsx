import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pb-10 pt-4 text-center">
      <p className="inline-flex items-center gap-2 font-display text-lg font-medium">
        Made with <Heart size={18} className="fill-coral text-coral" /> by
        Anderson Macuche
      </p>
      <p className="mt-1 text-sm font-bold text-ink-soft">
        © {new Date().getFullYear()} · Maputo, Mozambique
      </p>
    </footer>
  );
}
