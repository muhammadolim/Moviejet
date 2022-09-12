import React, { useEffect } from "react";
import styled from "styled-components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../actions/moviesAction";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// Components
import MovieCard from "./MovieCard";

const MovieList = ({ listName }) => {
    // Fetch movies
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMovies());
    }, [dispatch]);
    // Get that data back
    const { upcoming, popular, top_rated, now_playing } = useSelector(
        (state) => state.movies
    );

    const getList = (listName) => {
        switch (listName) {
            case "Now Playing":
                return now_playing;
            case "Upcoming":
                return upcoming;
            case "Popular":
                return popular;
            case "Top Rated":
                return top_rated;
            default:
                break;
        }
    };

    return (
        <StyledList>
            <h2>{listName}</h2>

            <Swiper
                className="swiper-list"
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={2}
                slidesOffsetBefore={96}
                slidesOffsetAfter={96}
                navigation
                breakpoints={{
                    1024: {
                        slidesPerView: 5,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                }}
            >
                {getList(listName).map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </StyledList>
    );
};

const StyledList = styled.div`
    background-color: black;
    padding: 1rem 0;

    @media (max-width: 960px) {
        padding: 0;
    }

    h2 {
        margin: 1rem 3rem;
        color: white;
        font-family: "Josefin Sans", sans-serif;
        font-size: 40px;
        line-height: 50px;

        @media (max-width: 960px) {
            font-size: 25px;
            line-height: 30px;
        }
    }

    .swiper-list {
        .swiper-button-prev,
        .swiper-button-next {
            color: white;
            top: 20px;
            padding: 0 3rem;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);

            @media (max-width: 768px) {
                padding: 0 2rem;
            }
        }
        .swiper-button-next {
            right: 0;
        }
        .swiper-button-prev {
            left: 0;
        }
    }
`;

export default MovieList;
