import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("lg");

  useEffect(() => {
    const breakpoints = {
      xs: "(max-width: 639px)",
      sm: "(min-width: 640px) and (max-width: 767px)",
      md: "(min-width: 768px) and (max-width: 1023px)",
      lg: "(min-width: 1024px)",
    };

    const updateBreakpoint = () => {
      if (window.matchMedia(breakpoints.xs).matches) {
        setBreakpoint("xs");
      } else if (window.matchMedia(breakpoints.sm).matches) {
        setBreakpoint("sm");
      } else if (window.matchMedia(breakpoints.md).matches) {
        setBreakpoint("md");
      } else {
        setBreakpoint("lg");
      }
    };

    updateBreakpoint();

    window.addEventListener("resize", updateBreakpoint);
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, []);

  // Flags
  const isXs = breakpoint === "xs";
  const isSm = breakpoint === "sm";
  const isMd = breakpoint === "md";
  const isLg = breakpoint === "lg";

  return { breakpoint, isXs, isSm, isMd, isLg };
}
