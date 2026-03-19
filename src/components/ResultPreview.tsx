import {
  gradeScaleRows,
  gradeSummaryRows,
  RESULT_TEMPLATE,
} from "../config/template";
import type { ResultComputed } from "../utils/calculations";
import type { StudentInfo } from "../types/result";
import type { RefObject } from "react";

interface ResultPreviewProps {
  student: StudentInfo;
  ratings: Record<string, number>;
  computed: ResultComputed;
  frontPageRef: RefObject<HTMLDivElement | null>;
  backPageRef: RefObject<HTMLDivElement | null>;
}

export function ResultPreview({
  student,
  ratings,
  computed,
  frontPageRef,
  backPageRef,
}: ResultPreviewProps) {
  return (
    <section className="preview-column" aria-label="Result preview">
      <div className="panel preview-header">
        <h2>Live Preview</h2>
        <p>Both pages below are used for PDF export.</p>
      </div>

      <div className="result-page front-page" ref={frontPageRef}>
        <div className="page-overlay front-overlay">
          <header className="sheet-header">
            <img src="/logo.webp" alt="School logo" className="sheet-logo" />
            <div>
              <h1>{RESULT_TEMPLATE.schoolName}</h1>
              <p>{RESULT_TEMPLATE.schoolAddress}</p>
              <p>{RESULT_TEMPLATE.schoolContact}</p>
              <p className="sheet-motto">MOTTO: {RESULT_TEMPLATE.motto}</p>
            </div>
            <p className="academic-year">
              ACADEMIC YEAR: {RESULT_TEMPLATE.academicYear}
            </p>
          </header>

          <section className="student-meta">
            <p>
              <strong>Name:</strong> {student.name}
            </p>
            <p>
              <strong>Term:</strong> {student.term}
            </p>
            <p>
              <strong>Sex:</strong> {student.sex}
            </p>
            <p>
              <strong>Class:</strong> {student.className}
            </p>
            <p>
              <strong>Age:</strong> {student.age}
            </p>
            <p>
              <strong>No. Times School Open:</strong> {student.schoolOpen}
            </p>
            <p>
              <strong>No. Times Present:</strong> {student.present}
            </p>
            <p>
              <strong>No. Times Absent:</strong> {student.absent}
            </p>
          </section>

          <section className="subjects-section">
            <h3>Performance In Subjects</h3>
            <table className="sheet-table subjects-table">
              <thead>
                <tr>
                  <th>Subjects</th>
                  <th>Test</th>
                  <th>Exam</th>
                  <th>Total</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {computed.subjects.map((row) => (
                  <tr key={row.id}>
                    <td className="subject-name">{row.name}</td>
                    <td>{row.test}</td>
                    <td>{row.exam}</td>
                    <td>{row.total}</td>
                    <td>{row.grade}</td>
                    <td>{row.remark}</td>
                  </tr>
                ))}
                <tr className="spacer-row" aria-hidden="true">
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total Marks Obtainable</td>
                  <td>{computed.testObtainable}</td>
                  <td>{computed.examObtainable}</td>
                  <td>{computed.totalObtainable}</td>
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td>Total Marks Obtained</td>
                  <td>{computed.testObtained}</td>
                  <td>{computed.examObtained}</td>
                  <td>{computed.totalObtained}</td>
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td>Percentage</td>
                  <td>
                    {(
                      (computed.testObtained / computed.testObtainable) *
                      100
                    ).toFixed(0)}
                    %
                  </td>
                  <td>
                    {(
                      (computed.examObtained / computed.examObtainable) *
                      100
                    ).toFixed(0)}
                    %
                  </td>
                  <td>{computed.percentage}%</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </section>

          <section className="summary-row report-footer">
            <div className="meta-inline">
              <p>
                <strong>Position In Class:</strong> {student.positionInClass}
              </p>
              <p>
                <strong>Overall Grade:</strong> {computed.overallGrade}
              </p>
            </div>

            <div className="remarks-grid">
              <div className="remark-box">
                <p className="remark-label">Class Teacher's Remark:</p>
                <div className="handwriting-space"></div>
              </div>
              <div className="remark-box">
                <p className="remark-label">Principal's Remark:</p>
                <div className="handwriting-space"></div>
              </div>
            </div>

            <div className="signatures-grid">
              <div>
                <p className="signature-label">
                  Class Teacher Signature / Date
                </p>
                <div className="signature-line"></div>
              </div>
              <div>
                <p className="signature-label">Principal Signature / Date</p>
                <div className="signature-line"></div>
              </div>
            </div>

            <p className="next-term-line">
              <strong>Next Term Begins:</strong> {student.nextTermBegins}
            </p>
          </section>
        </div>
      </div>

      <div className="result-page back-page" ref={backPageRef}>
        <div className="page-overlay back-overlay">
          <h2 className="back-title">Affective And Psychomotor Records</h2>
          <table className="sheet-table ratings-table">
            <thead>
              <tr>
                <th>Skills</th>
                <th>5</th>
                <th>4</th>
                <th>3</th>
                <th>2</th>
                <th>1</th>
              </tr>
            </thead>
            <tbody>
              {RESULT_TEMPLATE.ratingItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  {[5, 4, 3, 2, 1].map((score) => (
                    <td key={`${item.id}-${score}`} className="center-cell">
                      {ratings[item.id] === score ? "✓" : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary-blocks">
            <div>
              <h3>Scale</h3>
              <table className="sheet-table compact-table">
                <tbody>
                  {gradeScaleRows.map((row) => (
                    <tr key={row.grade}>
                      <td>{row.grade}</td>
                      <td>{row.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3>Grade Summary</h3>
              <table className="sheet-table compact-table">
                <thead>
                  <tr>
                    <th>Remark</th>
                    <th>Grade</th>
                    <th>Range</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeSummaryRows.map((row) => (
                    <tr key={row.grade}>
                      <td>{row.remark}</td>
                      <td>{row.grade}</td>
                      <td>{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
