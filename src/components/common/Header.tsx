"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { theme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const logoSrc = isDark ? "/asset/img/logo_dark.png" : "/asset/img/logo_light.png";

  return (
    <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Image
          src={logoSrc}
          alt="Mini Work Tools"
          width={160}
          height={48}
          className="h-10 sm:h-12 w-auto"
          priority={false}
        />

        <ThemeToggle />
      </div>
    </header>
  );
}
