"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Self-hosted Matomo. Non-secret, so these are public env vars with the
// production instance as the default — meaning it works on prod with zero
// config, while a preview/staging deploy can point NEXT_PUBLIC_MATOMO_SITE_ID
// at a different site to avoid polluting production data.
const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL ?? "//matomo.akieni.tech/";
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID ?? "2";

declare global {
  interface Window {
    // Matomo's command queue: an array of [method, ...args] tuples that the
    // matomo.js library drains once it finishes loading.
    _paq?: unknown[][];
  }
}

/**
 * Site-wide Matomo analytics.
 *
 * The inline loader tracks the *initial* page view and boots the tracker, with
 * cookies disabled so the site stays within its "strictly necessary cookies,
 * no consent required" policy (self-hosted Matomo is first-party).
 *
 * Because the App Router navigates client-side (no full reload), we also
 * re-fire `trackPageView` on every route change — otherwise only the first page
 * a visitor lands on would be recorded.
 */
export function Matomo() {
  const pathname = usePathname();
  // The loader script already counts the first view; skip the mount effect so
  // the landing page isn't double-counted.
  const isFirstRender = useRef(true);
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousUrl.current = window.location.href;
      return;
    }

    const fromUrl = previousUrl.current;
    const toUrl = window.location.href;
    previousUrl.current = toUrl;

    let tracked = false;
    const track = () => {
      if (tracked) return;
      tracked = true;
      // Safe even before matomo.js loads: it drains this queue on init.
      const paq = (window._paq = window._paq || []);
      if (fromUrl) paq.push(["setReferrerUrl", fromUrl]);
      paq.push(["setCustomUrl", toUrl]);
      paq.push(["setDocumentTitle", document.title]);
      // Re-scan the freshly rendered DOM for outbound links before tracking.
      paq.push(["enableLinkTracking"]);
      paq.push(["trackPageView"]);
    };

    // PageTransition (AnimatePresence mode="wait", 0.35s) mounts the new route —
    // and so Next's <title> swap — only after the exit animation. Track once the
    // title actually updates so the new URL pairs with the new title; fall back
    // on a timer in case two routes happen to share a title.
    const titleEl = document.querySelector("title");
    const observer = titleEl ? new MutationObserver(() => track()) : null;
    observer?.observe(titleEl!, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    const fallback = window.setTimeout(track, 1000);

    return () => {
      observer?.disconnect();
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  // Skip on Vercel preview deployments so branch previews don't pollute prod.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") return null;

  return (
    <Script id="matomo" strategy="afterInteractive">
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push(['disableCookies']);
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="${MATOMO_URL}";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `}
    </Script>
  );
}
