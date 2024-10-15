import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper components
import 'swiper/swiper.min.css'; // Import Swiper CSS from the new path
import './assets/boxicons-2.0.7/css/boxicons.min.css'; // Your other styles
import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import AppRoutes from './config/Routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
