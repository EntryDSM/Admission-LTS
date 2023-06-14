export type InputType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | React.MouseEvent<HTMLInputElement, MouseEvent>;

export interface IUserType {
  userType: {
    application_type: string;
    is_daejeon: string;
    educational_status: string;
    graduated_at: string;
    application_remark: string;
  };
  graduatedAtArray: string[];
  setUserType: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
  setDropdown: (index: number, value: string, type: string) => void;
}

export interface IUserInfo {
  userInfo: {
    name: string;
    sex: string;
    birthday: string;
    blackExam: string;
    parent_name: string;
    parent_tel: string;
    telephone_number: string;
    home_tel: string;
    address: string;
    detail_address: string;
    post_code: string;
  };
  yearArray: string[];
  setUserInfo: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
  setDropdown: (index: number, value: string, type: string) => void;
}

export interface IUserPhoto {
  photo: string;
  setUserPhoto: (photo: string) => void;
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
