import { useUserType } from '../store/useUserType';
import { useUserInfo } from '../store/useUserInfo';
import { useUserPhoto } from '../store/useUserPhoto';
import { useUserBlackExam } from '../store/useUserBlackExam';
import { useUserIntroduce } from '../store/useUserIntroduce';
import { useUserPlan } from '../store/useUserPlan';
import { IApplicationFooterProps } from '../interface/type';
import { EditAdditionalInfo, EditUserInfo, EditUserIntroduce, EditUserPlan, EditUserType } from '../apis/application';
import { EditUserBlackExam, EditUserGraduation } from '../apis/score';
import { IPatchUserType } from '../apis/application/types';
import { useGradeElement } from '../store/useGradeElement';
import { useUserMiddleSchool } from '../store/useUserMiddleSchool';

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
  const { userMiddleSchool } = useUserMiddleSchool();

  const { userIntroduce } = useUserIntroduce();
  const { userPlan } = useUserPlan();
  const checkUserWrite = { useUserIntroduce, userPlan };

  const { gradeElement } = useGradeElement();
  const graduation = {
    volunteer_time: Number(gradeElement[5][0]) + Number(gradeElement[5][1]) + Number(gradeElement[5][2]),
    day_absence_count: Number(gradeElement[4][0]),
    lecture_absence_count: Number(gradeElement[4][3]),
    lateness_count: Number(gradeElement[4][1]),
    early_leave_count: Number(gradeElement[4][2]),
    korean_grade:
      (isGraduate ? gradeElement[0][0] : 'X') + gradeElement[1][0] + gradeElement[2][0] + gradeElement[3][0],
    social_grade:
      (isGraduate ? gradeElement[0][1] : 'X') + gradeElement[1][1] + gradeElement[2][1] + gradeElement[3][1],
    history_grade:
      (isGraduate ? gradeElement[0][2] : 'X') + gradeElement[1][2] + gradeElement[2][2] + gradeElement[3][2],
    math_grade: (isGraduate ? gradeElement[0][3] : 'X') + gradeElement[1][3] + gradeElement[2][3] + gradeElement[3][3],
    science_grade:
      (isGraduate ? gradeElement[0][4] : 'X') + gradeElement[1][4] + gradeElement[2][4] + gradeElement[3][4],
    english_grade:
      (isGraduate ? gradeElement[0][6] : 'X') + gradeElement[1][6] + gradeElement[2][6] + gradeElement[3][6],
    tech_and_home_grade:
      (isGraduate ? gradeElement[0][5] : 'X') + gradeElement[1][5] + gradeElement[2][5] + gradeElement[3][5],
  };
  
  const checkArray = [checkUserType, checkUserInfo, '1', checkUserWrite, '1', '1', '1', '1', graduation, '1', '1'];

  const { mutate: patchUserType } = EditUserType();
  const { mutate: patchUserInfo } = EditUserInfo();
  const { mutate: patchBlackExam } = EditUserBlackExam();
  const { mutate: patchUserIntroduce } = EditUserIntroduce();
  const { mutate: patchUserPlan } = EditUserPlan();
  const { mutate: patchGraduate } = EditAdditionalInfo();
  const { mutate: patchUserGraduation } = EditUserGraduation();

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
    () => {},
    () => {},
    () => {},
    () => {},
    () => {},
    () => patchUserGraduation(graduation),
  ];

  const onClickPlus = (current: number) => {
    switch (current) {
      case 1:
        return isBlackExam ? setCurrent(3) : setCurrent(current + 1);
      case 3:
        if (isBlackExam) {
          return setCurrent(10);
        }
        return isGraduate ? setCurrent(current + 1) : setCurrent(5);
      default:
        return setCurrent(current + 1);
    }
  };

  const onClickMinus = (current: number) => {
    switch (current) {
      case 3:
        return isBlackExam ? setCurrent(1) : setCurrent(current - 1);
      case 5:
        return isGraduate ? setCurrent(current - 1) : setCurrent(3);
      case 10:
        return isBlackExam ? setCurrent(3) : setCurrent(current - 1);
      default:
        return setCurrent(current - 1);
    }
  };

  return { onClickPlus, onClickMinus, onClickPatch, isDisabled };
};

export default useClickFooter;
