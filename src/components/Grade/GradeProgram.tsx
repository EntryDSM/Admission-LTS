import styled from '@emotion/styled';
import { Text } from '@team-entry/design_system';
import AllSelect from './SelectGrade/AllSelect';
import ProgressBar from './ProgressBar';
import SelectGrade from './SelectGrade/SelectGrade';
import WriteAttendence from './WriteInfo/WriteAttendence';
import { ICurrnettype } from '../../interface/type';
import ApplicationFooter from '../Application/ApplicationFooter';
import { useInput } from '../../hooks/useInput';
import { ISelectGradeElement, IWriteGradeElement } from '../../apis/score/type';
import { GetUserType } from '../../apis/application';
import { GetUserGraduation } from '../../apis/score';
import { subject } from '../../constant/grade';
import { useEffect } from 'react';

const Program = ({ current }: ICurrnettype) => {
  const { form: selectGradeElement, setForm: setSelectGradeElement } = useInput<ISelectGradeElement>({
    korean_grade: ['X', 'X', 'X', 'X'],
    social_grade: ['X', 'X', 'X', 'X'],
    history_grade: ['X', 'X', 'X', 'X'],
    math_grade: ['X', 'X', 'X', 'X'],
    science_grade: ['X', 'X', 'X', 'X'],
    english_grade: ['X', 'X', 'X', 'X'],
    tech_and_home_grade: ['X', 'X', 'X', 'X'],
  });

  const {
    form: writeGradeElement,
    setForm: setWriteGradeElement,
    onChange: changeWriteGradeElement,
  } = useInput<IWriteGradeElement>({
    day_absence_count: 0,
    lecture_absence_count: 0,
    lateness_count: 0,
    early_leave_count: 0,
    volunteer_time: 0,
  });

  const { data: userType } = GetUserType();
  const { data: userGraduation } = GetUserGraduation();

  const isGraduate = userType?.educational_status === 'GRADUATE';
  const titles = isGraduate
    ? [
        { step: 1, title: '3학년 2학기' },
        { step: 2, title: '3학년 1학기' },
        { step: 3, title: '2학년 2학기' },
        { step: 4, title: '2학년 1학기' },
        { step: 5, title: '출석 점수 & 봉사 점수' },
        { step: 5, title: '봉사 점수' },
      ]
    : [
        { step: 0, title: '' },
        { step: 1, title: '3학년 1학기' },
        { step: 2, title: '직전 학기' },
        { step: 3, title: '직전전 학기' },
        { step: 4, title: '출석 점수 & 봉사 점수' },
        { step: 4, title: '봉사 점수' },
      ];

  useEffect(() => {
    userGraduation &&
      (setWriteGradeElement({
        day_absence_count: userGraduation.day_absence_count,
        lecture_absence_count: userGraduation.lecture_absence_count,
        lateness_count: userGraduation.lateness_count,
        early_leave_count: userGraduation.early_leave_count,
        volunteer_time: userGraduation.volunteer_time,
      }),
      setSelectGradeElement({
        korean_grade: userGraduation.korean_grade.split(''),
        social_grade: userGraduation.social_grade.split(''),
        history_grade: userGraduation.history_grade.split(''),
        math_grade: userGraduation.math_grade.split(''),
        science_grade: userGraduation.science_grade.split(''),
        english_grade: userGraduation.english_grade.split(''),
        tech_and_home_grade: userGraduation.tech_and_home_grade.split(''),
      }));
  }, [userGraduation]);

  // const { mutate } = EditUserGraduation();

  return (
    <>
      <_Wrapper>
        <Title>
          <Text color="black900" size="header1">
            {titles[current].title}
          </Text>
          {current < 4 && (
            <AllSelect
              selectGradeElement={selectGradeElement}
              setSelectGradeElement={setSelectGradeElement}
              current={current}
            />
          )}
        </Title>
        <ProgressBar step={titles[current].step} />
        <_Selects>
          {current < 4 &&
            Object.entries(subject).map((item) => {
              return (
                <SelectGrade
                  key={item[0]}
                  title={item[0]}
                  keyyy={item[1] as keyof ISelectGradeElement}
                  selectGradeElement={selectGradeElement}
                  setSelectGradeElement={setSelectGradeElement}
                  current={current}
                />
              );
            })}
          {current === 4 && (
            <WriteAttendence writeGradeElement={writeGradeElement} changeWriteGradeElement={changeWriteGradeElement} />
          )}
        </_Selects>
      </_Wrapper>
      <ApplicationFooter current={current} isDisabled={false} />
    </>
  );
};

export default Program;

const _Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const _Selects = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
`;
