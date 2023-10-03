import styled from '@emotion/styled';
import { Text } from '@team-entry/design_system';
import { ISelectGradeElement, IWriteGradeElement } from '../../apis/score/type';
import { GetUserType } from '../../apis/application';
import { getAttendenceScore, getMaxScore, getSelectGradeScore, getVoluntterScore } from '../../utils/gradeCalculater';
import { useEffect, useState } from 'react';

export interface IGradePreview {
  gradeCurrent: number;
  selectGradeElement: ISelectGradeElement;
  writeGradeElement: IWriteGradeElement;
}

const GradePreview = ({ gradeCurrent, selectGradeElement, writeGradeElement }: IGradePreview) => {
  const [score, setScore] = useState({
    gradeScore: 0,
    attendenceScore: 0,
    volunteerScore: 0,
    maxScore: 0,
  });
  const { data: getUserType } = GetUserType();
  const isCommon = getUserType?.application_type === '일반전형';

  useEffect(() => {
    setScore({
      gradeScore: getSelectGradeScore(gradeCurrent, isCommon, selectGradeElement),
      attendenceScore: gradeCurrent === 4 ? getAttendenceScore(writeGradeElement) : 0,
      volunteerScore: getVoluntterScore(writeGradeElement.volunteer_time),
      maxScore: getMaxScore(isCommon),
    });
  }, [gradeCurrent, writeGradeElement]);

  return (
    <CurrentGrades>
      <Text size="title3" color="black" style={{ fontWeight: 700 }}>
        총: {score.gradeScore + score.attendenceScore + score.volunteerScore}/{score.maxScore}
      </Text>
      <Text size="title3" color="black" style={{ fontWeight: 500 }}>
        성적 점수: {score.gradeScore}/{score.maxScore - 30}
      </Text>
      <Text size="title3" color="black" style={{ fontWeight: 500 }}>
        출석 점수: {score.attendenceScore}/15
      </Text>
      <Text size="title3" color="black" style={{ fontWeight: 500 }}>
        봉사 점수: {score.volunteerScore}/15
      </Text>
    </CurrentGrades>
  );
};

export default GradePreview;

const CurrentGrades = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;
