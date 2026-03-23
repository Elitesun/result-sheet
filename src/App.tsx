import { useMemo, useRef, useState } from "react";
import "./App.css";
import { ResultForm } from "./components/ResultForm";
import { ResultPreview } from "./components/ResultPreview";
import { createDefaultRatings, createEmptyMarks } from "./config/template";
import type { StudentInfo, SubjectId } from "./types/result";
import { computeResults } from "./utils/calculations";
import { clampScore } from "./utils/grading";
import { exportElementsToPdf } from "./utils/pdfExport";

function App() {
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
  const [marks, setMarks] = useState(createEmptyMarks);
  const [ratings, setRatings] = useState(createDefaultRatings);
  const [isExporting, setIsExporting] = useState(false);

  const frontPageRef = useRef<HTMLDivElement>(null);
  const backPageRef = useRef<HTMLDivElement>(null);

  const computed = useMemo(() => computeResults(marks), [marks]);

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
    subjectId: SubjectId,
    field: "test" | "exam",
    value: number,
  ): void {
    setMarks((prev) => {
      const subject = prev[subjectId];
      const max = field === "test" ? 30 : 70;

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
        student={student}
        marks={marks}
        ratings={ratings}
        computed={computed}
        isExporting={isExporting}
        onStudentChange={handleStudentChange}
        onMarkChange={handleMarkChange}
        onRatingChange={handleRatingChange}
        onExport={handleExport}
      />

      <ResultPreview
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
