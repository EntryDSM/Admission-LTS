import { useState } from 'react';
import styled from '@emotion/styled';
import ApplicationTitle from '../components/Application/ApplicationTitle';
import ApplicationFooter from '../components/Application/ApplicationFooter';
import UserType from '../components/Application/UserType';
import UserInfo from '../components/Application/UserInfo';
import UserWrite from '../components/Application/UserWrite';
import UserPreview from '../components/Application/UserPreview';
import GradeProgram from '../components/Grade/GradeProgram';
import UserMiddleSchool from '../components/Application/UserMiddleShool';

const Application = () => {
  const [current, setCurrent] = useState<number>(0);

  const titles = [
    '지원자 전형 구분',
    '지원자 인적사항',
    '중학교 정보입력',
    '자기소개서 & 학업 계획서',
    '',
    '',
    '',
    '',
    '',
    '',
    '지원 원서 미리보기',
  ];

  const elements = [
    <UserType />,
    <UserInfo />,
    <UserMiddleSchool />,
    <UserWrite />,
    <GradeProgram current={0} />,
    <GradeProgram current={1} />,
    <GradeProgram current={2} />,
    <GradeProgram current={3} />,
    <GradeProgram current={4} />,
    <GradeProgram current={5} />,
    <UserPreview />,
  ];

  return (
    <_Container>
      <_Wrapper>
        {titles[current] && <ApplicationTitle title={titles[current]} />}
        {elements[current]}
        <ApplicationFooter current={current} setCurrent={setCurrent} />
      </_Wrapper>
    </_Container>
  );
};

export default Application;

const _Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  margin-top: 5rem;
`;
