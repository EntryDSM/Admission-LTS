import { createBrowserRouter } from 'react-router-dom';
import ApplicationPage from './pages/Application';
import NotFound from './pages/NotFound';

const Router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '',
        element: <ApplicationPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default Router;
