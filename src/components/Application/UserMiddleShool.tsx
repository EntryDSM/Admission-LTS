import styled from '@emotion/styled';
import { Button, Input, Stack, Text, theme } from '@team-entry/design_system';
import ApplicationContent from './ApplicationContent';
import { useUserMiddleSchool, useUserMiddleSchoolName } from '../../store/useUserMiddleSchool';
import { useModal } from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import { AxiosResponse } from 'axios';
import { instance } from '../../apis/axios';
import { useInput } from '../../hooks/useInput';
import { useState } from 'react';
import { ISearchSchool, ISearchSchools } from '../../interface/type';

const UserMiddleSchool = () => {
  const { userMiddleSchool, setUserMiddleSchool, setAllValues } = useUserMiddleSchool();
  const { setModalState, modalState, close } = useModal();
  const { form, setForm } = useInput('');
  const [schoolList, setSchoolList] = useState<ISearchSchool[]>([]);
  const { schoolName, setSchoolName } = useUserMiddleSchoolName();

  const searchSchool = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const response: AxiosResponse = await instance.get<ISearchSchools>(`application/schools?name=${form}`);
      const data = response.data;
      setSchoolList(data?.content);
    }
  };

  const confirmSchool = (school_code: string, school_name: string) => {
    setAllValues({ ...userMiddleSchool, school_code });
    setSchoolName(school_name);
    close();
  };

  return (
    <_ApplicationWrapper>
      <ApplicationContent grid={2} title="중학교 이름">
        <Input type="text" placeholder="중학교 이름" name="name" value={schoolName} width={230} disabled />
        <Stack margin={['left', 20]} width={70}>
          <Button color="black" kind="outlined" onClick={() => setModalState('SEARCH_SCHOOL')}>
            검색
          </Button>
        </Stack>
      </ApplicationContent>
      <ApplicationContent placeholder="5자리로 입력해주세요" grid={1} title="중학교 학번">
        <Input
          type="number"
          name="student_number"
          value={userMiddleSchool.student_number}
          onChange={setUserMiddleSchool}
          placeholder="중학교 학번"
          width={230}
          maxLength={5}
        />
      </ApplicationContent>
      <ApplicationContent grid={1} title="중학교 전화번호">
        <Input
          type="tel"
          name="school_tel"
          value={userMiddleSchool.school_tel}
          onChange={setUserMiddleSchool}
          placeholder="중학교 전화번호"
          width={230}
          maxLength={13}
        />
      </ApplicationContent>
      {modalState === 'SEARCH_SCHOOL' && (
        <Modal onClose={close}>
          <Input
            type="text"
            placeholder="중학교를 검색하세요"
            width={430}
            icon="Magnifier"
            onKeyDown={searchSchool}
            onChange={(e) => {
              setForm(e.target.value);
            }}
            value={form}
          />
          <_SearchPreviews>
            {schoolList?.map((school) => {
              return (
                <_SearchPreview onClick={() => confirmSchool(school.code, school.name)}>
                  <Text color="black900" size="body3">
                    {school.name}
                  </Text>
                  <Text color="black600" size="body6">
                    {school.information}
                  </Text>
                </_SearchPreview>
              );
            })}
          </_SearchPreviews>
        </Modal>
      )}
    </_ApplicationWrapper>
  );
};

export default UserMiddleSchool;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
`;

const _SearchPreviews = styled.div`
  width: 430px;
  height: 200px;
  align-items: center;
  margin-top: 25px;
  overflow: scroll;
`;

const _SearchPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  width: 430px;
  height: 45px;
  border: 1px solid ${theme.color.black300};
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  &:hover {
    background-color: ${theme.color.black100};
  }
`;
