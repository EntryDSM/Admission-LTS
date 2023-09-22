import { GetUserType } from '../apis/application';
import { ISelectGradeElement, IWriteGradeElement } from '../apis/score/type';
import { gradeToScore } from '../constant/grade';

interface IGradeCalculater {
  selectGradeElement: ISelectGradeElement;
  writeGradeElement: IWriteGradeElement;
}

const getWriteGradeScore = (gradeCurrent: number, selectGradeElement: ISelectGradeElement) => {
  let array: string[] = [];
  let result: number = 0;
  array = Object.values(selectGradeElement)
    .filter((selectGrades) => selectGrades[gradeCurrent] !== 'X')
    .map((item) => {
      return item[gradeCurrent];
    });
  result = array.reduce((acc, cur) => (acc += gradeToScore[cur]), 0);
  return (result / array.length) * 4;
};

const gradeCalculater = ({ selectGradeElement, writeGradeElement }: IGradeCalculater) => {
  const { data: userType } = GetUserType();
  const isCommon = userType?.application_type === '일반전형';

  /**성적산출 최고 점수 */
  const maxScore = isCommon ? 170 : 110;
  let attendenceScore: number =
    15 -
    writeGradeElement.day_absence_count -
    (writeGradeElement.early_leave_count + writeGradeElement.lateness_count + writeGradeElement.lecture_absence_count) /
      3;

  /**봉사 점수 */
  let volunteerScore: number = Math.min(15, writeGradeElement.volunteer_time);

  /** 선택한 성적 점수 */
  let first: number = getWriteGradeScore(0, selectGradeElement);
  let second: number = getWriteGradeScore(1, selectGradeElement);
  let third: number = getWriteGradeScore(2, selectGradeElement);
  let last: number = getWriteGradeScore(3, selectGradeElement);
  let selectScore: number = first + second + third + last;

  if (isCommon) selectScore *= 175 / 100;
  if(userType?.educational_status === 'PROSPECTIVE_GRADUATE') second *= 2;

  selectScore = Math.round(selectScore * 1000) / 1000;

  /** 점수 총합 */
  let allScore = selectScore + attendenceScore + volunteerScore;

  return { allScore, maxScore, selectScore, attendenceScore, volunteerScore };
};

export default gradeCalculater;
