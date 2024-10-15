import React from 'react';
import { Routes as RouterRoutes, Route, Routes } from 'react-router-dom'; // Rename imported Routes to avoid conflict
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';

const AppRoutes = () => { // Rename your component
    return (
        <Routes>
            <Route path='/:category/search/:keyword' element={<Catalog />} />
            <Route path='/:category/:id' element={<Detail />} />
            <Route path='/:category' element={<Catalog />} />
            <Route path='/' element={<Home />} />
        </Routes>
    );
}

export default AppRoutes;
