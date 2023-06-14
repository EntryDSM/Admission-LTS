import styled from '@emotion/styled';
import { Textarea } from '@team-entry/design_system';
import { useUserWrite } from '../../hooks/useStore';

const UserWrite = () => {
  const { userWrite, setUserWrite } = useUserWrite();
  return (
    <_Wrapper>
      <Textarea
        placeholder="내용을 입력해주세요"
        label="자기소개서"
        limit={2000}
        width="100%"
        name="intro"
        value={userWrite.intro}
        onChange={setUserWrite}
      />
      <Textarea
        placeholder="내용을 입력해주세요"
        label="학업계획서"
        limit={2000}
        width="100%"
        name="study_plan"
        value={userWrite.study_plan}
        onChange={setUserWrite}
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
