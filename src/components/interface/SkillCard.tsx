// components/ui/SkillCard.tsx
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  skills: string[];
}

export default function SkillCard({
  icon: Icon,
  title,
  skills,
}: SkillCardProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
      <div className="text-blue-400 mb-3">
        <Icon size={24} />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul className="space-y-1">
        {skills.map((skill, i) => (
          <li key={i} className="text-sm text-gray-400">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
