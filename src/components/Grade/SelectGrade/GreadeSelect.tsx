import { theme } from '@team-entry/design_system';
import styled from '@emotion/styled';
import { GradeType } from '../../../interface/type';
import { useGradeElement } from '../../../store/useGradeElement';
import { gradeArr } from '../../../constant/grade';
import GradeWraper from '../GradeWraper';

interface ISelectGrade {
  current: number;
  title: string;
  subTitle?: string;
  placeholder?: string;
  grade?: GradeType;
  index: number;
}

const SelectGrade = ({ title, subTitle, grade, current, index }: ISelectGrade) => {
  const { setElementValue } = useGradeElement();
  return (
    <GradeWraper title={title} subTitle={subTitle}>
      <_Buttons>
        {gradeArr.map((item: GradeType) => {
          return (
            <_Button key={item} onClick={() => setElementValue(index, current, item)} isClick={item === grade}>
              {item}
            </_Button>
          );
        })}
      </_Buttons>
    </GradeWraper>
  );
};

export default SelectGrade;

const _Buttons = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const _Button = styled.div<{ isClick?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50px;
  ${theme.font.title2};
  border: 1px solid ${theme.color.orange500};
  color: ${({ isClick }) => (isClick ? theme.color.realWhite : theme.color.orange500)};
  background-color: ${({ isClick }) => (isClick ? theme.color.orange500 : theme.color.realWhite)};
  cursor: pointer;
`;
