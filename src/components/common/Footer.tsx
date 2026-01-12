"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-background to-muted/30 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* CTA Section */}
        <div className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border border-primary/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-lg font-semibold text-foreground mb-2 relative">
            Have a brilliant idea?
          </h3>
          <p className="text-muted-foreground text-sm relative">
            Whether it&apos;s a suggestion to improve this tool or an exciting new product concept,
            we&apos;d love to collaborate and bring your vision to life.
          </p>
          <a
            href="https://technurture.in/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
                try {
                  (window as any).gtag("event", "get_in_touch_click", {
                    event_category: "engagement",
                    event_label: "Footer Get in touch",
                  });
                } catch (e) {
                  // ignore analytics errors
                }
              }
            }}
            aria-label="Get in touch — opens in new tab"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors relative"
          >
            Get in touch →
          </a>

          <p className="text-xs text-muted-foreground/80 mt-6">
            Developed by{" "}
            <a
              href="https://technurture.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              onClick={() => {
                if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
                  try {
                    (window as any).gtag("event", "developed_by_tech_nurture_click", {
                      event_category: "engagement",
                      event_label: "Footer Tech Nurture Link",
                    });
                  } catch (e) {
                    // ignore analytics errors
                  }
                }
              }}
            >
              Tech Nurture IT Solutions
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/50">
            Designed for freelancers, agencies & planners
          </p>
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Tech Nurture IT Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
