import styled from '@emotion/styled';
import { Button, Input, theme } from '@team-entry/design_system';
import ApplicationContent from './ApplicationContent';
import { useUserMiddle } from '../../hooks/useStore';

const UserMiddle = () => {
  const { userMiddle, setUserMiddle } = useUserMiddle();
  return (
    <_ApplicationWrapper>
      <ApplicationContent grid={2} title="중학교 이름">
        <Input type="text" placeholder="중학교" value={userMiddle.name} onChange={setUserMiddle} width={230} />
        <Button color="black" kind="outlined" onClick={() => console.log('click')} />
      </ApplicationContent>
      <ApplicationContent grid={1} title="중학교 학번">
        <Input type="number" value={userMiddle.studentId} onChange={setUserMiddle} placeholder="중학교" width={230} />
      </ApplicationContent>
      <ApplicationContent grid={1} title="중학교 전화번호">
        <Input
          type="number"
          value={userMiddle.telephoneNumber}
          onChange={setUserMiddle}
          placeholder="중학교"
          width={230}
        />
      </ApplicationContent>
    </_ApplicationWrapper>
  );
};

export default UserMiddle;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
`;
