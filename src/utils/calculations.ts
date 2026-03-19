import { gradeLabelMap, RESULT_TEMPLATE } from "../config/template";
import type { Grade, SubjectId, SubjectMark } from "../types/result";
import { getGrade } from "./grading";

export interface SubjectComputed {
  id: SubjectId;
  name: string;
  maxTest: number;
  maxExam: number;
  test: number;
  exam: number;
  total: number;
  grade: Grade;
  remark: string;
}

export interface ResultComputed {
  subjects: SubjectComputed[];
  testObtained: number;
  examObtained: number;
  totalObtained: number;
  testObtainable: number;
  examObtainable: number;
  totalObtainable: number;
  percentage: number;
  overallGrade: Grade;
  overallRemark: string;
}

export function computeResults(
  marks: Record<SubjectId, SubjectMark>,
): ResultComputed {
  const subjects = RESULT_TEMPLATE.subjects.map((subject) => {
    const test = marks[subject.id]?.test ?? 0;
    const exam = marks[subject.id]?.exam ?? 0;
    const total = test + exam;
    const grade = getGrade(total);

    return {
      id: subject.id,
      name: subject.name,
      maxTest: subject.maxTest,
      maxExam: subject.maxExam,
      test,
      exam,
      total,
      grade,
      remark: gradeLabelMap[grade],
    };
  });

  const testObtained = subjects.reduce((sum, row) => sum + row.test, 0);
  const examObtained = subjects.reduce((sum, row) => sum + row.exam, 0);
  const totalObtained = testObtained + examObtained;

  const testObtainable = subjects.reduce((sum, row) => sum + row.maxTest, 0);
  const examObtainable = subjects.reduce((sum, row) => sum + row.maxExam, 0);
  const totalObtainable = testObtainable + examObtainable;

  const percentage =
    totalObtainable === 0 ? 0 : (totalObtained / totalObtainable) * 100;
  const roundedPercentage = Number(percentage.toFixed(2));
  const overallGrade = getGrade(roundedPercentage);

  return {
    subjects,
    testObtained,
    examObtained,
    totalObtained,
    testObtainable,
    examObtainable,
    totalObtainable,
    percentage: roundedPercentage,
    overallGrade,
    overallRemark: gradeLabelMap[overallGrade],
  };
}
