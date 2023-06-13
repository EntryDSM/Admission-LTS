import { Input } from '@team-entry/design_system';
import GradeWraper from '../GradeWraper';
import { useGradeElement } from '../../../hooks/useStore';
import { InputType } from '../../../interface/type';

const WriteAttendence = () => {
  const { gradeElement, setWriteValue } = useGradeElement();
  return (
    <>
      <GradeWraper title="결석">
        <Input
          type="number"
          width={230}
          placeholder="결석 횟수"
          value={gradeElement[3][0]}
          onChange={(e: InputType) => setWriteValue(e, 3, 0)}
          unit="일"
        />
      </GradeWraper>
      <GradeWraper title="지각">
        <Input
          type="number"
          width={230}
          placeholder="지각 횟수"
          value={gradeElement[3][1]}
          onChange={(e: InputType) => setWriteValue(e, 3, 1)}
          unit="회"
        />
      </GradeWraper>
      <GradeWraper title="조퇴">
        <Input
          type="number"
          width={230}
          placeholder="조퇴 횟수"
          value={gradeElement[3][2]}
          onChange={(e: InputType) => setWriteValue(e, 3, 2)}
          unit="회"
        />
      </GradeWraper>
      <GradeWraper title="결과">
        <Input
          type="number"
          width={230}
          placeholder="결과 횟수"
          value={gradeElement[3][3]}
          onChange={(e: InputType) => setWriteValue(e, 3, 3)}
          unit="일"
        />
      </GradeWraper>
      <GradeWraper title="미인정 환산 결석">
        <Input
          type="number"
          width={230}
          placeholder="미인정 환산 결석 횟수"
          value={gradeElement[3][4]}
          onChange={(e: InputType) => setWriteValue(e, 3, 4)}
          unit="일"
        />
      </GradeWraper>
    </>
  );
};

export default WriteAttendence;
