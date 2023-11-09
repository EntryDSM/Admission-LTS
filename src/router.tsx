import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import ApplicationPage from './pages/Application';
// import { Cookies } from 'react-cookie';

export const Router = () => {
  useEffect(() => {
    alert('원서접수가 마감되었습니다.');
    window.location.href = 'https://www.entrydsm.hs.kr';
  }, []);

  // const cookie = new Cookies();
  // const refreshToken = cookie.get('refresh_token');
  // const accessToken = cookie.get('access_token');

  // useEffect(() => {
  //   if (!accessToken && !refreshToken) {
  //     window.location.href = 'https://auth.entrydsm.hs.kr/login?redirect_url=https://apply.entrydsm.hs.kr';
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
