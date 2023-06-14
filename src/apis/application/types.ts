type EducationalStatus = 'PROSPECTIVE_GRADUATE' | 'GRADUATE' | 'QUALIFICATION_EXAM';

type ApplicationType = 'COMMON' | 'MEISTER' | 'SOCIAL';

type ApplicationRemark =
  | 'ONE_PARENT'
  | 'FROM_NORTH'
  | 'MULTICULTURAL'
  | 'BASIC_LIVING'
  | 'LOWEST_INCOME'
  | 'TEEN_HOUSEHOLDER'
  | 'PRIVILEGED_ADMISSION'
  | 'NATIONAL_MERIT'
  | 'PROTECTED_CHILDREN';

export interface IGetUserType {
  educational_status: EducationalStatus;
  application_type: ApplicationType;
  is_daejeon: boolean;
  application_remark: ApplicationRemark;
  graduated_at: string;
  is_out_of_headcount: boolean;
}
