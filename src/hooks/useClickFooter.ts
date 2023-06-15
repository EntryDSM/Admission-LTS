import { useUserType } from './useStore';
import { IApplicationFooterProps } from '../interface/type';
import { EditUserType } from '../apis/application';
import { IGetUserType } from '../apis/application/types';

const useClickFooter = ({ current, setCurrent, gradeCurrent, setGradeCurrent }: IApplicationFooterProps) => {
  const { userType } = useUserType();
  const { application_remark, ...CheckUserType } = userType;
  const checkArray = [CheckUserType, '1', '1', '1', '1', '1', '1'];

  const { mutate: patchUserType } = EditUserType();

  const isDisabled = Object.values(checkArray[current]).includes('');
  const isBlackExam = userType.educational_status === 'QUALIFICATION_EXAM';

  const onClickPatch = [() => patchUserType(userType as IGetUserType)];

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
