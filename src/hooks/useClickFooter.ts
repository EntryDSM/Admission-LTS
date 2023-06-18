import { useUserType } from '../store/useUserType';
import { useUserInfo } from '../store/useUserInfo';
import { useUserPhoto } from '../store/useUserPhoto';
import { useUserBlackExam } from '../store/useUserBlackExam';
import { IApplicationFooterProps } from '../interface/type';
import { EditUserBlackExam, EditUserInfo, EditUserType } from '../apis/application';
import { IGetUserType } from '../apis/application/types';

const useClickFooter = ({ current, setCurrent, gradeCurrent, setGradeCurrent }: IApplicationFooterProps) => {
  const { userType } = useUserType();
  const { application_remark, ...checkUserType } = userType;

  const isBlackExam = userType.educational_status === 'QUALIFICATION_EXAM';

  const { userInfo } = useUserInfo();
  const { photo_file_name } = useUserPhoto();
  const userInfoParam = { ...userInfo, photo_file_name };
  const { ged_average_score } = useUserBlackExam();
  const checkUserInfo = isBlackExam ? { ...userInfoParam, ged_average_score } : userInfoParam;
  const blackExam = Number(ged_average_score);

  const checkArray = [checkUserType, checkUserInfo, '1', '1', '1', '1', '1'];

  const { mutate: patchUserType } = EditUserType();
  const { mutate: patchUserInfo } = EditUserInfo();
  const { mutate: patchBlackExam } = EditUserBlackExam();

  const isDisabled = Object.values(checkArray[current]).includes('');

  const onClickPatch = [
    () => patchUserType(userType as IGetUserType),
    () => {
      patchUserInfo(userInfoParam), isBlackExam && patchBlackExam({ ged_average_score: blackExam });
    },
    () => console.log(current),
    () => console.log(current),
    () => console.log(current),
    () => console.log(current),
  ];

  const onClickPlus = [
    () => setCurrent(current + 1),
    () => {
      isBlackExam ? setCurrent(current + 2) : setCurrent(current + 1);
    },
    () => setCurrent(current + 1),
    () => {
      isBlackExam ? setCurrent(current + 2) : setCurrent(current + 1);
    },
    () => {
      gradeCurrent == 4 ? setCurrent(current + 1) : setGradeCurrent(gradeCurrent + 1);
    },
  ];

  const onClickMinus = [
    () => setCurrent(current - 1),
    () => setCurrent(current - 1),
    () => {
      isBlackExam ? setCurrent(current - 2) : setCurrent(current - 1);
    },
    () => {
      gradeCurrent === 0 ? setCurrent(current - 1) : setGradeCurrent(gradeCurrent - 1);
    },
    () => {
      isBlackExam ? setCurrent(current - 2) : setCurrent(current - 1);
    },
  ];

  return { onClickPlus, onClickMinus, onClickPatch, isDisabled };
};

export default useClickFooter;