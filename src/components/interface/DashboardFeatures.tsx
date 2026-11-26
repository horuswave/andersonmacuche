"use client";

import {
  BarChart3,
  Users,
  TrendingUp,
  Bell,
  Shield,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

const featureIcons = {
  analytics: BarChart3,
  users: Users,
  trends: TrendingUp,
  notifications: Bell,
  security: Shield,
  export: Download,
};

interface DashboardFeaturesProps {
  features: string[];
}

export default function DashboardFeatures({
  features,
}: DashboardFeaturesProps) {
  const getIcon = (feature: string) => {
    const normalized = feature.toLowerCase();

    if (normalized.includes("analytics")) return "analytics";
    if (normalized.includes("user") || normalized.includes("customer"))
      return "users";
    if (normalized.includes("trend") || normalized.includes("forecast"))
      return "trends";
    if (normalized.includes("notif") || normalized.includes("alert"))
      return "notifications";
    if (normalized.includes("access") || normalized.includes("security"))
      return "security";
    if (normalized.includes("export") || normalized.includes("report"))
      return "export";

    return "analytics";
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-300">
          Dashboard Features
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/15 to-transparent" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {features.map((feature, index) => {
          const Icon =
            featureIcons[getIcon(feature) as keyof typeof featureIcons];

          return (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
              className="group border border-emerald-400/8 bg-black/10 p-4 transition duration-300 hover:border-emerald-400/18 hover:bg-emerald-500/[0.03]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-emerald-400/12 bg-emerald-500/[0.04] text-emerald-300 transition duration-300 group-hover:border-emerald-400/20 group-hover:bg-emerald-500/[0.08]">
                  <Icon size={15} />
                </div>

                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                    module_{String(index + 1).padStart(2, "0")}
                  </div>

                  <p className="mt-1 font-mono text-[12px] leading-6 text-zinc-300 md:text-[13px]">
                    {feature}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
