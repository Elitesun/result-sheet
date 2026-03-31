import type { Grade, ResultTemplate, SubjectMark } from "../types/result";

export interface GradeRemarks {
  overall: string;
  teacher: string;
  principal: string;
}

export const RESULT_TEMPLATES = {
  primary: {
    schoolName: "GOD IS ALIVE ACADEMY",
    schoolAddress: "04 BP 334 Lome 04 - Togo",
    schoolContact:
      "Cel: + 96 97 93 57 | Email: godisaliveacademyegaa@gmail.com",
    academicYear: "2025 - 2026",
    motto: "HUMILITY - WISDOM - SUCCESS",
    subjects: [
      { id: "mathematics", name: "Mathematics", maxTest: 30, maxExam: 70 },
      {
        id: "english_language",
        name: "English Language",
        maxTest: 30,
        maxExam: 70,
      },
      { id: "basic_science", name: "Basic Science", maxTest: 30, maxExam: 70 },
      {
        id: "social_studies",
        name: "Social Studies",
        maxTest: 30,
        maxExam: 70,
      },
      {
        id: "home_economics",
        name: "Home Economics",
        maxTest: 30,
        maxExam: 70,
      },
      {
        id: "cultural_creative_art",
        name: "Cultural & Creative Art",
        maxTest: 30,
        maxExam: 70,
      },
      {
        id: "agricultural_science",
        name: "Agricultural Science",
        maxTest: 30,
        maxExam: 70,
      },
      { id: "crk", name: "C.R.K", maxTest: 30, maxExam: 70 },
      { id: "reading", name: "Reading", maxTest: 30, maxExam: 70 },
      { id: "dictation", name: "Writing/Dictation", maxTest: 30, maxExam: 70 },
    ],
    ratingItems: [
      { id: "hand_writing", label: "Hand Writing" },
      { id: "verbal_fluency", label: "Verbal Fluency" },
      { id: "games", label: "Games" },
      { id: "sports", label: "Sports" },
      { id: "handling_tools", label: "Handling Tools" },
      { id: "drawing_and_painting", label: "Drawing and Painting" },
      { id: "musical_skills", label: "Musical Skills" },
      { id: "punctuality", label: "Punctuality" },
      { id: "neatness", label: "Neatness" },
      { id: "politeness", label: "Politeness" },
      { id: "honesty", label: "Honesty" },
      { id: "cooperation_with_others", label: "Co-operation With Others" },
      { id: "leadership", label: "Leadership" },
      { id: "helping_others", label: "Helping Others" },
      { id: "emotional_stability", label: "Emotional Stability" },
      { id: "attitude_to_school_work", label: "Attitude to School Work" },
      { id: "perseverance", label: "Perseverance" },
      { id: "attentiveness", label: "Attentiveness" },
    ],
  },
  secondary: {
    schoolName: "GOD IS ALIVE ACADEMY",
    schoolAddress: "04 BP 334 Lome 04 - Togo",
    schoolContact:
      "Cel: + 96 97 93 57 | Email: godisaliveacademyegaa@gmail.com",
    academicYear: "2025 - 2026",
    motto: "HUMILITY - WISDOM - SUCCESS",
    subjects: [
      { id: "mathematics", name: "Mathematics", maxTest: 40, maxExam: 60 },
      {
        id: "english_lang",
        name: "English Lang",
        maxTest: 40,
        maxExam: 60,
      },
      { id: "literature", name: "Literature", maxTest: 40, maxExam: 60 },
      { id: "science", name: "Science", maxTest: 40, maxExam: 60 },
      { id: "civic_edu", name: "Civic Edu.", maxTest: 40, maxExam: 60 },
      { id: "history", name: "History", maxTest: 40, maxExam: 60 },
      { id: "social_std", name: "Social Std.", maxTest: 40, maxExam: 60 },
      { id: "crk", name: "C.R.K", maxTest: 40, maxExam: 60 },
      {
        id: "creative_art_drw",
        name: "Creative Art/Drw",
        maxTest: 40,
        maxExam: 60,
      },
      { id: "dictation", name: "Dictation", maxTest: 40, maxExam: 60 },
    ],
    ratingItems: [
      { id: "hand_writing", label: "Hand Writing" },
      { id: "verbal_fluency", label: "Verbal Fluency" },
      { id: "games", label: "Games" },
      { id: "sports", label: "Sports" },
      { id: "handling_tools", label: "Handling Tools" },
      { id: "drawing_and_painting", label: "Drawing and Painting" },
      { id: "musical_skills", label: "Musical Skills" },
      { id: "punctuality", label: "Punctuality" },
      { id: "neatness", label: "Neatness" },
      { id: "politeness", label: "Politeness" },
      { id: "honesty", label: "Honesty" },
      { id: "cooperation_with_others", label: "Co-operation With Others" },
      { id: "leadership", label: "Leadership" },
      { id: "helping_others", label: "Helping Others" },
      { id: "emotional_stability", label: "Emotional Stability" },
      { id: "attitude_to_school_work", label: "Attitude to School Work" },
      { id: "perseverance", label: "Perseverance" },
      { id: "attentiveness", label: "Attentiveness" },
    ],
  },
} as const satisfies Record<string, ResultTemplate>;

export type ResultTemplateKey = keyof typeof RESULT_TEMPLATES;

export const RESULT_TEMPLATE: ResultTemplate = RESULT_TEMPLATES.primary;

export const gradeLabelMap: Record<Grade, string> = {
  A: "Outstanding",
  B: "Excellent",
  C: "Very Good",
  D: "Good",
  E: "Average",
  "E-": "Pass",
  F: "Fail",
};

export const gradeRemarksMap: Record<Grade, GradeRemarks> = {
  A: {
    overall: "Outstanding",
    teacher: "Excellent performance. Keep it up.",
    principal: "Outstanding result. Maintain this standard.",
  },
  B: {
    overall: "Excellent",
    teacher: "Very good performance. Keep improving.",
    principal: "Excellent result. Aim higher.",
  },
  C: {
    overall: "Very Good",
    teacher: "Good performance. More effort needed.",
    principal: "Very good result. Can do better.",
  },
  D: {
    overall: "Good",
    teacher: "Fair performance. Needs more effort.",
    principal: "Good result. Strive to improve.",
  },
  E: {
    overall: "Average",
    teacher: "Average performance. Work harder.",
    principal: "Fair result. Improvement needed.",
  },
  "E-": {
    overall: "Pass",
    teacher: "Weak performance. Must improve.",
    principal: "Below expectation. Work harder.",
  },
  F: {
    overall: "Fail",
    teacher: "Poor performance. Serious effort needed.",
    principal: "Unsatisfactory result. Improve urgently.",
  },
};

export const gradeScaleRows = [
  { grade: "5", label: "Excellence" },
  { grade: "4", label: "Very Good" },
  { grade: "3", label: "Good" },
  { grade: "2", label: "Fair" },
  { grade: "1", label: "Poor" },
] as const;

export const gradeSummaryRows = [
  { remark: "Outstanding", grade: "A", range: "90-100" },
  { remark: "Excellent", grade: "B", range: "80-89" },
  { remark: "Very Good", grade: "C", range: "70-79" },
  { remark: "Good", grade: "D", range: "60-69" },
  { remark: "Average", grade: "E", range: "50-59" },
  { remark: "Pass", grade: "E-", range: "40-49" },
  { remark: "Fail", grade: "F", range: "Below 40" },
] as const;

export function createEmptyMarks(
  template: ResultTemplate = RESULT_TEMPLATE,
): Record<string, SubjectMark> {
  return template.subjects.reduce(
    (acc, subject) => {
      acc[subject.id] = { test: null, exam: null };
      return acc;
    },
    {} as Record<string, SubjectMark>,
  );
}

export function createDefaultRatings(
  template: ResultTemplate = RESULT_TEMPLATE,
): Record<string, number> {
  return template.ratingItems.reduce(
    (acc, item) => {
      acc[item.id] = 3;
      return acc;
    },
    {} as Record<string, number>,
  );
}
