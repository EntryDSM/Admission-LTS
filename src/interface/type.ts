export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'X';

export interface GradeElement {
  gradeElement: string[][];
  setElementValue: (current: number, index: number, value: string) => void;
  setAllGrade: (current: number, grade: string) => void;
}

export interface UserType {
  userType: {
    application_type: string;
    is_daejeon: string;
    educational_status: string;
    graduated_at: string;
    application_remark: string;
  };
  setUserType: (name: string, value: string) => void;
}

export interface UserInfo {
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
  setUserInfo: (name: string, value: string) => void;
}

export interface userWrite {
  userWrite: {
    intro: string;
    study_plan: string;
  };
  setUserWrite: (name: string, value: string) => void;
}