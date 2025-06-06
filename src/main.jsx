import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import CartPage from './pages/Cart/Cart.jsx';
import ContextProvider from './Context/ContextProvider.jsx';
import Shop from './pages/Shop/Shop.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Product from './pages/Product/Product.jsx';
import Events from './pages/Events/Events.jsx';
import ScrollLayout from './components/ScrollLayout/ScrollLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: 'about', element: <About /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: 'product/:product', element: <Product /> },
      { path: 'events', element: <Events /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ScrollToTop /> */}
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
