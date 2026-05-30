"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import quizData from "@/data/quizData.json";
import { usePsyStore } from "@/store/store";
import html2canvas from "html2canvas";

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
  
  // 綁定截圖區域的Ref
  const snapshotRef = useRef<HTMLDivElement>(null);

  const resultKey = resultOrder.reduce((winner, key) => {
    return scoreBoard[key] > scoreBoard[winner] ? key : winner;
  }, "A");

  const result = quizData.results[resultKey];
  const resultImage = resultImages[resultKey];

  // 截圖下載功能
  async function downloadResultImage() {
    if (!snapshotRef.current) return;
    
    setShareText("生成卡片中...");

    try {
      // 執行畫布渲染，scale: 2 確保圖片清晰不模糊
      const canvas = await html2canvas(snapshotRef.current, {
        useCORS: true, 
        backgroundColor: null,
        scale: 2, 
      });

      // 轉換為圖片基地網址並下載
      const imageUri = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `深夜食堂-${result.name}.png`;
      link.href = imageUri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setShareText("已儲存圖片！");
      window.setTimeout(() => setShareText("分享結果"), 2000);
    } catch (error) {
      console.error("Screenshot failed:", error);
      setShareText("儲存失敗");
      window.setTimeout(() => setShareText("分享結果"), 2000);
    }
  }

  function playAgain() {
    resetScore();
    router.push("/");
  }

  return (
    <main className="relative min-h-full overflow-hidden bg-[#12161A] px-6 py-8 text-[#EAECEF] transition-all duration-300 ease-in-out">
      {/* 滿版背景圖 */}
      <Image
        src="/result_bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#12161A]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/45" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[390px] animate-page-fade flex-col justify-center gap-8 font-serif">
        
        {/* 截圖包覆區域：按鈕排除在外 */}
        <div ref={snapshotRef} className="p-4 rounded-3xl space-y-7 text-center">
          <div className="space-y-2">
            <h2 className="text-lg font-normal leading-8 text-[#EAECEF] drop-shadow-md">
              『今晚，專屬於你的靈魂料理是——』
            </h2>
          </div>

          {/* 食物圖片容器 */}
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
            <h1 className="text-4xl font-bold leading-tight text-[#FFB03A] drop-shadow">
              {result.name}
            </h1>
            <p className="mx-auto max-w-sm text-left text-[15px] leading-8 text-[#EAECEF]/90 drop-shadow-sm">
              {result.description}
            </p>
          </div>
        </div>

        {/* 單行按鈕操作區 */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-full bg-[#FFB03A] px-2 py-4 text-sm font-bold text-[#12161A] shadow-[0_12px_30px_rgba(255,176,58,0.22)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_16px_40px_rgba(255,176,58,0.36)] active:scale-95"
            onClick={downloadResultImage}
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