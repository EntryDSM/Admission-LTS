// import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplicationPage from './pages/Application';
import NotFound from './pages/NotFound';
import Header from './components/Header';

export const Router = () => {
  // useEffect(() => {
  //   alert('원서접수가 마감되었습니다.');
  //   window.location.href = 'https://www.entrydsm.hs.kr';
  // }, []);

  // useEffect(() => {
  //   window.location.href = 'https://auth.entrydsm.hs.kr/login?redirect_url=https://apply.entrydsm.hs.kr';
  //   if (!accessToken && !refreshToken) {
  //   }
  // }, [accessToken, refreshToken]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<ApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
