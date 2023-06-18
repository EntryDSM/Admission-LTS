import styled from '@emotion/styled';
import { Button, Input, theme } from '@team-entry/design_system';
import ApplicationContent from './ApplicationContent';
import { useUserMiddleSchool } from '../../store/useUserMiddleSchool';

const UserMiddleSchool = () => {
  const { userMiddleSchool, setUserMiddleSchool } = useUserMiddleSchool();
  return (
    <_ApplicationWrapper>
      <ApplicationContent grid={2} title="중학교 이름">
        <Input
          type="text"
          placeholder="중학교 이름"
          name="name"
          value={userMiddleSchool.name}
          onChange={setUserMiddleSchool}
          width={230}
        />
        <div style={{ width: '70px', marginLeft: '20px' }}>
          <Button color="black" kind="outlined" onClick={() => console.log('click')}>
            검색
          </Button>
        </div>
      </ApplicationContent>
      <ApplicationContent grid={1} title="중학교 학번">
        <Input
          type="number"
          name="studentId"
          value={userMiddleSchool.studentId}
          onChange={setUserMiddleSchool}
          placeholder="중학교 학번"
          width={230}
        />
      </ApplicationContent>
      <ApplicationContent grid={1} title="중학교 전화번호">
        <Input
          type="number"
          name="telephoneNumber"
          value={userMiddleSchool.telephoneNumber}
          onChange={setUserMiddleSchool}
          placeholder="중학교 전화번호"
          width={230}
        />
      </ApplicationContent>
    </_ApplicationWrapper>
  );
};

export default UserMiddleSchool;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
`;
