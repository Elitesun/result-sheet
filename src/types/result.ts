export type Grade = "A" | "B" | "C" | "D" | "E" | "E-" | "F";

export type SubjectId =
  | "mathematics"
  | "english_language"
  | "basic_science"
  | "social_studies"
  | "home_economics"
  | "cultural_creative_art"
  | "agricultural_science"
  | "crk"
  | "reading"
  | "dictation";

export interface SubjectTemplate {
  id: SubjectId;
  name: string;
  maxTest: number;
  maxExam: number;
}

export interface SubjectMark {
  test: number;
  exam: number;
}

export interface StudentInfo {
  name: string;
  term: string;
  sex: string;
  className: string;
  age: string;
  schoolOpen: number;
  present: number;
  absent: number;
  numberInClass: string;
  positionInClass: string;
  nextTermBegins: string;
}

export interface RatingItem {
  id: string;
  label: string;
}

export interface ResultTemplate {
  schoolName: string;
  schoolAddress: string;
  schoolContact: string;
  academicYear: string;
  motto: string;
  subjects: SubjectTemplate[];
  ratingItems: RatingItem[];
}
