import { useMemo, useRef, useState } from "react";
import "./App.css";
import { ResultForm } from "./components/ResultForm";
import { ResultPreview } from "./components/ResultPreview";
import {
  createDefaultRatings,
  createEmptyMarks,
  RESULT_TEMPLATES,
  type ResultTemplateKey,
} from "./config/template";
import type { StudentInfo, SubjectMark } from "./types/result";
import { computeResults } from "./utils/calculations";
import { clampScore } from "./utils/grading";
import { exportElementsToPdf } from "./utils/pdfExport";

function App() {
  const [templateKey, setTemplateKey] = useState<ResultTemplateKey>("primary");
  const activeTemplate = RESULT_TEMPLATES[templateKey];

  const [student, setStudent] = useState<StudentInfo>({
    name: "AHD ABIAVI CHLOE",
    term: "III",
    sex: "Female",
    className: "Four",
    age: "9 years",
    schoolOpen: 55,
    present: 53,
    absent: 2,
    numberInClass: "56",
    positionInClass: "12th",
    nextTermBegins: "01/09/25",
  });
  const [marks, setMarks] = useState<Record<string, SubjectMark>>(
    createEmptyMarks(activeTemplate),
  );
  const [ratings, setRatings] = useState<Record<string, number>>(
    createDefaultRatings(activeTemplate),
  );
  const [isExporting, setIsExporting] = useState(false);

  const frontPageRef = useRef<HTMLDivElement>(null);
  const backPageRef = useRef<HTMLDivElement>(null);

  const computed = useMemo(
    () => computeResults(marks, activeTemplate),
    [marks, activeTemplate],
  );

  function handleTemplateChange(nextTemplateKey: ResultTemplateKey): void {
    setTemplateKey(nextTemplateKey);
    const nextTemplate = RESULT_TEMPLATES[nextTemplateKey];

    setMarks((prev) => {
      const seeded = createEmptyMarks(nextTemplate);
      nextTemplate.subjects.forEach((subject) => {
        const existing = prev[subject.id];
        if (!existing) {
          return;
        }

        seeded[subject.id] = {
          test: clampScore(existing.test, 0, subject.maxTest),
          exam: clampScore(existing.exam, 0, subject.maxExam),
        };
      });

      return seeded;
    });

    setRatings((prev) => {
      const seeded = createDefaultRatings(nextTemplate);
      nextTemplate.ratingItems.forEach((item) => {
        if (typeof prev[item.id] === "number") {
          seeded[item.id] = clampScore(prev[item.id], 1, 5);
        }
      });
      return seeded;
    });
  }

  function handleStudentChange(
    field: keyof StudentInfo,
    value: string | number,
  ): void {
    setStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleMarkChange(
    subjectId: string,
    field: "test" | "exam",
    value: number,
  ): void {
    setMarks((prev) => {
      const subject = prev[subjectId] ?? { test: 0, exam: 0 };
      const templateSubject = activeTemplate.subjects.find(
        (item) => item.id === subjectId,
      );
      const max =
        field === "test"
          ? (templateSubject?.maxTest ?? 30)
          : (templateSubject?.maxExam ?? 70);

      return {
        ...prev,
        [subjectId]: {
          ...subject,
          [field]: clampScore(value, 0, max),
        },
      };
    });
  }

  function handleRatingChange(itemId: string, value: number): void {
    setRatings((prev) => ({
      ...prev,
      [itemId]: clampScore(value, 1, 5),
    }));
  }

  async function handleExport(): Promise<void> {
    if (!frontPageRef.current || !backPageRef.current) {
      return;
    }

    try {
      setIsExporting(true);
      const safeName = student.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      const fileName =
        safeName.length > 0
          ? `${safeName}-result-sheet.pdf`
          : "result-sheet.pdf";

      await exportElementsToPdf(
        [frontPageRef.current, backPageRef.current],
        fileName,
      );
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <main className="app-shell">
      <ResultForm
        templateKey={templateKey}
        template={activeTemplate}
        student={student}
        marks={marks}
        ratings={ratings}
        computed={computed}
        isExporting={isExporting}
        onTemplateChange={handleTemplateChange}
        onStudentChange={handleStudentChange}
        onMarkChange={handleMarkChange}
        onRatingChange={handleRatingChange}
        onExport={handleExport}
      />

      <ResultPreview
        template={activeTemplate}
        student={student}
        ratings={ratings}
        computed={computed}
        frontPageRef={frontPageRef}
        backPageRef={backPageRef}
      />
    </main>
  );
}

export default App;
