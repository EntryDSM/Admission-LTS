import styled from '@emotion/styled';
import { Textarea } from '@team-entry/design_system';
import { ICurrnettype } from '../../interface/type';
import ApplicationFooter from './ApplicationFooter';
import {
  EditUserIntroduce,
  EditUserPlan,
  GetUserIntroduce,
  GetUserStudyPlan,
  GetUserType,
} from '../../apis/application';
import { useTextArea } from '../../hooks/useTextarea';
import { useCombineMutation } from '../../hooks/useCombineMutation';
import { useEffect } from 'react';

const UserWrite = ({ current, setCurrent }: ICurrnettype) => {
  const {
    form: userWrite,
    onChange: changeUserWrite,
    setForm: setUserWrite,
  } = useTextArea({
    userIntroduce: '',
    userPlan: '',
  });

  const { mutateAsync: editUserIntroduce } = EditUserIntroduce();
  const { mutateAsync: editUserPlan } = EditUserPlan();
  const { combinedMutations } = useCombineMutation();
  const { data: getUserIntroduce } = GetUserIntroduce();
  const { data: getUserStudyPlan } = GetUserStudyPlan();
  const { data: getUserType } = GetUserType();

  const isBlackExam = getUserType?.educational_status == 'QUALIFICATION_EXAM';

  useEffect(() => {
    getUserIntroduce && setUserWrite((prev) => ({ ...prev, userIntroduce: getUserIntroduce.content }));
    getUserStudyPlan && setUserWrite((prev) => ({ ...prev, userPlan: getUserStudyPlan.content }));
  }, [getUserIntroduce, getUserStudyPlan]);

  return (
    <>
      <_Wrapper>
        <Textarea
          placeholder="내용을 입력해주세요"
          label="자기소개서"
          maxLength={1600}
          width="100%"
          name="userIntroduce"
          value={userWrite.userIntroduce}
          onChange={changeUserWrite}
        />
        <Textarea
          placeholder="내용을 입력해주세요"
          label="학업계획서"
          maxLength={1600}
          width="100%"
          name="userPlan"
          value={userWrite.userPlan}
          onChange={changeUserWrite}
        />
      </_Wrapper>
      <ApplicationFooter
        current={current}
        isDisabled={!userWrite.userPlan || !userWrite.userIntroduce}
        prevClick={isBlackExam ? () => setCurrent(current - 2) : () => setCurrent(current - 1)}
        nextClick={() =>
          combinedMutations(
            [
              () => editUserIntroduce({ content: userWrite.userIntroduce }),
              () => editUserPlan({ content: userWrite.userPlan }),
            ],
            isBlackExam ? () => setCurrent(current + 6) : () => setCurrent(current + 1),
          )
        }
      />
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
