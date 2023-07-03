import { useUserType } from '../store/useUserType';
import { useUserInfo } from '../store/useUserInfo';
import { useUserPhoto } from '../store/useUserPhoto';
import { useUserBlackExam } from '../store/useUserBlackExam';
import { useUserIntroduce } from '../store/useUserIntroduce';
import { useUserPlan } from '../store/useUserPlan';
import { IApplicationFooterProps } from '../interface/type';
import { EditUserInfo, EditUserIntroduce, EditUserPlan, EditUserType } from '../apis/application';
import { EditUserBlackExam } from '../apis/score';
import { IPatchUserType } from '../apis/application/types';

const useClickFooter = ({ current, setCurrent }: IApplicationFooterProps) => {
  const { userType } = useUserType();
  const { application_remark, ...checkUserType } = userType;

  const isBlackExam = userType.educational_status === 'QUALIFICATION_EXAM';
  const isGraduate = userType.educational_status === 'GRADUATE';

  const { userInfo } = useUserInfo();
  const { photo_file_name } = useUserPhoto();
  const userInfoParam = { ...userInfo, photo_file_name };
  const { ged_average_score } = useUserBlackExam();
  const checkUserInfo = isBlackExam ? { ...userInfoParam, ged_average_score } : userInfoParam;
  const blackExam = Number(ged_average_score);

  const { userIntroduce } = useUserIntroduce();
  const { userPlan } = useUserPlan();
  const checkUserWrite = { useUserIntroduce, userPlan };

  const checkArray = [checkUserType, checkUserInfo, '1', checkUserWrite, '1', '1', '1', '1', '1', '1', '1'];

  const { mutate: patchUserType } = EditUserType();
  const { mutate: patchUserInfo } = EditUserInfo();
  const { mutate: patchBlackExam } = EditUserBlackExam();
  const { mutate: patchUserIntroduce } = EditUserIntroduce();
  const { mutate: patchUserPlan } = EditUserPlan();

  const isDisabled = Object.values(checkArray[current]).includes('');

  const onClickPatch = [
    () => patchUserType(userType as IPatchUserType),
    () => {
      patchUserInfo(userInfoParam), isBlackExam && patchBlackExam({ ged_average_score: blackExam });
    },
    () => console.log(current),
    () => {
      patchUserIntroduce({ content: userIntroduce }), patchUserPlan({ content: userPlan });
    },
    () => console.log(current),
    () => console.log(current),
    () => console.log(current),
    () => console.log(current),
    () => console.log(current),
    () => console.log(current),
    () => console.log(current),
  ];

  const onClickPlus = (current: number) => {
    switch (current) {
      case 1:
        return isBlackExam ? setCurrent(3) : setCurrent(current + 1);
      case 3:
        return isBlackExam ? setCurrent(10) : setCurrent(current + 1);
      case 6:
        return isGraduate ? setCurrent(current + 1) : setCurrent(8);
      default:
        return setCurrent(current + 1);
    }
  };

  const onClickMinus = (current: number) => {
    switch (current) {
      case 3:
        return isBlackExam ? setCurrent(1) : setCurrent(current - 1);
      case 8:
        return isGraduate ? setCurrent(current - 1) : setCurrent(6);
      case 10:
        return isBlackExam ? setCurrent(3) : setCurrent(9);
      default:
        return setCurrent(current - 1);
    }
  };

  return { onClickPlus, onClickMinus, onClickPatch, isDisabled };
};

export default useClickFooter;
