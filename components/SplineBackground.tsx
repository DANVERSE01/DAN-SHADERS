import React, { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

// Use the existing Spline scene URL from the project assets
const SCENE_URL = "https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode";

export function SplineBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#02030a]">
      {/* 
        Spline Container: 
        We use pointer-events-auto here implicitly because it's a div.
        The canvas inside Spline needs to capture events.
      */}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="h-8 w-8 rounded-full border-2 border-white/40 border-b-transparent animate-spin" />
          </div>
        }
      >
        <Spline scene={SCENE_URL} className="w-full h-full" />
      </Suspense>

      {/* Cinematic haze: dark, subtle gradients; no interaction */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-40">
        <div className="w-full h-full blur-3xl bg-[radial-gradient(circle_at_15%_10%,rgba(255,120,40,0.35),transparent_55%),radial-gradient(circle_at_80%_75%,rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_10%_90%,rgba(79,70,229,0.4),transparent_60%)]" />
      </div>

      {/* Soft vignette at the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}