import { IPatchUserType } from '../apis/application/types';

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

export interface IUserTypeParams extends Omit<IPatchUserType, 'graduated_at' | 'is_daejeon'> {
  is_daejeon: string | undefined;
  graduated_at: string[];
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

export interface IUserIntroduce {
  userIntroduce: string;
  setUserIntroduce: (e: InputType) => void;
}

export interface IUserPlan {
  userPlan: string;
  setUserPlan: (e: InputType) => void;
}

export type GradeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'X';

export interface IGradeElement {
  gradeElement: string[][];
  setElementValue: (current: number, index: number, value: string) => void;
  setAllGrade: (current: number, grade: string) => void;
  setWriteValue: (e: InputType, current: number, index: number) => void;
}

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
