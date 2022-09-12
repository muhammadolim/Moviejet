import React from "react";
import styled from "styled-components";
import { imageMovieURL } from "../api";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <StyledCard>
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={imageMovieURL("w500", `${movie.poster_path}`)}
                    alt={movie.title}
                />
            </Link>
        </StyledCard>
    );
};

const StyledCard = styled.div`
    img {
        width: 100%;
        transition: 0.3s;
        opacity: 0.82;

        &:hover {
            opacity: 1;
            cursor: pointer;
        }
    }
`;

export default MovieCard;
