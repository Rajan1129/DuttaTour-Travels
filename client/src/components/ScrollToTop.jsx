import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop ensures that navigating to any new page automatically
 * resets the scroll position to the top (0, 0) instead of inheriting
 * the previous page's scroll position.
 * If a hash (#id) is present in the URL, it smoothly scrolls to that element.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return;
      }
    }

    // Default: Reset scroll to the absolute top of the page immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, hash]);

  return null;
}
