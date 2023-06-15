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

export interface IGetUserType {
  application_type: ApplicationType | '';
  is_daejeon: boolean | undefined;
  educational_status: EducationalStatus | '';
  graduated_at: string;
  application_remark: ApplicationRemark | null;
  is_out_of_headcount: boolean;
}