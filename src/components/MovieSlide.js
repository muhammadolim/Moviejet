import React, { useEffect } from "react";
import styled from "styled-components";
import { imageMovieURL } from "../api";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGenres } from "../actions/genresAction";
import { Link } from "react-router-dom";

const MovieSlide = ({ movie }) => {
    // Fetch movies
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadGenres());
    }, [dispatch]);
    // Get that data back
    const genres = useSelector((state) => state.genres);

    const get_genre_name = (id) => {
        for (var genre of genres) {
            if (id === genre.id) return genre.name;
        }
    };

    return (
        <Slider>
            <Link to={`/movie/${movie.id}`}>
                <div className="info">
                    <h1>{movie.title}</h1>
                    <div className="genres">
                        {movie.genre_ids.map((genre_id) => (
                            <p key={genre_id}>{get_genre_name(genre_id)}</p>
                        ))}
                    </div>
                </div>
                <div className="shadow"></div>
                <img
                    src={imageMovieURL("w1280", movie.backdrop_path)}
                    alt={movie.title}
                />
            </Link>
        </Slider>
    );
};

const Slider = styled.div`
    position: relative;
    margin-top: 50px;

    .info {
        display: flex;
        align-items: center;
        position: absolute;
        color: white;
        bottom: 5%;
        left: 5%;
        z-index: 2;

        .genres {
            border-left: 3px solid white;
            margin-left: 20px;
        }

        h1 {
            font-size: 80px;
            @media (max-width: 960px) {
                font-size: 50px;
            }
            @media (max-width: 460px) {
                font-size: 30px;
            }
        }

        p {
            margin: 1rem;
            font-size: 30px;

            @media (max-width: 460px) {
                font-size: 20px;
            }
        }
    }

    .shadow {
        position: absolute;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 -100px 300px #000;
    }

    img {
        width: 100%;
        height: 80vh;
        object-fit: cover;
    }
`;

export default MovieSlide;
