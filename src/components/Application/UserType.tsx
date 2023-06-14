import styled from '@emotion/styled';
import { Radio, theme, Dropdown } from '@team-entry/design_system';
import ApplicationContent from './ApplicationContent';
import { useUserType } from '../../hooks/useStore';
import { generateNumberArray } from '../../utils/GenerateNumberArray';
import { GetUserType } from '../../apis/application';
import { useEffect } from 'react';

const UserType = () => {
  const { userType, setUserType, setAllValues, setDropdown } = useUserType();
  const { data } = GetUserType();

  useEffect(() => {
    if (data) {
      setAllValues({ ...userType, data });
    }
  }, []);

  return (
    <_ApplicationWrapper>
      <ApplicationContent grid={3} title="전형 선택">
        <Radio
          label="일반"
          name="application_type"
          value="COMMON"
          onClick={setUserType}
          isChecked={userType.application_type === 'COMMON'}
        />
        <Radio
          label="마이스터 인재"
          name="application_type"
          value="MEISTER"
          onClick={setUserType}
          isChecked={userType.application_type === 'MEISTER'}
        />
        <_RadioWrapper>
          <Radio
            label=""
            name="application_type"
            value="기초생활수급자"
            onClick={setUserType}
            isChecked={
              userType.application_type !== 'COMMON' &&
              userType.application_type !== 'MEISTER' &&
              userType.application_type !== ''
            }
          />
          <Dropdown
            className="application_type"
            width={145}
            disabled={
              userType.application_type === 'COMMON' ||
              userType.application_type === 'MEISTER' ||
              userType.application_type === ''
            }
            onChange={(e) => {
              setAllValues({ ...userType, application_type: e });
            }}
            options={[
              '기초생활수급자',
              '한부모가족',
              '소년소녀가장',
              '차상위계층',
              '북한이탈주민',
              '다문화가정',
              '보호대상아동',
            ]}
          />
        </_RadioWrapper>
      </ApplicationContent>

      <ApplicationContent grid={2} title="지역 선택">
        <Radio
          label="대전"
          name="is_daejeon"
          value="true"
          onClick={setUserType}
          isChecked={userType.is_daejeon === 'true'}
        />
        <Radio
          label="전국"
          name="is_daejeon"
          value="false"
          onClick={setUserType}
          isChecked={userType.is_daejeon === 'false'}
        />
      </ApplicationContent>

      <ApplicationContent grid={3} title="졸업 구분">
        <Radio
          label="졸업 예정"
          name="educational_status"
          value="PROSPECTIVE_GRADUATE"
          onClick={setUserType}
          isChecked={userType.educational_status === 'PROSPECTIVE_GRADUATE'}
        />
        <Radio
          label="졸업"
          name="educational_status"
          value="GRADUATE"
          onClick={setUserType}
          isChecked={userType.educational_status === 'GRADUATE'}
        />
        <Radio
          label="검정고시"
          name="educational_status"
          value="QUALIFICATION_EXAM"
          onClick={setUserType}
          isChecked={userType.educational_status === 'QUALIFICATION_EXAM'}
        />
      </ApplicationContent>

      <ApplicationContent grid={2} title="졸업 연월" placeholder="졸업 예정자의 경우 졸업 예정월만 선택해주세요">
        <Dropdown
          className="graduated_at"
          width={85}
          onChange={(e) => setDropdown(0, e, 'graduated_at')}
          options={generateNumberArray(2020, 2030)}
          unit="년"
        />
        <Dropdown
          className="graduated_at"
          width={85}
          onChange={(e) => setDropdown(1, e, 'graduated_at')}
          options={generateNumberArray(1, 12)}
          unit="월"
        />
      </ApplicationContent>

      <ApplicationContent
        grid={2}
        title="특기 사항"
        required={false}
        placeholder="특기사항에 해당하시는 항목이 있으면 체크해주세요"
      >
        <Radio
          label="국가 유공자"
          name="application_remark"
          value="PRIVILEGED_ADMISSION"
          onClick={setUserType}
          isChecked={userType.application_remark === 'PRIVILEGED_ADMISSION'}
        />
        <Radio
          label="특례 입학 대상"
          name="application_remark"
          value="SPECIAL"
          onClick={setUserType}
          isChecked={userType.application_remark === 'SPECIAL'}
        />
      </ApplicationContent>
    </_ApplicationWrapper>
  );
};

export default UserType;

const _ApplicationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60rem;
  border-top: 1px solid ${theme.color.black600};
  border-bottom: 1px solid ${theme.color.black600};
  margin-top: 49px;
`;

const _RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
