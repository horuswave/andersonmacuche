"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail, LucideIcon } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export default function SocialIcons() {
  const socialLinks: SocialLink[] = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/anderson-macuche/",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/horuswave",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:andersonmacuche@gmail.com",
      label: "Email",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className={`flex items-center gap-4 ${mono.variable}`}
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;

        return (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center justify-center border border-emerald-400/10 bg-emerald-500/[0.03] p-3 text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30 hover:bg-emerald-500/[0.06] hover:text-emerald-300"
          >
            <Icon
              size={18}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
