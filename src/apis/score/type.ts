export interface IPatchUserBlackExam {
  ged_average_score: number;
}

export interface IGetUserBlackExam {
  average_score: string;
}

export interface IPatchGraduation {
  volunteer_time: number;
  day_absence_count: number;
  lecture_absence_count: number;
  lateness_count: number;
  early_leave_count: number;
  korean_grade: string;
  social_grade: string;
  history_grade: string;
  math_grade: string;
  science_grade: string;
  english_grade: string;
  tech_and_home_grade: string;
}

export interface ISelectGradeElement {
  korean_grade: string[];
  social_grade: string[];
  history_grade: string[];
  math_grade: string[];
  science_grade: string[];
  english_grade: string[];
  tech_and_home_grade: string[];
}

export interface IWriteGradeElement {
  volunteer_time: number;
  day_absence_count: number;
  lecture_absence_count: number;
  lateness_count: number;
  early_leave_count: number;
}
