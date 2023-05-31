import { Text, theme } from '@team-entry/design_system';
import styled from '@emotion/styled';
import { GradeType } from '../../interface/type';
import { useGradeElement } from '../../hooks/useStore';
import { gradeArr } from '../../constant/grade';

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
    <_Wrapper>
      <_Texts>
        <Text color="black900" size="title1">
          {title}
        </Text>
        <Text margin={['left', 10]} color="black500" size="body3">
          {subTitle}
        </Text>
      </_Texts>
      <_Buttons>
        {gradeArr.map((item: GradeType) => {
          return (
            <_Button key={item} onClick={() => setElementValue(index, current, item)} isClick={item === grade}>
              {item}
            </_Button>
          );
        })}
      </_Buttons>
    </_Wrapper>
  );
};

export default SelectGrade;

const _Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
  width: 100%;
  border-top: 1px solid ${theme.color.black100};
  padding: 25px 10px;
  &:last-child {
    border-bottom: 1px solid ${theme.color.black100};
  }
`;

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

const _Texts = styled.div`
  display: flex;
  align-items: center;
`;
