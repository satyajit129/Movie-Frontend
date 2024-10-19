import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles from version 11.1.14
import 'swiper/css';
import 'swiper/css/pagination'; // Optional: Only if you are using pagination feature

import './assets/boxicons-2.0.7/css/boxicons.min.css';
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
