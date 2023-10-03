import { gradeToScore } from '../constant/grade';
import { ISelectGradeElement, IWriteGradeElement } from '../apis/score/type';

/**성적산출 최고 점수 */
export const getMaxScore = (isCommon: boolean) => {
  return isCommon ? 170 : 110;
};

/**출석 점수 계산하는 함수 */
export const getAttendenceScore = (writeGradeElement: IWriteGradeElement) => {
  const { day_absence_count, early_leave_count, lateness_count, lecture_absence_count } = writeGradeElement;
  const absenceCount = day_absence_count;
  const unauthorizedThing = early_leave_count + lateness_count + lecture_absence_count;

  return 15 - Math.floor(absenceCount + unauthorizedThing / 3);
};

/**봉사 점수 */
export const getVoluntterScore = (volunterrTime: number) => {
  return Math.min(15, volunterrTime);
};

/**각 학기별 점수 계산 */
const getSelectSemesterGradeScore = (gradeCurrent: number, selectGradeElement: ISelectGradeElement) => {
  let result: number;
  let gradeScoreArray: string[] = [];

  gradeScoreArray = Object.values(selectGradeElement)
    .filter((selectGradesSubjects) => selectGradesSubjects[gradeCurrent] !== 'X')
    .map((grades) => {
      return grades[gradeCurrent];
    });

  if (gradeScoreArray.length === 0) return 0;

  result = gradeScoreArray.reduce((acc, current) => (acc += gradeToScore[current]), 0);
  return (result / gradeScoreArray.length) * 4;
};

/**총 학기별 점수 계산 */
export const getSelectGradeScore = (
  gradeCurrent: number,
  isCommmon: boolean,
  selectGradeElement: ISelectGradeElement,
) => {
  const allSubjectsGrade: number[] = [0, 0, 0, 0];
  let result = 0;
  for (let i = 0; i < gradeCurrent; i++) {
    allSubjectsGrade[i] = getSelectSemesterGradeScore(i, selectGradeElement);
  }

  if (!allSubjectsGrade[0] && !!allSubjectsGrade[1]) allSubjectsGrade[1] *= 2;

  if (!allSubjectsGrade[2] && !allSubjectsGrade[3]) {
    allSubjectsGrade[2] = (allSubjectsGrade[0] + allSubjectsGrade[1]) / 2;
    allSubjectsGrade[3] = (allSubjectsGrade[0] + allSubjectsGrade[1]) / 2;
  } else if (!allSubjectsGrade[3]) {
    allSubjectsGrade[3] = (allSubjectsGrade[0] + allSubjectsGrade[1] + allSubjectsGrade[2]) / 3;
  } else if (!allSubjectsGrade[2]) {
    allSubjectsGrade[2] = (allSubjectsGrade[0] + allSubjectsGrade[1] + allSubjectsGrade[3]) / 3;
  }
  console.log(selectGradeElement);
  for (let i = 0; i < gradeCurrent; i++) {
    result += allSubjectsGrade[i];
  }

  return isCommmon ? Math.round((result * 1750) / 100) / 10 : Math.round(result * 10) / 10;
};
