"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import quizData from "@/data/quizData.json";
import { usePsyStore } from "@/store/store";

type ScoreKey = "A" | "B" | "C" | "D";
type Weights = Partial<Record<ScoreKey, number>>;

const questionOverlayClasses = [
  "bg-[#12161A]/85",
  "bg-[#141B22]/85",
  "bg-[#1A1816]/85",
  "bg-[#131920]/85",
  "bg-[#1E1A15]/85",
  "bg-[#11161B]/85",
];

const optionBgClasses = [
  "bg-[#1C232A]/75",
  "bg-[#21272E]/75",
  "bg-[#25252A]/75",
  "bg-[#1B1E22]/75",
];

export default function Question() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const updateScore = usePsyStore((state) => state.updateScore);

  const questions = quizData.questions;
  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;
  const overlayClass =
    questionOverlayClasses[questionIndex] || questionOverlayClasses[0];

  function nextQuestion(weights: Weights) {
    if (isChanging) return;

    updateScore(weights);
    setIsChanging(true);

    window.setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setIsChanging(false);
      } else {
        router.push("/prepare");
      }
    }, 260);
  }

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
      <div
        className={`absolute inset-0 transition-colors duration-700 ease-in-out ${overlayClass}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,176,58,0.18),transparent_34%),linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.38))]" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[390px] animate-page-fade flex-col font-serif">
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between text-xs text-[#EAECEF]/50">
            <span>第 {questionIndex + 1} 道料理</span>
            <span>
              {questionIndex + 1}/{questions.length}
            </span>
          </div>
          <div className="h-[2px] overflow-hidden rounded-full bg-[#1C232A]">
            <div
              className="h-full bg-[#FFB03A] transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          className={`flex flex-1 flex-col justify-center transition-all duration-300 ease-in-out ${
            isChanging ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="mb-8 py-4 transition-all duration-300 ease-in-out">
            <p className="mb-4 text-xs font-bold tracking-wider text-[#FFB03A]">
              QUESTION {currentQuestion.id}
            </p>
            <h1 className="font-serif text-[18px] font-semibold leading-relaxed text-[#EAECEF]">
              {currentQuestion.text}
            </h1>
          </div>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.letter}
                type="button"
                disabled={isChanging}
                className={`group flex w-full items-start rounded-xl border border-white/5 px-5 py-4 text-left text-[#EAECEF] shadow-[0_10px_26px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-[#FFB03A]/60 hover:bg-[#FFB03A]/15 hover:shadow-lg active:scale-[0.98] disabled:cursor-default disabled:opacity-70 ${optionBgClasses[index]}`}
                onClick={() => nextQuestion(option.weights)}
              >
                <span className="mr-3 block w-6 shrink-0 text-center text-sm font-bold leading-7 text-[#FFB03A] transition-all duration-300 ease-in-out">
                  {option.letter}
                </span>
                <span className="block flex-1 text-[15px] leading-7 transition-all duration-300 ease-in-out">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
