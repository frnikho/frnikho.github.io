import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = "(max-width: 1024px)") {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(breakpoint);

        const handleChange = () => setIsMobile(mediaQuery.matches);
        handleChange(); // init

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [breakpoint]);

    return isMobile;
}