export type EducationalStatus = 'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM' | '';

export type ApplicationType = 'COMMON' | 'MEISTER' | 'SOCIAL';

export type getApplicationType = '일반전형' | '마이스터전형' | '사회통합전형';

export type ApplicationRemark =
  | 'ONE_PARENT'
  | 'FROM_NORTH'
  | 'MULTICULTURAL'
  | 'BASIC_LIVING'
  | 'LOWEST_INCOME'
  | 'TEEN_HOUSEHOLDER'
  | 'PRIVILEGED_ADMISSION'
  | 'NATIONAL_MERIT'
  | 'PROTECTED_CHILDREN'
  | '';

export interface IGetUSerType {
  educationalStatus: EducationalStatus;
  applicationType: ApplicationType;
  applicationRemark: ApplicationRemark;
  graduatedAt: string;
  isDaejeon: boolean;
  isOutOfHeadcount: boolean;
  graduated: boolean;
}

export interface IPatchUserType {
  applicationType: ApplicationType | '';
  isDaejeon: boolean | undefined;
  educationalStatus: EducationalStatus | '';
  graduatedAt: string;
  applicationRemark: ApplicationRemark | null;
  isOutOfHeadcount: boolean;
}

export interface IPatchUserInfo {
  name: string;
  sex: string;
  birthday: string;
  parent_name: string;
  parent_tel: string;
  telephone_number: string;
  address: string;
  detail_address: string;
  post_code: string;
  photo_file_name: string;
}

export interface IPatchUserPhoto {
  photo: File;
}

export interface IUserMiddleSchool {
  name: string;
  sex: string;
  birthday: string;
  school_code: string;
  school_tel: string;
  school_name: string;
  student_number: string;
  parent_name: string;
  telephone_number: string;
  parent_tel: string;
  address: string;
  detail_address: string;
  post_code: string;
  photo_file_name: string;
}

export interface IPatchUserIntroduce {
  content: string;
}

export interface IPatchUserPlan {
  content: string;
}
