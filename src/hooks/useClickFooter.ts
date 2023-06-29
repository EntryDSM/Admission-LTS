import { useUserType } from '../store/useUserType';
import { useUserInfo } from '../store/useUserInfo';
import { useUserPhoto } from '../store/useUserPhoto';
import { useUserBlackExam } from '../store/useUserBlackExam';
import { useUserIntroduce } from '../store/useUserIntroduce';
import { useUserPlan } from '../store/useUserPlan';
import { IApplicationFooterProps } from '../interface/type';
import { EditAdditionalInfo, EditUserInfo, EditUserIntroduce, EditUserPlan, EditUserType } from '../apis/application';
import { EditUserBlackExam } from '../apis/score';
import { IPatchUserType } from '../apis/application/types';
import { useUserMiddleSchool } from '../store/useUserMiddleSchool';

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
  const { userMiddleSchool } = useUserMiddleSchool();

  const { userIntroduce } = useUserIntroduce();
  const { userPlan } = useUserPlan();
  const checkUserWrite = { useUserIntroduce, userPlan };

  const checkArray = [checkUserType, checkUserInfo, '1', checkUserWrite, '1', '1', '1'];

  const { mutate: patchUserType } = EditUserType();
  const { mutate: patchUserInfo } = EditUserInfo();
  const { mutate: patchBlackExam } = EditUserBlackExam();
  const { mutate: patchUserIntroduce } = EditUserIntroduce();
  const { mutate: patchUserPlan } = EditUserPlan();
  const { mutate: patchGraduate } = EditAdditionalInfo();

  const isDisabled = Object.values(checkArray[current]).includes('');

  const onClickPatch = [
    () => patchUserType(userType as IPatchUserType),
    () => {
      patchUserInfo(userInfoParam), isBlackExam && patchBlackExam({ ged_average_score: blackExam });
    },
    () =>
      patchGraduate({
        ...userMiddleSchool,
        school_tel: userMiddleSchool.school_tel?.replace(/-/g, ''),
      }),
    () => {
      patchUserIntroduce({ content: userIntroduce }), patchUserPlan({ content: userPlan });
    },
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
