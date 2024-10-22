import React, { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import { useNavigate } from 'react-router';
import { Autoplay } from 'swiper/modules';

const HeroSlide = () => {

    const [movieItems, setMovieItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(1, 4));
                // console.log(response);
            } catch {
                // console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Correctly update active index
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        <HeroSlideItem item={item} className={`${activeIndex === i ? 'active' : ''}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HeroSlide;
