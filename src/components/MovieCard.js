import React from "react";
import styled from "styled-components";
import { imageMovieURL } from "../api";
import { Link } from "react-router-dom";

// `sizes` tells the browser how wide the poster is drawn, so it can pick
// the smallest file that is sharp enough: it must match the parent layout
const MovieCard = ({ movie, sizes }) => {
    return (
        <StyledCard>
            <Link to={`/movie/${movie.id}`}>
                {movie.poster_path ? (
                    <img
                        src={imageMovieURL("w342", movie.poster_path)}
                        srcSet={`${imageMovieURL(
                            "w342",
                            movie.poster_path
                        )} 342w, ${imageMovieURL(
                            "w500",
                            movie.poster_path
                        )} 500w`}
                        sizes={sizes}
                        loading="lazy"
                        alt={movie.title}
                    />
                ) : (
                    <div className="no-poster">{movie.title}</div>
                )}
            </Link>
        </StyledCard>
    );
};

const StyledCard = styled.div`
    img,
    .no-poster {
        width: 100%;
        transition: 0.3s;
        opacity: 0.82;

        &:hover {
            opacity: 1;
            cursor: pointer;
        }
    }

    img {
        display: block;
        aspect-ratio: 2 / 3;
    }

    .no-poster {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 2 / 3;
        padding: 1rem;
        background-color: #222;
        color: white;
        text-align: center;
    }
`;

export default MovieCard;
