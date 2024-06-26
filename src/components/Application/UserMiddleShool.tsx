import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import styled from '@emotion/styled';
import { Button, Input, Stack, Text, theme } from '@team-entry/design_system';
import { instance } from '@/apis/axios';
import { EditAdditionalInfo, GetAdditionalInfo } from '@/apis/application';
import ApplicationContent from './ApplicationContent';
import ApplicationFooter from './ApplicationFooter';
import Modal from '../Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import { sliceString } from '@/utils/SliceString';
import { ICurrnettype, ISearchSchool, ISearchSchools, IUserMiddleSchool, InputType } from '@/interface/type';

const UserMiddleSchool = ({ current, setCurrent }: ICurrnettype) => {
  const {
    form: userMiddleSchool,
    setForm: setUserMiddleSchool,
    onChange: changeUserMiddleSchool,
  } = useInput<IUserMiddleSchool>({ studentNumber: ['', '', ''], schoolCode: '' });
  const { form: schoolName, setForm: setSchoolName } = useInput('');

  /** 중학교 겁색을 위한 form */
  const { form, setForm } = useInput('');
  const [schoolList, setSchoolList] = useState<ISearchSchool[]>([]);
  const [timer, setTimer] = useState(0); // 디바운싱 타이머
  const { setModalState, modalState, close } = useModal();
  const { combinedMutations } = useCombineMutation();

  const { data } = GetAdditionalInfo();
  const { mutateAsync } = EditAdditionalInfo();

  useEffect(() => {
    if (!!data) {
      setUserMiddleSchool({
        studentNumber: [
          data.studentNumber.gradeNumber,
          data.studentNumber.classNumber,
          data.studentNumber.studentNumber,
        ],
        schoolCode: data.schoolCode,
      });
      setSchoolName(data.schoolName);
    }
  }, [data]);

  const searchSchool = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const response: AxiosResponse = await instance.get<ISearchSchools>(`schools?school_name=${form}`);
      const data = response.data;
      setSchoolList(data?.content);
      clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = Number(
      setTimeout(async () => {
        const response: AxiosResponse = await instance.get<ISearchSchools>(`schools?school_name=${form}`);
        const data = response.data;
        setSchoolList(data?.content);
      }, 500),
    );
    setTimer(newTimer);
  }, [form]);

  const confirmSchool = (schoolCode: string, schoolName: string) => {
    setUserMiddleSchool({ ...userMiddleSchool, schoolCode });
    setSchoolName(schoolName);
    close();
  };

  const onChangeStudentNumber = (e: InputType, index: number, maxLength: number) => {
    const oldArray = userMiddleSchool.studentNumber;
    if (e.currentTarget.value.length >= maxLength) {
      oldArray[index] = e.currentTarget.value.slice(0, maxLength);
    } else {
      oldArray[index] = e.currentTarget.value;
    }
    setUserMiddleSchool((prev) => ({ ...prev, studentNumber: oldArray }));
  };

  const isDisabled = Object.values(userMiddleSchool).some((item) => !!item === false);

  const onNextClick = () => {
    combinedMutations(
      [
        () =>
          mutateAsync({
            ...userMiddleSchool,
            gradeNumber: parseInt(userMiddleSchool.studentNumber[0]),
            classNumber: parseInt(userMiddleSchool.studentNumber[1]),
            studentNumber: userMiddleSchool.studentNumber[2],
          }),
      ],
      () => setCurrent(current + 1),
    );
  };

  return (
    <>
      <_ApplicationWrapper>
        <ApplicationContent grid={2} title="중학교 이름">
          <Input type="text" placeholder="중학교 이름" name="name" value={schoolName} width={230} disabled />
          <Stack margin={['left', 20]} width={70}>
            <Button color="black" kind="outlined" onClick={() => setModalState('SEARCH_SCHOOL')}>
              검색
            </Button>
          </Stack>
        </ApplicationContent>
        <ApplicationContent grid={3} title="중학교 학번" placeholder="반, 번호는 최대 2자리수 까지 입력 가능합니다.">
          <Input
            type="number"
            value={userMiddleSchool.studentNumber[0]}
            onChange={(e) => onChangeStudentNumber(e, 0, 1)}
            placeholder="학년"
            width={120}
            unit="학년"
            maxLength={1}
          />
          <Input
            type="number"
            value={userMiddleSchool.studentNumber[1]}
            onChange={(e) => onChangeStudentNumber(e, 1, 2)}
            placeholder="반"
            width={120}
            unit="반"
            maxLength={2}
          />
          <Input
            type="number"
            value={userMiddleSchool.studentNumber[2]}
            onChange={(e) => onChangeStudentNumber(e, 2, 2)}
            placeholder="번호"
            width={120}
            unit="번호"
            maxLength={2}
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
                      {school.address.split(' ')[0] + ' ' + school.address.split(' ')[1]}
                    </Text>
                  </_SearchPreview>
                );
              })}
            </_SearchPreviews>
          </Modal>
        )}
      </_ApplicationWrapper>
      <ApplicationFooter
        current={current}
        isDisabled={isDisabled}
        prevClick={() => setCurrent(current - 1)}
        nextClick={onNextClick}
      />
    </>
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
  overflow-x: hidden;
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
