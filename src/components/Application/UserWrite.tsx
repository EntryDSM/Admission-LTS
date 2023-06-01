import React, { SetStateAction } from 'react';
import styled from '@emotion/styled';
import { Textarea, theme } from '@team-entry/design_system';
import { useInput } from '../../hooks/useInput';
import { UserWriteValue } from '../../interface/type';

interface UserTypeProps {
  userWriteValues: UserWriteValue;
  setUserWriteValues: React.Dispatch<SetStateAction<UserWriteValue>>;
}

const UserWrite = ({ userWriteValues, setUserWriteValues }: UserTypeProps) => {
  const { form: inputValues, onChange: changeInputValues } = useInput(userWriteValues);
  setUserWriteValues(inputValues);
  return (
    <_Wrapper>
      <Textarea
        placeholder="내용을 입력해주세요"
        label="자기소개서"
        limit={2000}
        width="100%"
        name="intro"
        value={inputValues.intro}
        onChange={changeInputValues}
      />
      <Textarea
        placeholder="내용을 입력해주세요"
        label="학업계획서"
        limit={2000}
        width="100%"
        name="study_plan"
        value={inputValues.study_plan}
        onChange={changeInputValues}
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