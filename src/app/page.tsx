import { Metadata } from "next";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"></div>
  );
}

export const metadata: Metadata = {
  title: "Mini Work Tools - Simple utilities for project planning",
  description:
    "Mini Work Tools provides lightweight utilities to help you plan and estimate projects quickly. Includes a Project Timeline Calculator that converts estimated hours into realistic delivery schedules, accounting for weekends and working capacity.",
  keywords: [
    "Mini Work Tools",
    "project timeline",
    "project estimator",
    "timeline calculator",
    "hours to days calculator",
    "working days calculator",
    "project schedule estimator",
  ],
  authors: [{ name: "Mini Work Tools" }],
  openGraph: {
    title: "Mini Work Tools - Small Utility Tools",
    description:
      "Use the Project Timeline Calculator to convert estimated hours into delivery timelines that account for weekends and realistic working capacity.",
    url: "https://mini-work-tools.vercel.app/",
    siteName: "Mini Work Tools",
    images: [
      {
        url: "https://mini-work-tools.vercel.app/asset/img/logo_light.png",
        alt: "Mini Work Tools - Project Timeline Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Work Tools - Project Timeline Calculator",
    description:
      "Estimate project timelines from total hours with the Project Timeline Calculator. Accounts for weekends and working-day capacity.",
    images: ["https://mini-work-tools.vercel.app/asset/img/logo_light.png"],
  },
  robots: { index: true, follow: true },
};
