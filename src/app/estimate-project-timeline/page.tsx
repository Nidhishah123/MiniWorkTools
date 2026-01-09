import { Metadata } from "next";

import TimelineCalculatorContent from "./components/TimelineCalculatorContent";

const EstimateProjectTimelinePage = () => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Project Timeline Calculator",
    url: "/estimate-project-timeline",
    description:
      "Estimate your project's timeline from total hours in seconds. Accounts for weekends and working-day capacity to produce start/end dates, weeks, and delivery dates with buffer and budget calculation.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "/estimate-project-timeline",
    },
  };

  return (
    <div className="bg-background py-8 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
            Project Timeline Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Convert your estimated hours into a realistic delivery timeline
          </p>
        </header>

        {/* Main Content */}
        <TimelineCalculatorContent />

        {/* Usage / How it works */}
        <div className="prose mx-auto mt-8 max-w-6xl text-muted-foreground text-center">
          <h2 className="sr-only">How to use</h2>
          <p>
            This <b>Project Timeline Calculator</b> helps you quickly turn effort into a realistic
            delivery plan. Just enter your total estimated hours, how many hours you work per day,
            working days per week, and a start date. Add a buffer to account for meetings or delays,
            and optionally turn on <b>budget calculation</b> by entering your hourly rate.
          </p>
          <br />
          <p>
            For example, if a project needs <b>120 hours</b>, you work <b>8 hours/day</b>,{" "}
            <b>5 days/week</b>, start on
            <b> Feb 1 2026</b>, and add a <b>15% buffer</b>, the tool shows it will take about{" "}
            <b>3 weeks 3 days</b>, finishing around <b>Feb 25 2026</b>, with a safe project cost of
            <b> $3,450</b> at <b>$25/hour</b>. It’s a fast, no-guesswork way to plan timelines and
            budgets with confidence.
          </p>
        </div>
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Project Timeline Calculator - Estimate project duration with weekends",
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
    title: "Project Timeline Calculator - Estimate project duration with weekends",
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
    title: "Project Timeline Calculator - Estimate project duration with weekends",
    description:
      "Estimate your project's timeline from total hours in seconds. Accounts for weekends and working-day capacity to produce start/end dates, weeks, and delivery dates with buffer and budget calculation.",
    images: ["/asset/img/estimate-project-timeline.png"],
  },
  robots: { index: true, follow: true },
};

export default EstimateProjectTimelinePage;
