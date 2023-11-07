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
import { applicationTypeDateText, applicationTypeGenerator } from '../../constant/translate';
import { useCombineMutation } from '../../hooks/useCombineMutation';

const UserType = ({ current, setCurrent }: ICurrnettype) => {
  const date = new Date();
  const {
    form: userType,
    onChange: changeUserType,
    setForm: setUserType,
  } = useInput<IUserTypeParams>({
    application_type: '',
    is_daejeon: undefined,
    educational_status: '',
    graduated_at: [(date.getFullYear() + 1).toString(), '01'],
    application_remark: null,
    is_out_of_headcount: false,
  });

  const { data } = GetUserType();
  const { mutateAsync } = EditUserType();

  useEffect(() => {
    data &&
      setUserType({
        application_type: applicationTypeGenerator[data.application_type],
        is_daejeon: String(data.daejeon),
        educational_status: data.educational_status,
        graduated_at: sliceString(data.graduated_at, [4, 2]),
        application_remark: data.application_remark || '',
        is_out_of_headcount: data.out_of_headcount,
      });
  }, [data]);

  const { combinedMutations } = useCombineMutation();

  const onNextClick = () => {
    combinedMutations(
      [
        () =>
          mutateAsync({
            application_type: userType.application_type,
            is_daejeon: userType.is_daejeon === 'true',
            educational_status: userType.educational_status,
            is_out_of_headcount: false,
            graduated_at: userType.graduated_at.join(''),
            application_remark: userType.application_remark || null,
          }),
      ],
      () => setCurrent(current + 1),
    );
  };

  return (
    <>
      <_ApplicationWrapper>
        <ApplicationContent grid={3} title="전형 선택">
          <Radio
            label="일반"
            name="application_type"
            value="COMMON"
            onClick={changeUserType}
            checked={userType.application_type === 'COMMON'}
          />
          <Radio
            label="마이스터 인재"
            name="application_type"
            value="MEISTER"
            onClick={changeUserType}
            checked={userType.application_type === 'MEISTER'}
          />
          <_RadioWrapper>
            <Radio
              label="사회통합전형"
              name="application_type"
              value="SOCIAL"
              onClick={changeUserType}
              checked={userType.application_type === 'SOCIAL'}
            />
          </_RadioWrapper>
        </ApplicationContent>

        <ApplicationContent grid={2} title="지역 선택">
          <Radio
            label="대전"
            name="is_daejeon"
            value="true"
            onClick={changeUserType}
            checked={userType.is_daejeon === 'true'}
          />
          <Radio
            label="전국"
            name="is_daejeon"
            value="false"
            onClick={changeUserType}
            checked={userType.is_daejeon === 'false'}
          />
        </ApplicationContent>

        <ApplicationContent grid={3} title="졸업 구분">
          <Radio
            label="졸업 예정"
            name="educational_status"
            value="PROSPECTIVE_GRADUATE"
            onClick={changeUserType}
            checked={userType.educational_status === 'PROSPECTIVE_GRADUATE'}
          />
          <Radio
            label="졸업"
            name="educational_status"
            value="GRADUATE"
            onClick={changeUserType}
            checked={userType.educational_status === 'GRADUATE'}
          />
          <Radio
            label="검정고시"
            name="educational_status"
            value="QUALIFICATION_EXAM"
            onClick={changeUserType}
            checked={userType.educational_status === 'QUALIFICATION_EXAM'}
          />
        </ApplicationContent>

        <ApplicationContent grid={2} title={applicationTypeDateText[userType.educational_status]}>
          <Dropdown
            className="graduated_at"
            width={85}
            value={userType.graduated_at[0]}
            onChange={(year) => setUserType({ ...userType, graduated_at: [year, userType.graduated_at[1]] })}
            options={generateNumberArray(2010, date.getFullYear() + 1)}
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
            checked={userType.application_remark === ''}
          />
          <Radio
            label="국가 유공자"
            name="application_remark"
            value="NATIONAL_MERIT"
            onClick={changeUserType}
            checked={userType.application_remark === 'NATIONAL_MERIT'}
          />
          <Radio
            label="특례 입학 대상"
            name="application_remark"
            value="PRIVILEGED_ADMISSION"
            onClick={changeUserType}
            checked={userType.application_remark === 'PRIVILEGED_ADMISSION'}
          />
        </ApplicationContent>
      </_ApplicationWrapper>
      <ApplicationFooter current={current} isDisabled={false} nextClick={onNextClick} />
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
