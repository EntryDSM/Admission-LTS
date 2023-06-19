type EducationalStatus = 'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM';

type ApplicationType = 'COMMON' | 'MEISTER' | 'SOCIAL';

export type ApplicationRemark =
  | 'ONE_PARENT'
  | 'FROM_NORTH'
  | 'MULTICULTURAL'
  | 'BASIC_LIVING'
  | 'LOWEST_INCOME'
  | 'TEEN_HOUSEHOLDER'
  | 'PRIVILEGED_ADMISSION'
  | 'NATIONAL_MERIT'
  | 'PROTECTED_CHILDREN';

export interface IPatchUserType {
  application_type: ApplicationType | '';
  is_daejeon: boolean | undefined;
  educational_status: EducationalStatus | '';
  graduated_at: string;
  application_remark: ApplicationRemark | null;
  is_out_of_headcount: boolean;
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

export interface IPatchUserIntro {
  content: string;
}

export interface IPatchUserPlan {
  content: string;
}
