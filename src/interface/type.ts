export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'X';

export interface IElement {
  id: number;
  title: string;
  subTitle?: string;
  type: 'grade' | 'input';
  placeholder?: string;
  unit?: string;
  grade?: Grade;
  value?: string;
}

export interface UserTypeValue {
  application_type: string;
  is_daejeon: string;
  educational_status: string;
  graduated_at: string;
  application_remark: string;
}

export interface UserInfoValue {
  img: string;
  name: string;
  sex: string;
  birthday: string;
  blackExam: string;
  parent_name: string;
  parent_tel: string;
  telephone_number: string;
}

export interface UserWriteValue {
  intro: string;
  study_plan: string;
}
