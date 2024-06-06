import { IPatchUserType } from '@/apis/application/types';

export type InputType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | React.MouseEvent<HTMLInputElement, MouseEvent>;

export interface IApplicationFooterProps {
  current: number;
  isDisabled: boolean;
  prevClick?: () => void;
  nextClick?: () => void;
}

export interface ICurrnettype {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

export interface IUserTypeParams extends Omit<IPatchUserType, 'graduatedAt' | 'isDaejeon'> {
  isDaejeon: string | undefined;
  graduatedAt: string[];
}

export interface IUserPhoto {
  photo: string;
  photo_file_name: File | string;
}

export interface IUserBlackExam {
  ged_average_score: string;
}

export interface IUserInfo {
  name: string;
  telephone_number: string;
  sex: string;
  birthday: string[];
  parent_name: string;
  parent_tel: string;
  address: string;
  detail_address: string;
  post_code: string;
}

export interface IPatchUserMiddleSchool {
  student_number: string;
  school_code: string;
  school_tel: string;
}

export interface IUserMiddleSchool {
  student_number: string[];
  school_code: string;
  school_tel: string;
}

export interface IUserMiddleSchoolName {
  schoolName: string;
}

export type GradeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'X';

export type ModalType =
  | ''
  | 'CANCEL_SUBMIT'
  | 'SIGN_OUT'
  | 'SEARCH_ADDRESS'
  | 'SEARCH_SCHOOL'
  | 'SUBMIT_MODAL'
  | 'ERROR'
  | 'SUCCESS'
  | 'ADMISSION';

export interface IModalState {
  modalState: ModalType;
  setModalState: (modalState: ModalType) => void;
}

export interface ISearchSchools {
  content: ISearchSchool[];
}

export interface ISearchSchool {
  code: string;
  name: string;
  information: string;
  address: string;
}
