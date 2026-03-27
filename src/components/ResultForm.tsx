import type { ResultTemplateKey } from "../config/template";
import type { ResultComputed } from "../utils/calculations";
import type { ResultTemplate, StudentInfo } from "../types/result";

interface ResultFormProps {
  templateKey: ResultTemplateKey;
  template: ResultTemplate;
  student: StudentInfo;
  marks: Record<string, { test: number | null; exam: number | null }>;
  ratings: Record<string, number>;
  computed: ResultComputed;
  isExporting: boolean;
  onTemplateChange: (templateKey: ResultTemplateKey) => void;
  onStudentChange: (field: keyof StudentInfo, value: string | number) => void;
  onMarkChange: (
    subjectId: string,
    field: "test" | "exam",
    value: number | null,
  ) => void;
  onRatingChange: (itemId: string, value: number) => void;
  onExport: () => Promise<void>;
}

export function ResultForm({
  templateKey,
  template,
  student,
  marks,
  ratings,
  computed,
  isExporting,
  onTemplateChange,
  onStudentChange,
  onMarkChange,
  onRatingChange,
  onExport,
}: ResultFormProps) {
  const attendanceMismatch =
    student.present + student.absent !== student.schoolOpen;
  const maxTestMark = template.subjects[0]?.maxTest ?? 0;
  const maxExamMark = template.subjects[0]?.maxExam ?? 0;

  return (
    <aside className="panel form-panel" aria-label="Result form">
      <header className="panel-header">
        <h2>Result Input</h2>
        <p>Enter marks once. Preview and PDF update instantly.</p>
      </header>

      <section className="form-section">
        <h3>Student Info</h3>
        <div className="grid two-columns">
          <label>
            <span>School Level</span>
            <select
              value={templateKey}
              onChange={(event) =>
                onTemplateChange(event.target.value as ResultTemplateKey)
              }
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </label>
          <label>
            <span>Name</span>
            <input
              type="text"
              value={student.name}
              onChange={(event) => onStudentChange("name", event.target.value)}
            />
          </label>
          <label>
            <span>Term</span>
            <input
              type="text"
              value={student.term}
              onChange={(event) => onStudentChange("term", event.target.value)}
            />
          </label>
          <label>
            <span>Sex</span>
            <input
              type="text"
              value={student.sex}
              onChange={(event) => onStudentChange("sex", event.target.value)}
            />
          </label>
          <label>
            <span>Class</span>
            <input
              type="text"
              value={student.className}
              onChange={(event) =>
                onStudentChange("className", event.target.value)
              }
            />
          </label>
          <label>
            <span>Age</span>
            <input
              type="text"
              value={student.age}
              onChange={(event) => onStudentChange("age", event.target.value)}
            />
          </label>
          <label>
            <span>Number In Class</span>
            <input
              type="text"
              value={student.numberInClass}
              onChange={(event) =>
                onStudentChange("numberInClass", event.target.value)
              }
            />
          </label>
          <label>
            <span>Position In Class</span>
            <input
              type="text"
              value={student.positionInClass}
              onChange={(event) =>
                onStudentChange("positionInClass", event.target.value)
              }
            />
          </label>
          <label>
            <span>No. Times School Open</span>
            <input
              type="number"
              min={0}
              value={student.schoolOpen}
              onChange={(event) =>
                onStudentChange("schoolOpen", Number(event.target.value))
              }
            />
          </label>
          <label>
            <span>No. Times Present</span>
            <input
              type="number"
              min={0}
              value={student.present}
              onChange={(event) =>
                onStudentChange("present", Number(event.target.value))
              }
            />
          </label>
          <label>
            <span>No. Times Absent</span>
            <input
              type="number"
              min={0}
              value={student.absent}
              onChange={(event) =>
                onStudentChange("absent", Number(event.target.value))
              }
            />
          </label>
          <label>
            <span>Next Term Begins</span>
            <input
              type="text"
              value={student.nextTermBegins}
              onChange={(event) =>
                onStudentChange("nextTermBegins", event.target.value)
              }
            />
          </label>
        </div>
        {attendanceMismatch ? (
          <p className="warning-text">
            Attendance check: present + absent should equal times school open.
          </p>
        ) : null}
      </section>

      <section className="form-section">
        <h3>Marks</h3>
        <div className="marks-table-wrap">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Test /{maxTestMark}</th>
                <th>Exam /{maxExamMark}</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {template.subjects.map((subject) => {
                const mark = marks[subject.id];
                const row = computed.subjects.find(
                  (item) => item.id === subject.id,
                );

                return (
                  <tr key={subject.id}>
                    <td>{subject.name}</td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        max={subject.maxTest}
                        value={mark.test ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;
                          onMarkChange(
                            subject.id,
                            "test",
                            value === "" ? null : Number(value),
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        max={subject.maxExam}
                        value={mark.exam ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;
                          onMarkChange(
                            subject.id,
                            "exam",
                            value === "" ? null : Number(value),
                          );
                        }}
                      />
                    </td>
                    <td>{row?.total ?? 0}</td>
                    <td>{row?.grade ?? "F"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="form-section">
        <h3>Affective & Psychomotor</h3>
        <div className="ratings-grid">
          {template.ratingItems.map((item) => (
            <label key={item.id} className="rating-item">
              <span>{item.label}</span>
              <select
                value={ratings[item.id] ?? 3}
                onChange={(event) =>
                  onRatingChange(item.id, Number(event.target.value))
                }
              >
                <option value={5}>5 - Excellence</option>
                <option value={4}>4 - Very Good</option>
                <option value={3}>3 - Good</option>
                <option value={2}>2 - Fair</option>
                <option value={1}>1 - Poor</option>
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className="panel-footer">
        <div>
          <p>
            Total: <strong>{computed.totalObtained}</strong> /{" "}
            {computed.totalObtainable}
          </p>
          <p>
            Percentage: <strong>{computed.percentage}%</strong>
          </p>
        </div>
        <button type="button" onClick={onExport} disabled={isExporting}>
          {isExporting ? "Generating PDF..." : "Export Two-Page PDF"}
        </button>
      </section>
    </aside>
  );
}
