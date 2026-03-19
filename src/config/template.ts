import type {
  Grade,
  ResultTemplate,
  SubjectId,
  SubjectMark,
} from "../types/result";

export const RESULT_TEMPLATE: ResultTemplate = {
  schoolName: "GOD IS ALIVE ACADEMY",
  schoolAddress: "04 BP 334 Lome 04 - Togo",
  schoolContact: "Cel: + 96 97 93 57 | Email: godisaliveacademyegaa@gmail.com",
  academicYear: "2024 - 2025",
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
    { id: "social_studies", name: "Social Studies", maxTest: 30, maxExam: 70 },
    { id: "home_economics", name: "Home Economics", maxTest: 30, maxExam: 70 },
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
    { id: "dictation", name: "Dictation", maxTest: 30, maxExam: 70 },
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
};

export const gradeLabelMap: Record<Grade, string> = {
  A: "Outstanding",
  B: "Excellent",
  C: "Very Good",
  D: "Good",
  E: "Average",
  "E-": "Pass",
  F: "Fail",
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

export function createEmptyMarks(): Record<SubjectId, SubjectMark> {
  return RESULT_TEMPLATE.subjects.reduce(
    (acc, subject) => {
      acc[subject.id] = { test: 0, exam: 0 };
      return acc;
    },
    {} as Record<SubjectId, SubjectMark>,
  );
}

export function createDefaultRatings(): Record<string, number> {
  return RESULT_TEMPLATE.ratingItems.reduce(
    (acc, item) => {
      acc[item.id] = 3;
      return acc;
    },
    {} as Record<string, number>,
  );
}
