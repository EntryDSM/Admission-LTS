import styled from '@emotion/styled';
import { Textarea } from '@team-entry/design_system';
import { TextAreaMaxLength } from '../../utils/TextAreaMaxLength';
import { ICurrnettype } from '../../interface/type';
import ApplicationFooter from './ApplicationFooter';
import { EditUserIntroduce, EditUserPlan } from '../../apis/application';
import { useTextArea } from '../../hooks/useTextarea';

const UserWrite = ({ current, setCurrent }: ICurrnettype) => {
  const { form: userWrite, onChange: changeUserWrite } = useTextArea({
    userIntroduce: '',
    userPlan: '',
  });

  const {} = EditUserIntroduce();
  const {} = EditUserPlan();

  return (
    <>
      <_Wrapper>
        <Textarea
          placeholder="내용을 입력해주세요"
          label="자기소개서"
          limit={TextAreaMaxLength.INTRODUCE}
          width="100%"
          name="intro"
          value={userWrite.userIntroduce}
          onChange={changeUserWrite}
        />
        <Textarea
          placeholder="내용을 입력해주세요"
          label="학업계획서"
          limit={TextAreaMaxLength.STUDY_PLAN}
          width="100%"
          name="study_plan"
          value={userWrite.userPlan}
          onChange={changeUserWrite}
        />
      </_Wrapper>
      <ApplicationFooter current={current} isDisabled={false} prevClick={() => setCurrent(current - 1)} />
    </>
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
