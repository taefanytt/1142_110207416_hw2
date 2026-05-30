"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import quizData from "@/data/quizData.json";
import { usePsyStore } from "@/store/store";

type ScoreKey = "A" | "B" | "C" | "D";

const resultOrder: ScoreKey[] = ["A", "B", "C", "D"];
const resultImages: Record<ScoreKey, string> = {
  A: "/A.png",
  B: "/B.png",
  C: "/C.png",
  D: "/D.png",
};

export default function Result() {
  const router = useRouter();
  const [shareText, setShareText] = useState("分享結果");
  const scoreBoard = usePsyStore((state) => state.scoreBoard);
  const resetScore = usePsyStore((state) => state.resetScore);

  const resultKey = resultOrder.reduce((winner, key) => {
    return scoreBoard[key] > scoreBoard[winner] ? key : winner;
  }, "A");

  const result = quizData.results[resultKey];
  const resultImage = resultImages[resultKey];

  // 恢復原版文字分享與剪貼簿複製功能
  async function shareResult() {
    const text = `我的深夜食堂靈魂料理是「${result.name}」：${result.description}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: quizData.quizTitle,
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        setShareText("已複製到剪貼簿");
        window.setTimeout(() => setShareText("分享結果"), 1600);
      }
    } catch {
      setShareText("稍後再試");
      window.setTimeout(() => setShareText("分享結果"), 1600);
    }
  }

  function playAgain() {
    resetScore();
    router.push("/");
  }

  return (
    <main className="relative min-h-full overflow-hidden bg-[#12161A] px-6 py-8 text-[#EAECEF] transition-all duration-300 ease-in-out">
      {/* 滿版食堂雨景背景圖 */}
      <Image
        src="/end.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#12161A]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[390px] animate-page-fade flex-col justify-center gap-8 font-serif">
        <div className="space-y-7 text-center">
          <div className="space-y-2">
            <h2 className="text-lg font-normal leading-8 text-[#EAECEF]">
              『今晚，專屬於你的靈魂料理是——』
            </h2>
          </div>

          {/* 食物圖片與浮動起動畫 */}
          <div className="mx-auto flex w-full items-center justify-center rounded-[32px] bg-[#EAECEF]/90 p-3 shadow-[inset_0_0_42px_rgba(18,22,26,0.22),0_26px_70px_rgba(0,0,0,0.42)]">
            <Image
              src={resultImage}
              alt={result.name}
              width={360}
              height={360}
              priority
              className="h-auto w-full max-w-[350px] animate-soft-float rounded-[26px] object-contain mix-blend-multiply drop-shadow-[0_22px_36px_rgba(0,0,0,0.26)] transition-all duration-300 ease-in-out"
            />
          </div>

          {/* 料理名稱與描述 */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-[#FFB03A]">
              {result.name}
            </h1>

            <p className="mx-auto max-w-sm text-left text-[15px] leading-8 text-[#EAECEF]/90">
              {result.description}
            </p>
          </div>
        </div>

        {/* 簡化後的單行按鈕區 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-full bg-[#FFB03A] px-2 py-4 text-sm font-bold text-[#12161A] shadow-[0_12px_30px_rgba(255,176,58,0.22)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_16px_40px_rgba(255,176,58,0.36)] active:scale-95"
            onClick={shareResult}
          >
            {shareText}
          </button>
          <button
            type="button"
            className="rounded-full border border-[#FFB03A] bg-transparent px-2 py-4 text-sm font-bold text-[#FFB03A] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFB03A]/10 active:scale-95"
            onClick={playAgain}
          >
            重新測驗
          </button>
        </div>
      </section>
    </main>
  );
}