import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadSearch } from "../actions/searchAction";

import MovieCard from "../components/MovieCard";

const Search = () => {
    const { query } = useParams();

    // Fetch movies
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadSearch(query));
    }, [dispatch, query]);
    // Get that data back
    const search = useSelector((state) => state.search);
    // Hide the previous query's results while the new ones load
    const loaded = search.query === query;
    const searched = loaded ? search.results : [];

    return (
        <StyledSearch>
            <h2>Results</h2>
            {loaded && searched.length === 0 && (
                <p className="no-results">No results for "{query}"</p>
            )}
            <div className="searched-movies">
                {[...searched]
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

    .no-results {
        margin: 2rem 3rem;
        color: #aaa;
        font-size: 18px;
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
