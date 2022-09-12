import React, { useEffect } from "react";
import styled from "styled-components";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadSearch } from "../actions/searchAction";

import MovieCard from "../components/MovieCard";

const Search = () => {
    const query = window.location.pathname.split("/")[2];

    // Fetch movies
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSearch(query));
    }, [dispatch, query]);
    // Get that data back
    const searched = useSelector((state) => state.search);

    return (
        <StyledSearch>
            <h2>Results</h2>
            <div className="searched-movies">
                {searched
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 10)
                    .map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
            </div>
        </StyledSearch>
    );
};

const StyledSearch = styled.div`
    margin-top: 70px;
    background-color: black;
    color: white;

    h2 {
        margin: 1rem 3rem;
        color: white;
        font-family: "Josefin Sans", sans-serif;
        font-size: 40px;
        line-height: 50px;
        text-align: center;
    }

    .searched-movies {
        display: grid;
        grid-template-columns: repeat(5, 1fr);

        @media (max-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 425px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

export default Search;
