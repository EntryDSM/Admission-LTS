import { Input } from '@team-entry/design_system';
import GradeWraper from '../GradeWraper';
import { InputType } from '../../../interface/type';
import { useGradeElement } from '../../../store/useGradeElement';

const WriteVolunteer = () => {
  const { gradeElement, setWriteValue } = useGradeElement();
  return (
    <>
      <GradeWraper title="1학년 봉사활동 시간">
        <Input
          type="number"
          width={230}
          placeholder="봉사 시간"
          value={gradeElement[5][0]}
          onChange={(e: InputType) => setWriteValue(e, 5, 0)}
          unit="시간"
        />
      </GradeWraper>
      <GradeWraper title="2학년 봉사활동 시간">
        <Input
          type="number"
          width={230}
          placeholder="봉사 시간"
          value={gradeElement[5][1]}
          onChange={(e: InputType) => setWriteValue(e, 5, 1)}
          unit="시간"
        />
      </GradeWraper>
      <GradeWraper title="3학년 봉사활동 시간" subTitle="(졸업예정자의 경우 9월 30일까지만)">
        <Input
          type="number"
          width={230}
          placeholder="봉사 시간"
          value={gradeElement[5][2]}
          onChange={(e: InputType) => setWriteValue(e, 5, 2)}
          unit="시간"
        />
      </GradeWraper>
    </>
  );
};

export default WriteVolunteer;
