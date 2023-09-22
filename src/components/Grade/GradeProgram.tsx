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
import { EditUserGraduation, GetUserGraduation } from '../../apis/score';
import { subject } from '../../constant/grade';
import { useEffect } from 'react';
import { useCombineMutation } from '../../hooks/useCombineMutation';
import gradeCalculater from '../../utils/gradeCalculater';

const Program = ({ current, setCurrent }: ICurrnettype) => {
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
  const { combinedMutations } = useCombineMutation();
  const { mutateAsync } = EditUserGraduation();

  const isGraduate = userType?.educational_status === 'GRADUATE';
  const gradeCurrent = current - 4;
  const titles = isGraduate
    ? [
        { step: 1, title: '3학년 2학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 2, title: '3학년 1학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 3, title: '2학년 2학기(직전학기)', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 4, title: '2학년 1학기(직전 전학기)', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 5, title: '출석 점수 & 봉사 점수' },
      ]
    : [
        { step: 0, title: '' },
        { step: 1, title: '3학년 1학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 2, title: '직전 학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 3, title: '직전전 학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 4, title: '출석 점수 & 봉사 점수' },
      ];
  const { maxScore, allScore, selectScore, attendenceScore, volunteerScore } = gradeCalculater({
    selectGradeElement,
    writeGradeElement,
  });

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

  const onNextClick = () => {
    combinedMutations(
      [
        () =>
          mutateAsync({
            ...selectGradeElement,
            ...writeGradeElement,
            korean_grade: selectGradeElement.korean_grade.join(''),
            social_grade: selectGradeElement.social_grade.join(''),
            history_grade: selectGradeElement.history_grade.join(''),
            math_grade: selectGradeElement.math_grade.join(''),
            science_grade: selectGradeElement.science_grade.join(''),
            english_grade: selectGradeElement.english_grade.join(''),
            tech_and_home_grade: selectGradeElement.tech_and_home_grade.join(''),
          }),
      ],
      () => setCurrent(current + 1),
    );
  };

  return (
    <>
      <_Wrapper>
        <Header>
          <Title>
            <Text color="black900" size="header1">
              {titles[gradeCurrent].title}
            </Text>
            <Text color="black500" size="body3">
              {titles[gradeCurrent].subTitle && titles[gradeCurrent].subTitle}
            </Text>
          </Title>
          <GradeWrapper>
            <CurrentGrades>
              <Text size="title3" color="black" style={{ fontWeight: 700 }}>
                총: {allScore}/{maxScore}
              </Text>
              <Text size="title3" color="black">
                성적 점수: {selectScore}/{maxScore - 30}
              </Text>
              <Text size="title3" color="black">
                출석 점수: {attendenceScore}/15
              </Text>
              <Text size="title3" color="black">
                봉사 점수: {volunteerScore}/15
              </Text>
            </CurrentGrades>
            {gradeCurrent < 4 && (
              <AllSelect
                selectGradeElement={selectGradeElement}
                setSelectGradeElement={setSelectGradeElement}
                current={gradeCurrent}
              />
            )}
          </GradeWrapper>
        </Header>
        <ProgressBar step={titles[gradeCurrent].step} />
        <_Selects>
          {gradeCurrent < 4 &&
            Object.entries(subject).map((item) => {
              return (
                <SelectGrade
                  key={item[0]}
                  title={item[0]}
                  gradesKey={item[1] as keyof ISelectGradeElement}
                  selectGradeElement={selectGradeElement}
                  setSelectGradeElement={setSelectGradeElement}
                  current={gradeCurrent}
                />
              );
            })}
          {gradeCurrent === 4 && (
            <WriteAttendence writeGradeElement={writeGradeElement} changeWriteGradeElement={changeWriteGradeElement} />
          )}
        </_Selects>
      </_Wrapper>
      <ApplicationFooter
        current={current}
        isDisabled={false}
        prevClick={!isGraduate && gradeCurrent === 1 ? () => setCurrent(current - 2) : () => setCurrent(current - 1)}
        nextClick={onNextClick}
      />
    </>
  );
};

export default Program;

const _Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GradeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CurrentGrades = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
`;

const _Selects = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
`;
