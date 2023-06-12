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
  setUserType: (e: InputType) => void;
  setAllValues: <T>(initialForm: T) => void;
}

export interface IUserInfo {
  userInfo: {
    img: string;
    name: string;
    sex: string;
    birthday: string;
    blackExam: string;
    parent_name: string;
    parent_tel: string;
    telephone_number: string;
  };
  setUserInfo: (e: InputType) => void;
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
}
