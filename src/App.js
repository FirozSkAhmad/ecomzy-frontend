import './index.css'
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Cart } from './pages/Cart';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { Login } from "./pages/Login"
import Protected from './components/Protected';

const App = () => {
  return (
    <div className='wrapper'>
      <Navbar />
      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    element: < App />,
    path: "/",
    children: [
      {
        element: <Protected cmp={<Home />} />,
        path: '/'
      },
      {
        element: <Protected cmp={<Cart />} />,
        path: 'cart'
      },
      {
        element: <Protected cmp={<Login />} />,
        path: 'login'
      },
      {
        element: <Protected cmp={<SignUp />} />,
        path: 'signup'
      }
    ]
  }
])

export default appRouter;
