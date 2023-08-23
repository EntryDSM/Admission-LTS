import { Input } from '@team-entry/design_system';
import GradeWraper from '../GradeWraper';
import { useGradeElement } from '../../../store/useGradeElement';
import { InputType } from '../../../interface/type';

const WriteAttendence = () => {
  const { gradeElement, setWriteValue } = useGradeElement();
  return (
    <>
      <GradeWraper title="미인정 결석">
        <Input
          type="number"
          width={230}
          placeholder="결석 횟수"
          value={gradeElement[4][0]}
          onChange={(e: InputType) => setWriteValue(e, 4, 0)}
          unit="일"
        />
      </GradeWraper>
      <GradeWraper title="미인정 지각">
        <Input
          type="number"
          width={230}
          placeholder="지각 횟수"
          value={gradeElement[4][1]}
          onChange={(e: InputType) => setWriteValue(e, 4, 1)}
          unit="회"
        />
      </GradeWraper>
      <GradeWraper title="미인정 조퇴">
        <Input
          type="number"
          width={230}
          placeholder="조퇴 횟수"
          value={gradeElement[4][2]}
          onChange={(e: InputType) => setWriteValue(e, 4, 2)}
          unit="회"
        />
      </GradeWraper>
      <GradeWraper title="미인정 결과">
        <Input
          type="number"
          width={230}
          placeholder="결과 횟수"
          value={gradeElement[4][3]}
          onChange={(e: InputType) => setWriteValue(e, 4, 3)}
          unit="일"
        />
      </GradeWraper>
      <GradeWraper title="봉사활동 시간">
        <Input
          type="number"
          width={230}
          placeholder="봉사 시간"
          value={gradeElement[5][0]}
          onChange={(e: InputType) => setWriteValue(e, 5, 0)}
          unit="시간"
        />
      </GradeWraper>
    </>
  );
};

export default WriteAttendence;
