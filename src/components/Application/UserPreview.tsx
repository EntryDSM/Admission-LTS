import { useState } from 'react';
import styled from '@emotion/styled';
import { Icon, Skeleton, Text } from '@team-entry/design_system';
import Pdf from '../Preview';
import { GetPdfPreview } from '../../apis/pdf';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import { SubmitPdf } from '../../apis/application';
import DefaultModal from '../Modal/DefaultModal';

interface IUserPreview {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}

const UserPreview = ({ setCurrent }: IUserPreview) => {
  const { data, isLoading } = GetPdfPreview();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const { modalState, close } = useModal();

  const { mutate } = SubmitPdf();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <_Wrapper>
      <_Title>
        <Text size="body1" color="realWhite">
          입학원서 미리보기
        </Text>
      </_Title>
      <_PDFWrapper>
        <_PDF>
          {/* <Skeleton width={595} height={842} isLoaded={isLoading} /> */}
          <Pdf preview={data} pageNumber={pageNumber} onDocumentLoadSuccess={onDocumentLoadSuccess} />
        </_PDF>
        {!isLoading && (
          <_PDFButtonWrapper>
            <_PDFButton onClick={() => setPageNumber((prev) => prev - 1)} disabled={pageNumber <= 1}>
              <Icon icon="LeftArrow" color={pageNumber <= 1 ? 'black300' : 'realBlack'} cursor="pointer" />
            </_PDFButton>
            {pageNumber} of {numPages}
            <_PDFButton onClick={() => setPageNumber((prev) => prev + 1)} disabled={pageNumber >= numPages}>
              <Icon icon="RightArrow" color={pageNumber >= numPages ? 'black300' : 'realBlack'} cursor="pointer" />
            </_PDFButton>
          </_PDFButtonWrapper>
        )}
      </_PDFWrapper>
      {modalState === 'SUBMIT_MODAL' && (
        <Modal onClose={close} closeAble={true}>
          <DefaultModal
            color="black900"
            title="제출"
            subTitle={'원서를 제출하면 수정이 불가합니다 \n 제출하시겠습니까?'}
            button="제출"
            onClick={mutate}
          />
        </Modal>
      )}
      {modalState === 'SUCCESS' && (
        <Modal onClose={close} closeAble={true}>
          <DefaultModal
            color="check"
            title="완료 !"
            subTitle={
              '원서 접수에 성공했습니다 \n 지원해주셔서 감사합니다 \n\n pdf 다운로드는 마이페이지를 확인해주세요'
            }
            button="확인"
            onClick={() => alert('마이페이지로 가기 추가')}
          />
        </Modal>
      )}
      {modalState === 'ERROR' && (
        <Modal onClose={close} closeAble={true}>
          <DefaultModal
            color="error"
            title="오류"
            subTitle={'원서 제출 중 오류가 발생했습니다 \n 관리자에게 문의 바랍니다'}
            button="확인"
            onClick={() => setCurrent(0)}
          />
        </Modal>
      )}
    </_Wrapper>
  );
};

export default UserPreview;

export const _Wrapper = styled.div`
  width: 60rem;
  margin: 49px 0;
`;

const _Title = styled.div`
  display: flex;
  align-items: center;
  width: 60rem;
  height: 4rem;
  background-color: #36373c;
  padding-left: 48px;
`;

const _PDFWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 60rem;
  height: 71rem;
  background-color: #646569;
`;

const _PDF = styled.div`
  height: 820px;
  overflow: hidden;
`;

const _PDFButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 200px;
  height: 50px;
  background-color: white;
  border-radius: 5px;
`;

const _PDFButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: white;
`;
