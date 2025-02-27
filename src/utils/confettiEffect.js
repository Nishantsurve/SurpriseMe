import confetti from "canvas-confetti";

export const triggerConfetti = () => {
  confetti({ particleCount: 150, spread: 90 });
};
