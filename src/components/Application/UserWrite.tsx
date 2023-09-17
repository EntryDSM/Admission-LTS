import styled from '@emotion/styled';
import { Textarea } from '@team-entry/design_system';
import { TextAreaMaxLength } from '../../utils/TextAreaMaxLength';
import { ICurrnettype, InputType } from '../../interface/type';
import ApplicationFooter from './ApplicationFooter';
import { EditUserIntroduce, EditUserPlan } from '../../apis/application';
import { useInput } from '../../hooks/useInput';

const UserWrite = ({ current, setCurrent }: ICurrnettype) => {
  const { form: userIntroduce, setForm: setUserIntroduce } = useInput('');
  const { form: userPlan, setForm: setUserPlan } = useInput('');

  const changeUserIntroduce = (e: InputType) => {
    if (Number(e.currentTarget.value) >= TextAreaMaxLength.INTRODUCE) {
      setUserIntroduce(e.currentTarget.value.slice(0, TextAreaMaxLength.INTRODUCE));
    } else setUserIntroduce(e.currentTarget.value);
  };

  const changeUserPlan = (e: InputType) => {
    if (Number(e.currentTarget.value) >= TextAreaMaxLength.INTRODUCE) {
      setUserPlan(e.currentTarget.value.slice(0, TextAreaMaxLength.INTRODUCE));
    } else setUserPlan(e.currentTarget.value);
  };

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
          value={userIntroduce}
          onChange={changeUserIntroduce}
        />
        <Textarea
          placeholder="내용을 입력해주세요"
          label="학업계획서"
          limit={TextAreaMaxLength.STUDY_PLAN}
          width="100%"
          name="study_plan"
          value={userPlan}
          onChange={changeUserPlan}
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
