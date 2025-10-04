// src/components/providers/LenisScrollProvider.tsx
"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import type { LenisOptions } from "@studio-freight/lenis";

interface LenisScrollProviderProps {
  children: React.ReactNode;
}

export default function LenisScrollProvider({ children }: LenisScrollProviderProps) {
  useEffect(() => {
    const options: LenisOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // REMOVIDO: orientation: "vertical", (Não faz parte de LenisOptions)
      gestureOrientation: "vertical", // MANTIDO: 'gestureOrientation' é uma opção válida para o Lenis
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    };

    const lenis = new Lenis(options);

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