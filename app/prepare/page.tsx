"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const cookingLines = [
  "老闆轉身走向廚房，點燃了爐火...",
  "鍋氣翻炒著你的潛意識...",
  "細火慢熬的靈魂百味，即將出鍋。",
];

export default function Prepare() {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const lineTimers = cookingLines.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 1);
      }, (index + 1) * 800)
    );

    const routeTimer = window.setTimeout(() => {
      router.push("/result");
    }, 3200);

    return () => {
      lineTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(routeTimer);
    };
  }, [router]);

  return (
    <main className="min-h-full bg-[#12161A] px-6 py-8 text-[#EAECEF] transition-all duration-300 ease-in-out">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[390px] animate-page-fade flex-col items-center justify-center font-serif">
        <div className="w-full space-y-10">
          <div className="mx-auto h-[3px] w-56 overflow-hidden rounded-full bg-[#1C232A]">
            <div className="h-full origin-left animate-slow-cook rounded-full bg-[#FFB03A] shadow-[0_0_24px_rgba(255,176,58,0.65)]" />
          </div>

          <div className="min-h-36 space-y-5 text-center">
            {cookingLines.map((line, index) => (
              <p
                key={line}
                className={`text-[15px] leading-7 text-[#EAECEF]/90 transition-all duration-700 ease-in-out ${
                  visibleCount > index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
