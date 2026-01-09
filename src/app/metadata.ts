import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Work Tools — Simple utilities for project planning",
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
    title: "Mini Work Tools — Project Timeline Calculator & Small Utilities",
    description:
      "Use the Project Timeline Calculator to convert estimated hours into delivery timelines that account for weekends and realistic working capacity.",
    url: "https://your-domain.com",
    siteName: "Mini Work Tools",
    // images: [
    //   {
    //     url: "/og/home.png",
    //     alt: "Mini Work Tools — Project Timeline Calculator",
    //   },
    // ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Work Tools — Project Timeline Calculator",
    description:
      "Estimate project timelines from total hours with the Project Timeline Calculator. Accounts for weekends and working-day capacity.",
    // images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
};
