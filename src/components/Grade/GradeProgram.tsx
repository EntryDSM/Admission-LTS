import styled from '@emotion/styled';
import { Text } from '@team-entry/design_system';
import AllSelect from './SelectGrade/AllSelect';
import ProgressBar from './ProgressBar';
import SelectGrade from './SelectGrade/SelectGrade';
import WriteAttendence from './WriteInfo/WriteAttendence';
import WriteVolunteer from './WriteInfo/WriteVolunteer';

interface ProgramProps {
  current: number;
}

const Program = ({ current }: ProgramProps) => {
  const titles = [
    { step: 1, title: '3학년 1학기' },
    { step: 2, title: '직전 학기' },
    { step: 3, title: '직전전 학기' },
    { step: 4, title: '출석 점수' },
    { step: 5, title: '봉사 점수' },
  ];
  const subject = ['국어', '사회', '역사', '수학', '과학', '기술가정', '영어'];

  return (
    <_Wrapper>
      <Title>
        <div>
          <Text color="black900" size="header1">
            {titles[current].title}
          </Text>
        </div>
        {current < 3 && <AllSelect current={current} />}
      </Title>
      <ProgressBar step={titles[current].step} />
      <_Selects>
        {current < 3 &&
          subject.map((item, index) => {
            return <SelectGrade key={item} title={item} current={current} index={index} />;
          })}
        {current === 3 && <WriteAttendence />}
        {current === 4 && <WriteVolunteer />}
      </_Selects>
    </_Wrapper>
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
