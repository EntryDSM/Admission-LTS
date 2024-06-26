export interface IPatchUserBlackExam {
  ged_average_score: number;
}

export interface IGetUserBlackExam {
  average_score: string;
}

export interface IPatchGraduation {
  volunteerTime: number;
  absenceDayCount: number;
  lectureAbsenceCount: number;
  latenessCount: number;
  earlyLeaveCount: number;
  koreanGrade: string;
  socialGrade: string;
  historyGrade: string;
  mathGrade: string;
  scienceGrade: string;
  englishGrade: string;
  techAndHomeGrade: string;
}

export interface ISelectGradeElement {
  koreanGrade: string[];
  socialGrade: string[];
  historyGrade: string[];
  mathGrade: string[];
  scienceGrade: string[];
  englishGrade: string[];
  techAndHomeGrade: string[];
}

export interface IWriteGradeElement {
  volunteerTime: number;
  absenceDayCount: number;
  lectureAbsenceCount: number;
  latenessCount: number;
  earlyLeaveCount: number;
}
