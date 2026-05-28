"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative min-h-full overflow-hidden bg-[#12161A] px-6 py-8 text-[#EAECEF] transition-all duration-300 ease-in-out">
      <Image
        src="/begin.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#12161A]/25 via-transparent to-[#12161A]/75" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[390px] animate-page-fade flex-col justify-end overflow-hidden font-serif">
        <div className="space-y-9 pb-10">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-tight text-[#FFB03A]">
              靈魂百味
            </h1>
            <p className="text-xl font-light tracking-[0.18em] text-[#FFB03A]/90">
              深夜食堂的最後一晚
            </p>
          </div>

          <p className="whitespace-pre-line text-[15px] leading-8 text-[#EAECEF]/90">
            {`深夜 11:45，大雨。
城市已經半睡，你推開巷弄深處那扇亮著昏黃微光的木門。
老闆正擦著玻璃杯，抬頭對你溫和地微笑：
『歡迎，隨便坐吧。今晚……是這間店營業的最後一夜了。』`}
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              className="w-48 rounded-full bg-[#FFB03A] px-8 py-4 text-center font-bold text-[#12161A] shadow-[0_14px_35px_rgba(255,176,58,0.24)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_18px_46px_rgba(255,176,58,0.38)] active:scale-95"
              onClick={() => router.push("/question")}
            >
              推開木門，入座
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
