import { create } from "zustand";

const initialScoreBoard = { A: 0, B: 0, C: 0, D: 0 };

const usePsyStore = create((set) => ({
  scoreBoard: initialScoreBoard,
  updateScore: (weights) =>
    set((state) => ({
      scoreBoard: {
        A: state.scoreBoard.A + (weights.A || 0),
        B: state.scoreBoard.B + (weights.B || 0),
        C: state.scoreBoard.C + (weights.C || 0),
        D: state.scoreBoard.D + (weights.D || 0),
      },
    })),
  resetScore: () => set({ scoreBoard: { ...initialScoreBoard } }),
}));

export { usePsyStore };
