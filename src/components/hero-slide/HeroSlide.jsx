import React, { useState, useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import { useNavigate } from 'react-router';
import { Autoplay } from 'swiper/modules';
import { fetchSliders } from '../../service/sliderImage';

const HeroSlide = () => {

    const [movieItems, setMovieItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await fetchSliders();
                // console.log(response);
                setMovieItems(response);
            } catch {
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
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
            >
                {movieItems.map((item, i) => (
                    // console.log('item'),
                    // console.log(item),
                    <SwiperSlide key={i}>
                        <HeroSlideItem
                            item={item}
                            className={`${activeIndex === i ? 'active' : ''}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useNavigate();

    const item = props.item;
    // console.log('item');
    // console.log(item.slider_image_url);
    // console.log(item.thumb_image_url);

    const background = item.slider_image_url;

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.name}</h2>
                    <div className="overview">{item.description}</div>
                    <div className="btns">
                        <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={item.thumb_image_url} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HeroSlide;
