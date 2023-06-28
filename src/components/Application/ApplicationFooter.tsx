import styled from '@emotion/styled';
import { Button, theme } from '@team-entry/design_system';
import { IApplicationFooterProps } from '../../interface/type';
import useClickFooter from '../../hooks/useClickFooter';

const ApplicationFooter = ({ current, setCurrent, gradeCurrent, setGradeCurrent }: IApplicationFooterProps) => {
  const progress = [0, 1, 2, 3, 4, 5];
  const { onClickPlus, onClickMinus, onClickPatch, isDisabled } = useClickFooter({
    current,
    setCurrent,
    gradeCurrent,
    setGradeCurrent,
  });

  return (
    <_Footer>
      <Button
        color="black"
        kind="outlined"
        disabled={current === 0}
        onClick={() => {
          onClickMinus[current - 1]();
        }}
      >
        이전
      </Button>
      <_Progress>
        {progress.map((step) => (
          <_ProgressStep key={step} isStep={step === current} />
        ))}
      </_Progress>
      {current !== 5 ? (
        <Button
          color="orange"
          kind="contained"
          onClick={() => {
            onClickPlus[current](), onClickPatch[current]();
          }}
          disabled={isDisabled}
        >
          다음
        </Button>
      ) : (
        <Button color="orange" kind="contained" onClick={() => console.log('asdf')}>
          완료
        </Button>
      )}
    </_Footer>
  );
};

export default ApplicationFooter;

const _Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60rem;
  margin-top: 45px;
  margin-bottom: 100px;
`;

const _Progress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 38px;
`;

const _ProgressStep = styled.div<{ isStep: boolean }>`
  width: ${({ isStep }) => (isStep ? 22 : 14)}px;
  height: ${({ isStep }) => (isStep ? 22 : 14)}px;
  border-radius: ${({ isStep }) => (isStep ? 11 : 7)}px;
  background-color: ${({ isStep }) => (isStep ? theme.color.orange400 : theme.color.black200)};
`;
