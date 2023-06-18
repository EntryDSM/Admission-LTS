export type InputType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | React.MouseEvent<HTMLInputElement, MouseEvent>;

export interface IApplicationFooterProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  gradeCurrent: number;
  setGradeCurrent: React.Dispatch<React.SetStateAction<number>>;
}

export interface IUserTypeParams {
  application_type: string;
  is_daejeon: boolean | undefined;
  educational_status: string;
  graduated_at: string;
  application_remark: string | null;
  is_out_of_headcount: boolean;
}

export interface IUserType {
  userType: IUserTypeParams;
  graduatedAtArray: string[];
  setUserType: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
  setDropdown: (index: number, value: string, type: string) => void;
}

export interface IUserPhoto {
  photo_file_name: string;
  setUserPhoto: (photo_file_name: string) => void;
}

export interface IUserBlackExam {
  ged_average_score: string;
  setUserGedAverageScore: (ged_average_score: string) => void;
}

export interface IUserInfo {
  userInfo: {
    name: string;
    sex: string;
    birthday: string;
    parent_name: string;
    parent_tel: string;
    telephone_number: string;
    address: string;
    detail_address: string;
    post_code: string;
  };
  yearArray: string[];
  setUserInfo: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
  setDropdown: (index: number, value: string, type: string) => void;
}

export interface IUserMiddleSchool {
  userMiddleSchool: {
    name: string;
    studentId: number | undefined;
    telephoneNumber: number | undefined;
  };
  setUserMiddleSchool: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
}

export interface IUserWrite {
  userWrite: {
    intro: string;
    study_plan: string;
  };
  setUserWrite: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
}

export type GradeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'X';

export interface IGradeElement {
  gradeElement: string[][];
  setElementValue: (current: number, index: number, value: string) => void;
  setAllGrade: (current: number, grade: string) => void;
  setWriteValue: (e: InputType, current: number, index: number) => void;
}

export type ModalType = '' | 'CANCEL_SUBMIT' | 'SIGN_OUT' | 'SEARCH_ADDRESS';

export interface IModalState {
  modalState: ModalType;
  setModalState: (modalState: ModalType) => void;
}
