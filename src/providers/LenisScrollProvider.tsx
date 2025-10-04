// src/components/providers/LenisScrollProvider.tsx
"use client";

import React, { useEffect } from "react";
import Lenis, { LenisOptions } from "@studio-freight/lenis";

interface LenisScrollProviderProps {
  children: React.ReactNode;
}

export default function LenisScrollProvider({ children }: LenisScrollProviderProps) {
  useEffect(() => {
    const options: LenisOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    };

    const lenis = new Lenis(options);

    // Loop de animação necessário pro Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
