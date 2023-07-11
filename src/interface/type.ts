export type InputType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | React.MouseEvent<HTMLInputElement, MouseEvent>;

export interface IApplicationFooterProps {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
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
  dropboxTmp: string;
  setUserType: (e: InputType) => void;
  setAllValues: <T>(initialForm: T, tmp?: string) => void;
  setDropdown: (index: number, value: string, type: string) => void;
}

export interface IUserPhoto {
  photo_file_name: File | null;
  setUserPhoto: (photo_file_name: File) => void;
}

export interface IUserBlackExam {
  ged_average_score: string;
  setUserGedAverageScore: (ged_average_score: string) => void;
}

export interface IUserInfo {
  userInfo: {
    sex: string;
    birthday: string;
    parent_name: string;
    parent_tel: string;
    address: string;
    detail_address: string;
    post_code: string;
  };
  yearArray: string[];
  setUserInfo: (e: InputType) => void;
  setTelephone: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
  setDropdown: (index: number, value: string, type: string) => void;
}

export interface IPatchUserMiddleSchool {
  student_number: string;
  school_code: string;
  school_tel: string;
}

export interface IUserMiddleSchool {
  userMiddleSchool: IPatchUserMiddleSchool;
  setUserMiddleSchool: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
}

export interface IUserMiddleSchoolName {
  schoolName: string;
  setSchoolName: (name: string) => void;
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
  | 'SUCCESS';

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
