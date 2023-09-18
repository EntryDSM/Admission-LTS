import styled from '@emotion/styled';
import { Radio, theme, Dropdown } from '@team-entry/design_system';
import ApplicationContent from './ApplicationContent';
import { generateNumberArray } from '../../utils/GenerateNumberArray';
import { ICurrnettype, IUserTypeParams } from '../../interface/type';
import ApplicationFooter from './ApplicationFooter';
import { useInput } from '../../hooks/useInput';
import { EditUserType, GetUserType } from '../../apis/application';
import { useEffect } from 'react';
import { sliceString } from '../../utils/SliceString';

const UserType = ({ current }: ICurrnettype) => {
  const {
    form: userType,
    onChange: changeUserType,
    setForm: setUserType,
  } = useInput<IUserTypeParams>({
    application_type: '',
    is_daejeon: undefined,
    educational_status: '',
    graduated_at: ['2024', '01'],
    application_remark: null,
    is_out_of_headcount: false,
  });

  const { data } = GetUserType();
  const { mutate } = EditUserType();

  useEffect(() => {
    data && setUserType({ ...data, graduated_at: sliceString(data.graduated_at, [4, 2]) });
  }, [data]);

  return (
    <>
      <_ApplicationWrapper>
        <ApplicationContent grid={3} title="전형 선택">
          <Radio
            label="일반"
            name="application_type"
            value="COMMON"
            onClick={changeUserType}
            isChecked={userType.application_type === 'COMMON'}
          />
          <Radio
            label="마이스터 인재"
            name="application_type"
            value="MEISTER"
            onClick={changeUserType}
            isChecked={userType.application_type === 'MEISTER'}
          />
          <_RadioWrapper>
            <Radio
              label="사회통합전형"
              name="application_type"
              value="SOCIAL"
              onClick={changeUserType}
              isChecked={userType.application_type === 'SOCIAL'}
            />
          </_RadioWrapper>
        </ApplicationContent>

        <ApplicationContent grid={2} title="지역 선택">
          <Radio
            label="대전"
            name="is_daejeon"
            value="true"
            onClick={changeUserType}
            isChecked={userType.is_daejeon === true}
          />
          <Radio
            label="전국"
            name="is_daejeon"
            value="false"
            onClick={changeUserType}
            isChecked={userType.is_daejeon === false}
          />
        </ApplicationContent>

        <ApplicationContent grid={3} title="졸업 구분">
          <Radio
            label="졸업 예정"
            name="educational_status"
            value="PROSPECTIVE_GRADUATE"
            onClick={changeUserType}
            isChecked={userType.educational_status === 'PROSPECTIVE_GRADUATE'}
          />
          <Radio
            label="졸업"
            name="educational_status"
            value="GRADUATE"
            onClick={changeUserType}
            isChecked={userType.educational_status === 'GRADUATE'}
          />
          <Radio
            label="검정고시"
            name="educational_status"
            value="QUALIFICATION_EXAM"
            onClick={changeUserType}
            isChecked={userType.educational_status === 'QUALIFICATION_EXAM'}
          />
        </ApplicationContent>

        <ApplicationContent grid={2} title="졸업 연월" placeholder="졸업 예정자의 경우 졸업 예정월만 선택해주세요">
          <Dropdown
            className="graduated_at"
            width={85}
            value={userType.graduated_at[0]}
            onChange={(year) => setUserType({ ...userType, graduated_at: [year, userType.graduated_at[0]] })}
            options={generateNumberArray(2010, 2030)}
            unit="년"
          />
          <Dropdown
            className="graduated_at"
            width={85}
            value={userType.graduated_at[1]}
            onChange={(month) => setUserType({ ...userType, graduated_at: [userType.graduated_at[0], month] })}
            options={generateNumberArray(1, 12)}
            unit="월"
          />
        </ApplicationContent>
        <ApplicationContent grid={3} title="특기사항">
          <Radio
            label="해당없음"
            name="application_remark"
            value=""
            onClick={changeUserType}
            isChecked={userType.application_remark === ''}
          />
          <Radio
            label="국가 유공자"
            name="application_remark"
            value="NATIONAL_MERIT"
            onClick={changeUserType}
            isChecked={userType.application_remark === 'NATIONAL_MERIT'}
          />
          <Radio
            label="특례 입학 대상"
            name="application_remark"
            value="PRIVILEGED_ADMISSION"
            onClick={changeUserType}
            isChecked={userType.application_remark === 'PRIVILEGED_ADMISSION'}
          />
        </ApplicationContent>
      </_ApplicationWrapper>
      <ApplicationFooter
        current={current}
        isDisabled={false}
        nextClick={() => {
          mutate({
            ...userType,
            graduated_at: userType.graduated_at.join(''),
            application_remark: userType.application_remark || null,
          });
        }}
      />
    </>
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
