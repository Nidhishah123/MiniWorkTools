import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Timeline Calculator — Estimate project duration with weekends",
  description:
    "Estimate your project's timeline from total hours in seconds. Accounts for weekends and working-day capacity to produce start/end dates, weeks, and delivery dates with buffer and budget calculation.",
  keywords: [
    "project timeline",
    "project duration calculator",
    "estimate project timeline",
    "project timeline estimator",
    "project time calculator",
    "hours to days calculator",
    "working days calculator",
    "project schedule estimator",
    "project deadline calculator",
    "freelance project calculator",
    "how to estimate project timeline",
  ],
  authors: [{ name: "Mini Work Tools" }],
  openGraph: {
    title: "Project Timeline Calculator — Estimate project duration with weekends",
    description:
      "Estimate your project's timeline from total hours in seconds. Accounts for weekends and working-day capacity to produce start/end dates, weeks, and delivery dates with buffer and budget calculation.",
    url: "/estimate-project-timeline",
    siteName: "Mini Work Tools",
    images: [
      {
        url: "/asset/img/estimate-project-timeline.png",
        alt: "Project Timeline Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Timeline Calculator — Estimate project duration with weekends",
    description:
      "Estimate your project's timeline from total hours in seconds. Accounts for weekends and working-day capacity to produce start/end dates, weeks, and delivery dates with buffer and budget calculation.",
    images: ["/asset/img/estimate-project-timeline.png"],
  },
  robots: { index: true, follow: true },
};
