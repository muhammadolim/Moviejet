import React, { useEffect } from "react";
import styled from "styled-components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../actions/moviesAction";

// Components
import MovieSlide from "../components/MovieSlide";
import MovieList from "../components/MovieList";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
    // Fetch movies
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMovies());
    }, [dispatch]);
    // Get that data back
    const { trending } = useSelector((state) => state.movies);

    return (
        <StyledHome>
            <Swiper
                className="swiper-main"
                modules={[Autoplay, Navigation, Pagination]}
                initialSlide={1}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                navigation
                pagination={{ clickable: true }}
            >
                {trending.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieSlide movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <MovieList listName="Now Playing" />
            <MovieList listName="Upcoming" />
            <MovieList listName="Popular" />
            <MovieList listName="Top Rated" />
        </StyledHome>
    );
};

const StyledHome = styled.div`
    .swiper-main {
        background-color: black;

        .swiper-button-prev,
        .swiper-button-next {
            color: white;
            top: 0;
            padding: 0 4rem;
            height: 100%;

            @media (max-width: 768px) {
                padding: 0 2rem;
            }
        }

        .swiper-pagination-bullet {
            background-color: white;
        }
    }
`;

export default Home;
