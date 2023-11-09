import { useInput } from '../../hooks/useInput';
import styled from '@emotion/styled';
import { Button, Text, theme } from '@team-entry/design_system';
import { colorKeyOfType } from '@team-entry/design_system/build/style/color';
import { ReactNode } from 'react';
import { Input } from '@team-entry/design_system';

interface IDefaultModal {
  color: colorKeyOfType;
  title: string;
  subTitle: ReactNode;
  button?: ReactNode;
  onClick?: () => void;
  input?: boolean;
}

const DefaultModal = ({ color, title, subTitle, input, button, onClick }: IDefaultModal) => {
  const {
    form: inputState,
    onChange: changeInput,
  } = useInput<{inputString:string}>({
    inputString:'',
  });

  return (
    <>
      <Text size="title1" color={color} margin={[60, 0, 20, 0]}>
        {title}
      </Text>
      <_ModalLine />
      <Text size="body2" color="black700" margin={[20, 0, 30, 0]}>
        {subTitle}
      </Text>
      <InputButtonBox>
        {input && (
          <Input width={260} type='text' placeholder='확인했습니다' onChange={changeInput} name='inputString'/>
        )}
        {button && onClick && (
          <Button kind="contained" color="orange" onClick={onClick} disabled={inputState.inputString === '확인했습니다' || !input ? false : true}>
            {button}
          </Button>
        )}
      </InputButtonBox>
    </>
  );
};

export default DefaultModal;

const _ModalLine = styled.div`
  width: 150px;
  height: 1px;
  background-color: ${theme.color.black100};
`;

const InputButtonBox = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:30px;
  margin-bottom:30px;
`;