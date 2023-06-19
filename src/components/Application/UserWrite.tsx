import styled from '@emotion/styled';
import { Textarea } from '@team-entry/design_system';
import { useUserIntro } from '../../store/useUserIntro';
import { useUserPlan } from '../../store/useUserPlan';

const UserWrite = () => {
  const { userIntro, setUserIntro } = useUserIntro();
  const { userPlan, setUserPlan } = useUserPlan();

  return (
    <_Wrapper>
      <Textarea
        placeholder="내용을 입력해주세요"
        label="자기소개서"
        limit={2000}
        width="100%"
        name="intro"
        value={userIntro}
        onChange={setUserIntro}
      />
      <Textarea
        placeholder="내용을 입력해주세요"
        label="학업계획서"
        limit={2000}
        width="100%"
        name="study_plan"
        value={userPlan}
        onChange={setUserPlan}
      />
    </_Wrapper>
  );
};

export default UserWrite;

const _Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  width: 60rem;
  margin: 40px 0;
`;
