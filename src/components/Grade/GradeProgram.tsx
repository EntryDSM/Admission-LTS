import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Text } from '@team-entry/design_system';
import { GetUserType } from '@/apis/application';
import { EditUserGraduation, GetUserGraduation } from '@/apis/score';
import { ISelectGradeElement, IWriteGradeElement } from '@/apis/score/type';
import ProgressBar from './ProgressBar';
import GradePreview from './GradePreview';
import AllSelect from './SelectGrade/AllSelect';
import SelectGrade from './SelectGrade/SelectGrade';
import ApplicationFooter from '../Application/ApplicationFooter';
import WriteAttendence from './WriteInfo/WriteAttendence';
import { subject } from '@/constant/grade';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import { ICurrnettype } from '@/interface/type';

const Program = ({ current, setCurrent }: ICurrnettype) => {
  const { form: selectGradeElement, setForm: setSelectGradeElement } = useInput<ISelectGradeElement>({
    koreanGrade: ['X', 'X', 'X', 'X'],
    socialGrade: ['X', 'X', 'X', 'X'],
    historyGrade: ['X', 'X', 'X', 'X'],
    mathGrade: ['X', 'X', 'X', 'X'],
    scienceGrade: ['X', 'X', 'X', 'X'],
    englishGrade: ['X', 'X', 'X', 'X'],
    techAndHomeGrade: ['X', 'X', 'X', 'X'],
  });

  const {
    form: writeGradeElement,
    setForm: setWriteGradeElement,
    onChange: changeWriteGradeElement,
  } = useInput<IWriteGradeElement>({
    absenceDayCount: 0,
    lectureAbsenceCount: 0,
    latenessCount: 0,
    earlyLeaveCount: 0,
    volunteerTime: 0,
  });

  const { data: userType } = GetUserType();
  const { data: userGraduation } = GetUserGraduation();
  const { combinedMutations } = useCombineMutation();
  const { mutateAsync } = EditUserGraduation();

  const isGraduate = userType?.educationalStatus === 'GRADUATE';
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
        { step: 1, title: '3학년 1학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 2, title: '직전 학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 3, title: '직전전 학기', subTitle: '과목이 없는 경우 X로 기입하세요' },
        { step: 4, title: '출석 점수 & 봉사 점수' },
      ];

  useEffect(() => {
    userGraduation &&
      (setWriteGradeElement({
        absenceDayCount: userGraduation.absenceDayCount,
        lectureAbsenceCount: userGraduation.lectureAbsenceCount,
        latenessCount: userGraduation.latenessCount,
        earlyLeaveCount: userGraduation.earlyLeaveCount,
        volunteerTime: userGraduation.volunteerTime,
      }),
      setSelectGradeElement({
        koreanGrade: isGraduate
          ? userGraduation.koreanGrade.split('')
          : ['X', ...userGraduation.koreanGrade.split('').slice(1)],
        socialGrade: isGraduate
          ? userGraduation.socialGrade.split('')
          : ['X', ...userGraduation.socialGrade.split('').slice(1)],
        historyGrade: isGraduate
          ? userGraduation.historyGrade.split('')
          : ['X', ...userGraduation.historyGrade.split('').slice(1)],
        mathGrade: isGraduate
          ? userGraduation.mathGrade.split('')
          : ['X', ...userGraduation.mathGrade.split('').slice(1)],
        scienceGrade: isGraduate
          ? userGraduation.scienceGrade.split('')
          : ['X', ...userGraduation.scienceGrade.split('').slice(1)],
        englishGrade: isGraduate
          ? userGraduation.englishGrade.split('')
          : ['X', ...userGraduation.englishGrade.split('').slice(1)],
        techAndHomeGrade: isGraduate
          ? userGraduation.techAndHomeGrade.split('')
          : ['X', ...userGraduation.techAndHomeGrade.split('').slice(1)],
      }));
    !isGraduate && gradeCurrent === 0 && onNextClick();
  }, [userGraduation]);

  const onNextClick = () => {
    combinedMutations(
      [
        () =>
          mutateAsync({
            koreanGrade: selectGradeElement.koreanGrade.join(''),
            socialGrade: selectGradeElement.socialGrade.join(''),
            historyGrade: selectGradeElement.historyGrade.join(''),
            mathGrade: selectGradeElement.mathGrade.join(''),
            scienceGrade: selectGradeElement.scienceGrade.join(''),
            englishGrade: selectGradeElement.englishGrade.join(''),
            techAndHomeGrade: selectGradeElement.techAndHomeGrade.join(''),
            absenceDayCount: Number(writeGradeElement.absenceDayCount),
            lectureAbsenceCount: Number(writeGradeElement.lectureAbsenceCount),
            latenessCount: Number(writeGradeElement.latenessCount),
            earlyLeaveCount: Number(writeGradeElement.earlyLeaveCount),
            volunteerTime: Number(writeGradeElement.volunteerTime),
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
            <GradePreview
              gradeCurrent={gradeCurrent}
              selectGradeElement={selectGradeElement}
              writeGradeElement={writeGradeElement}
            />
            {!isGraduate && gradeCurrent < 4 && (
              <AllSelect
                selectGradeElement={selectGradeElement}
                setSelectGradeElement={setSelectGradeElement}
                current={gradeCurrent}
              />
            )}
            {isGraduate && gradeCurrent < 5 && (
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
          {!isGraduate &&
            gradeCurrent < 4 &&
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
          {!isGraduate && gradeCurrent === 4 && (
            <WriteAttendence writeGradeElement={writeGradeElement} changeWriteGradeElement={changeWriteGradeElement} />
          )}
          {isGraduate &&
            gradeCurrent < 5 &&
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
          {isGraduate && gradeCurrent === 5 && (
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

const _Selects = styled.div`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
`;
