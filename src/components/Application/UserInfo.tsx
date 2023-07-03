import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Dropdown, HStack, Input, Radio, Text, VStack, theme } from '@team-entry/design_system';
import ApplicationContent from './ApplicationContent';
import { useUserType } from '../../store/useUserType';
import { useUserInfo } from '../../store/useUserInfo';
import { useUserPhoto } from '../../store/useUserPhoto';
import { useUserBlackExam } from '../../store/useUserBlackExam';
import { useModal } from '../../hooks/useModal';
import DaumPostCode from 'react-daum-postcode';
import Modal from '../Modal/Modal';
import { generateNumberArray } from '../../utils/GenerateNumberArray';
import { instance } from '../../apis/axios';

const UserInfo = () => {
  const [data, setData] = useState({ name: '', telephone_number: '' });
  const { userType } = useUserType();
  const { userInfo, setUserInfo, setTelephone, setAllValues, setDropdown } = useUserInfo();
  const { photo_file_name, setUserPhoto } = useUserPhoto();
  const { ged_average_score, setUserGedAverageScore } = useUserBlackExam();
  
  const response = async () => {
    const { data } = await instance.get<{ name: string; telephone_number: string }>('application/users/info');
    setData({ name: data.name, telephone_number: data.telephone_number });
  };
  useEffect(() => {
    response();
  }, []);

  const isBlackExam = userType.educational_status === 'QUALIFICATION_EXAM';
  const { close, modalState, setModalState } = useModal();

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      if (files.length === 0) {
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          setUserPhoto(reader.result as string);
        };
      }
    }
  };

  const handleAddress = (data: any) => {
    close();
    setAllValues({
      ...userInfo,
      address: data?.address,
      post_code: data?.zonecode,
    });
  };

  return (
    <_ApplicationWrapper>
      <label>
        <_ApplicationImg>
          {photo_file_name ? (
            <Img src={photo_file_name} alt="userImg" />
          ) : (
            <Text color="black700" size="body3">
              원서 사진을 등록해주세요
            </Text>
          )}
        </_ApplicationImg>
        <_ApplicationImgInput type="file" accept=".png, .jpeg" name="img" onChange={saveImgFile} />
      </label>

      <ApplicationContent grid={1} title="이름" width={40}>
        <Input type="text" placeholder="이름" width={230} name="name" value={data.name} disabled />
      </ApplicationContent>

      <ApplicationContent grid={2} title="성별" width={40}>
        <Radio label="남자" name="sex" value="MALE" onClick={setUserInfo} isChecked={userInfo.sex === 'MALE'} />
        <Radio label="여자" name="sex" value="FEMALE" onClick={setUserInfo} isChecked={userInfo.sex === 'FEMALE'} />
      </ApplicationContent>
      <ApplicationContent grid={3} title="생년월일" width={40}>
        <Dropdown
          className="birthday"
          width={85}
          onChange={(e) => setDropdown(0, e, 'birthday')}
          options={generateNumberArray(2000, 2024)}
          unit="년"
        />
        <Dropdown
          className="birthday"
          width={85}
          onChange={(e) => setDropdown(1, e, 'birthday')}
          options={generateNumberArray(1, 12)}
          unit="월"
        />
        <Dropdown
          className="birthday"
          width={85}
          onChange={(e) => setDropdown(2, e, 'birthday')}
          options={generateNumberArray(1, 31)}
          unit="일"
        />
      </ApplicationContent>

      <ApplicationContent grid={1} title="보호자명" width={40}>
        <Input
          type="text"
          placeholder="보호자명"
          width={230}
          name="parent_name"
          value={userInfo.parent_name}
          onChange={setUserInfo}
        />
      </ApplicationContent>

      <ApplicationContent grid={1} title="본인 연락처" placeholder="‘-’ 문자를 제외한 숫자만 입력해주세요">
        <Input
          type="tel"
          placeholder="본인 연락처"
          width={230}
          name="telephone_number"
          value={data.telephone_number}
          disabled
        />
      </ApplicationContent>

      <ApplicationContent grid={1} title="보호자 연락처" placeholder="‘-’ 문자를 제외한 숫자만 입력해주세요">
        <Input
          type="tel"
          placeholder="보호자 연락처"
          width={230}
          name="parent_tel"
          value={userInfo.parent_tel}
          onChange={setTelephone}
        />
      </ApplicationContent>

      {isBlackExam && (
        <ApplicationContent grid={1} title="검정고시 평균">
          <Input
            type="number"
            placeholder="검정고시 평균"
            width={230}
            name="blackExam"
            value={ged_average_score}
            onChange={(e) => setUserGedAverageScore(e.currentTarget.value)}
            unit="점"
          />
        </ApplicationContent>
      )}

      <ApplicationContent grid={1} title="주소">
        <VStack margin={[30, 0]} gap={10}>
          <HStack gap={20}>
            <Input
              name="post_code"
              type="text"
              width={125}
              placeholder="우편번호"
              value={userInfo.post_code}
              disabled
            />
            <Input name="address" type="text" width={240} placeholder="기본주소" value={userInfo.address} disabled />
            <Button
              kind="outlined"
              onClick={() => {
                setModalState('SEARCH_ADDRESS');
              }}
            >
              검색
            </Button>
          </HStack>
          <HStack gap={20}>
            <Input
              name="detail_address"
              type="text"
              width={485}
              placeholder="상세주소"
              onChange={setUserInfo}
              value={userInfo.detail_address}
            />
          </HStack>
        </VStack>
      </ApplicationContent>
      {modalState === 'SEARCH_ADDRESS' && (
        <Modal onClose={close}>
          <DaumPostCode onComplete={handleAddress} />
        </Modal>
      )}
    </_ApplicationWrapper>
  );
};
export default UserInfo;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
`;

const _ApplicationImg = styled.div`
  position: absolute;
  top: 15px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  height: 310px;
  background-color: ${theme.color.black50};
  border: 1px solid ${theme.color.black100};
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const _ApplicationImgInput = styled.input`
  display: none;
`;
