import type { Grade } from "../types/result";

export function getGrade(score: number): Grade {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  if (score >= 50) return "E";
  if (score >= 40) return "E-";
  return "F";
}

export function clampScore(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return 0;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
