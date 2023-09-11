import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplicationPage from './pages/Application';
import NotFound from './pages/NotFound';
import { Cookies } from 'react-cookie';

export const Router = () => {
  const cookie = new Cookies();
  const accessToken = cookie.get('access_token');
  const refreshToken = cookie.get('refresh_token');
  useEffect(() => {
    if (!accessToken || !refreshToken) {
      alert('로그인 후 이용 가능합니다');
      window.location.href = 'https://auth.entrydsm.hs.kr/login?redirect_url=https://apply.entrydsm.hs.kr';
    }
  }, [accessToken, refreshToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<ApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
