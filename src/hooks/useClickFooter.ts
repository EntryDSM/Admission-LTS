import { useUserType } from './useStore';
import { IApplicationFooterProps } from '../interface/type';
import { EditUserType } from '../apis/application';

const useClickFooter = ({ current, setCurrent, gradeCurrent, setGradeCurrent }: IApplicationFooterProps) => {
  const { userType } = useUserType();
  const { application_remark, ...CheckUserType } = userType;
  const checkArray = [CheckUserType];

  const { mutate: patchUserType } = EditUserType();

  const isDisabled = Object.values(checkArray[current]).includes('');
  const isBlackExam = userType.educational_status === 'QUALIFICATION_EXAM';
  const onClickPlus = () => {
    switch (current) {
      case 0:
        setCurrent(current + 1);
        patchUserType(userType)
        break;
      case 1:
        if (isBlackExam) {
          setCurrent(current + 2);
        } else {
          setCurrent(current + 1);
        }
        break;
      case 2:
        setCurrent(current + 1);
        break;
      case 3:
        if (isBlackExam) {
          setCurrent(current + 2);
        } else {
          setCurrent(current + 1);
        }
        break;
      case 4:
        if (gradeCurrent != 4) {
          setCurrent(current + 1);
        } else {
          setGradeCurrent(gradeCurrent + 1);
        }
        break;
    }
  };

  const onClickMinus = () => {
    if (current == 3 && isBlackExam) {
      setCurrent(current - 2);
    } else if (current == 5 && isBlackExam) {
      setCurrent(current - 2);
    } else if (gradeCurrent == 0) {
      setCurrent(current - 1);
    } else if (current == 4) {
      setGradeCurrent(gradeCurrent - 1);
    } else {
      setCurrent(current - 1);
    }
  };
  return { onClickPlus, onClickMinus, isDisabled };
};

export default useClickFooter;
