import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Radio, theme, Dropdown } from '@team-entry/design_system';
import { EditUserType, GetUserType } from '@/apis/application';
import ApplicationContent from './ApplicationContent';
import ApplicationFooter from './ApplicationFooter';
import { applicationTypeDateText, applicationTypeGenerator } from '@/constant/translate';
import { useInput } from '@/hooks/useInput';
import { useCombineMutation } from '@/hooks/useCombineMutation';
import { sliceString } from '@/utils/SliceString';
import { generateNumberArray } from '@/utils/GenerateNumberArray';
import { ICurrnettype, IUserTypeParams } from '@/interface/type';

const UserType = ({ current, setCurrent }: ICurrnettype) => {
  const date = new Date();
  const {
    form: userType,
    onChange: changeUserType,
    setForm: setUserType,
  } = useInput<IUserTypeParams>({
    applicationType: '',
    isDaejeon: undefined,
    educationalStatus: '',
    graduatedAt: [(date.getFullYear() + 1).toString(), '01'],
    applicationRemark: null,
    isOutOfHeadcount: false,
  });

  const { data } = GetUserType();
  const { mutateAsync } = EditUserType();

  useEffect(() => {
    data &&
      setUserType({
        applicationType: data.applicationType,
        isDaejeon: String(data.isDaejeon),
        educationalStatus: data.educationalStatus,
        // graduatedAt: sliceString(data.graduatedAt, [4, 2]),
        graduatedAt: [''], // api graduatedAt 누락됨. 임시 데이터
        applicationRemark: data.applicationRemark || '',
        isOutOfHeadcount: data.isOutOfHeadcount,
      });
  }, [data]);

  const { combinedMutations } = useCombineMutation();

  const onNextClick = () => {
    combinedMutations(
      [
        () =>
          mutateAsync({
            applicationType: userType.applicationType,
            isDaejeon: userType.isDaejeon === 'true',
            educationalStatus: userType.educationalStatus,
            isOutOfHeadcount: false,
            graduatedAt: userType.graduatedAt.join(''),
            applicationRemark: userType.applicationRemark || null,
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
            name="applicationType"
            value="COMMON"
            onClick={changeUserType}
            checked={userType.applicationType === 'COMMON'}
          />
          <Radio
            label="마이스터 인재"
            name="applicationType"
            value="MEISTER"
            onClick={changeUserType}
            checked={userType.applicationType === 'MEISTER'}
          />
          <_RadioWrapper>
            <Radio
              label="사회통합전형"
              name="applicationType"
              value="SOCIAL"
              onClick={changeUserType}
              checked={userType.applicationType === 'SOCIAL'}
            />
          </_RadioWrapper>
        </ApplicationContent>

        <ApplicationContent grid={2} title="지역 선택">
          <Radio
            label="대전"
            name="isDaejeon"
            value="true"
            onClick={changeUserType}
            checked={userType.isDaejeon === 'true'}
          />
          <Radio
            label="전국"
            name="isDaejeon"
            value="false"
            onClick={changeUserType}
            checked={userType.isDaejeon === 'false'}
          />
        </ApplicationContent>

        <ApplicationContent grid={3} title="졸업 구분">
          <Radio
            label="졸업 예정"
            name="educationalStatus"
            value="PROSPECTIVE_GRADUATE"
            onClick={changeUserType}
            checked={userType.educationalStatus === 'PROSPECTIVE_GRADUATE'}
          />
          <Radio
            label="졸업"
            name="educationalStatus"
            value="GRADUATE"
            onClick={changeUserType}
            checked={userType.educationalStatus === 'GRADUATE'}
          />
          <Radio
            label="검정고시"
            name="educationalStatus"
            value="QUALIFICATION_EXAM"
            onClick={changeUserType}
            checked={userType.educationalStatus === 'QUALIFICATION_EXAM'}
          />
        </ApplicationContent>

        <ApplicationContent grid={2} title={applicationTypeDateText[userType.educationalStatus]}>
          <Dropdown
            className="graduatedAt"
            width={85}
            value={userType.graduatedAt[0]}
            onChange={(year) => setUserType({ ...userType, graduatedAt: [year, userType.graduatedAt[1]] })}
            options={generateNumberArray(2010, date.getFullYear() + 1)}
            unit="년"
          />
          <Dropdown
            className="graduatedAt"
            width={85}
            value={userType.graduatedAt[1]}
            onChange={(month) => setUserType({ ...userType, graduatedAt: [userType.graduatedAt[0], month] })}
            options={generateNumberArray(1, 12)}
            unit="월"
          />
        </ApplicationContent>
        <ApplicationContent grid={3} title="특기사항">
          <Radio
            label="해당없음"
            name="applicationRemark"
            value=""
            onClick={changeUserType}
            checked={userType.applicationRemark === ''}
          />
          <Radio
            label="국가 유공자"
            name="applicationRemark"
            value="NATIONAL_MERIT"
            onClick={changeUserType}
            checked={userType.applicationRemark === 'NATIONAL_MERIT'}
          />
          <Radio
            label="특례 입학 대상"
            name="applicationRemark"
            value="PRIVILEGED_ADMISSION"
            onClick={changeUserType}
            checked={userType.applicationRemark === 'PRIVILEGED_ADMISSION'}
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
