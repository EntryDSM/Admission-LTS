import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Button, Dropdown, HStack, Input, Radio, Stack, Text, VStack, theme } from '@team-entry/design_system';
import ApplicationContent from './ApplicationContent';
import { useModal } from '../../hooks/useModal';
import DaumPostCode from 'react-daum-postcode';
import Modal from '../Modal/Modal';
import { generateNumberArray } from '../../utils/GenerateNumberArray';
import {
  EditUserInfo,
  EditUserPhto,
  GetAdditionalInfo,
  GetUserInfo,
  GetUserProfile,
  GetUserType,
} from '../../apis/application';
import { ICurrnettype, IUserBlackExam, IUserInfo, IUserPhoto } from '../../interface/type';
import ApplicationFooter from './ApplicationFooter';
import { EditUserBlackExam, GetUserBlackExam } from '../../apis/score';
import { useInput } from '../../hooks/useInput';
import { useCombineMutation } from '../../hooks/useCombineMutation';
import { dataURLtoFile } from '../../utils/dataURLtoFile';

const UserInfo = ({ current, setCurrent }: ICurrnettype) => {
  const date = new Date();
  const {
    form: userInfo,
    setForm: setUserInfo,
    onChange: changeUserInfo,
  } = useInput<IUserInfo>({
    name: '',
    telephone_number: '00000000000',
    sex: '',
    birthday: [(date.getFullYear() - 15).toString(), '01', '01'],
    parent_name: '',
    parent_tel: '',
    address: '',
    detail_address: '',
    post_code: '',
  });
  const { form: userPhoto, setForm: setUserPhoto } = useInput<IUserPhoto>({
    photo: '',
    photo_file_name: '',
  });
  const {
    form: blackExam,
    setForm: setBlackExam,
    onChange: changeBlackExam,
  } = useInput<IUserBlackExam>({
    ged_average_score: '',
  });

  const { data: getAddionalInfo } = GetAdditionalInfo();
  const { data: userProfile } = GetUserProfile();
  const { data: getUserInfo } = GetUserInfo();
  const { data: getUserType } = GetUserType();
  const isBlackExam = getUserType?.educational_status === 'QUALIFICATION_EXAM';
  const { data: getUserBlackExam } = GetUserBlackExam(isBlackExam);

  const inputRef = useRef<HTMLInputElement>(null);
  const { close, modalState, setModalState } = useModal();

  const { mutateAsync: patchUserPhoto } = EditUserPhto();
  const { mutateAsync: patchUserInfo } = EditUserInfo();
  const { mutateAsync: patchBlackExam } = EditUserBlackExam();
  const { combinedMutations } = useCombineMutation();

  const saveImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      if (files.length === 0) {
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          setUserPhoto({ photo: reader.result as string, photo_file_name: files[0] });
        };
      }
    }
  };

  const handleAddress = (data: any) => {
    close();
    setUserInfo({
      ...userInfo,
      address: data?.address,
      post_code: data?.zonecode,
    });
  };

  const handleImage = () => {
    if (inputRef.current) inputRef.current.click();
  };

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      [userProfile?.is_student ? 'name' : 'parent_name']: userProfile?.name,
      [userProfile?.is_student ? 'telephone_number' : 'parent_tel']: userProfile?.telephone_number.replace(/-/g, ''),
    });
  }, [userProfile]);

  useEffect(() => {
    getUserInfo &&
      getUserInfo!.birthday &&
      setUserInfo({
        name: getUserInfo.name,
        parent_name: getUserInfo.parent_name,
        parent_tel: getUserInfo.parent_tel,
        post_code: getUserInfo.post_code,
        detail_address: getUserInfo.detail_address,
        sex: getUserInfo.sex,
        address: getUserInfo.address,
        telephone_number: getUserInfo.telephone_number,
        birthday: getUserInfo.birthday.split('-'),
      });
    getUserInfo &&
      setUserPhoto({
        photo: 'data:image/png;base64,' + getUserInfo.photo_file_name,
        photo_file_name: dataURLtoFile('data:image/png;base64,' + getUserInfo.photo_file_name),
      });
    getUserBlackExam &&
      setBlackExam({
        ged_average_score: getUserBlackExam.average_score,
      });
  }, [getUserInfo, getAddionalInfo, getUserBlackExam]);

  const isDisabled =
    Object.values(userInfo).some((item) => !!item === false) ||
    (!userPhoto.photo_file_name && isBlackExam === !!blackExam.ged_average_score);

  const onNextClick = () => {
    combinedMutations(
      isBlackExam
        ? [
            () =>
              patchUserInfo({
                ...userInfo,
                telephone_number: userInfo.telephone_number.replace(/-/g, ''),
                birthday: userInfo.birthday.join('-'),
                parent_tel: userInfo.parent_tel.replace(/-/g, ''),
              }),
            () => patchUserPhoto({ photo: userPhoto.photo_file_name as File }),
            () => patchBlackExam({ ged_average_score: Number(blackExam.ged_average_score) }),
          ]
        : [
            () =>
              patchUserInfo({
                ...userInfo,
                telephone_number: userInfo.telephone_number.replace(/-/g, ''),
                birthday: userInfo.birthday.join('-'),
                parent_tel: userInfo.parent_tel.replace(/-/g, ''),
              }),
            () => patchUserPhoto({ photo: userPhoto.photo_file_name as File }),
          ],
      isBlackExam ? () => setCurrent(current + 2) : () => setCurrent(current + 1),
    );
  };

  return (
    <>
      <_ApplicationWrapper>
        <ApplicationContent title="증명사진" grid={1}>
          <Stack align="center" gap={20}>
            <_ApplicationImg onClick={handleImage}>
              {userPhoto.photo ? (
                <Img src={userPhoto.photo} alt="사진을 다시 입력해주세요" />
              ) : (
                <Text color="black700" size="body3">
                  원서 사진을 등록해주세요
                </Text>
              )}
              <_ApplicationImgInput
                ref={inputRef}
                type="file"
                accept=".png, .jpg, .jpeg"
                name="img"
                onChange={saveImgFile}
              />
            </_ApplicationImg>
            <Button icon="Upload" color="orange" onClick={handleImage}>
              사진 업로드
            </Button>
          </Stack>
        </ApplicationContent>

        <ApplicationContent grid={1} title="이름">
          <Input
            type="text"
            placeholder="이름"
            width={230}
            name="name"
            value={userInfo.name}
            onChange={changeUserInfo}
            disabled={userProfile?.is_student}
          />
        </ApplicationContent>

        <ApplicationContent grid={2} title="성별">
          <Radio label="남자" name="sex" value="MALE" onClick={changeUserInfo} checked={userInfo.sex === 'MALE'} />
          <Radio label="여자" name="sex" value="FEMALE" onClick={changeUserInfo} checked={userInfo.sex === 'FEMALE'} />
        </ApplicationContent>
        <ApplicationContent grid={3} title="생년월일">
          <Dropdown
            className="birthday"
            width={85}
            value={userInfo.birthday[0]}
            onChange={(year) =>
              setUserInfo({ ...userInfo, birthday: [year, userInfo.birthday[1], userInfo.birthday[2]] })
            }
            options={generateNumberArray(2000, date.getFullYear())}
            unit="년"
          />
          <Dropdown
            className="birthday"
            width={85}
            value={userInfo.birthday[1]}
            onChange={(month) =>
              setUserInfo({ ...userInfo, birthday: [userInfo.birthday[0], month, userInfo.birthday[2]] })
            }
            options={generateNumberArray(1, 12)}
            unit="월"
          />
          <Dropdown
            className="birthday"
            width={85}
            value={userInfo.birthday[2]}
            onChange={(date) =>
              setUserInfo({ ...userInfo, birthday: [userInfo.birthday[0], userInfo.birthday[1], date] })
            }
            options={generateNumberArray(1, 31)}
            unit="일"
          />
        </ApplicationContent>

        <ApplicationContent grid={1} title="본인 연락처" placeholder="‘-’ 문자를 제외한 숫자만 입력해주세요">
          <Input
            type="tel"
            placeholder="본인 연락처"
            width={230}
            name="telephone_number"
            maxLength={13}
            value={userInfo.telephone_number}
            onChange={changeUserInfo}
            disabled={userProfile?.is_student}
          />
        </ApplicationContent>

        <ApplicationContent grid={1} title="보호자명">
          <Input
            type="text"
            placeholder="보호자명"
            width={230}
            name="parent_name"
            value={userInfo.parent_name}
            onChange={changeUserInfo}
            disabled={!userProfile?.is_student}
          />
        </ApplicationContent>

        <ApplicationContent grid={1} title="보호자 연락처" placeholder="‘-’ 문자를 제외한 숫자만 입력해주세요">
          <Input
            type="tel"
            placeholder="보호자 연락처"
            width={230}
            maxLength={13}
            name="parent_tel"
            value={userInfo.parent_tel}
            onChange={changeUserInfo}
            disabled={!userProfile?.is_student}
          />
        </ApplicationContent>

        {isBlackExam && (
          <ApplicationContent grid={1} title="검정고시 평균">
            <Input
              type="number"
              placeholder="검정고시 평균"
              width={230}
              name="ged_average_score"
              value={blackExam.ged_average_score}
              onChange={changeBlackExam}
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
                onChange={changeUserInfo}
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
      <ApplicationFooter
        current={current}
        isDisabled={isDisabled}
        prevClick={() => setCurrent(0)}
        nextClick={onNextClick}
      />
    </>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 250px;
  margin: 30px 0px;
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
