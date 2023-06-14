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

  const [gradeCurrent, setGradeCurrent] = useState<number>(0);

  const elements = [
    { title: '지원자 전형 구분', component: <UserType /> },
    {
      title: '지원자 인적사항',
      component: <UserInfo />,
    },
    {
      title: '중학교 정보입력',
      component: <UserMiddleSchool />      
    },
    {
      title: '자기소개서 & 학업 계획서',
      component: <UserWrite />,
    },
    {
      title: '',
      component: <GradeProgram current={gradeCurrent} />,
    },
    { title: '지원 원서 미리보기', component: <UserPreview /> },
  ];

  return (
    <_Container>
      <_Wrapper>
        {elements[current].title && <ApplicationTitle title={elements[current].title} />}
        {elements[current].component}
        <ApplicationFooter
          current={current}
          setCurrent={setCurrent}
          gradeCurrent={gradeCurrent}
          setGradeCurrent={setGradeCurrent}
        />
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
