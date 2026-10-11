import axios from "axios";
import { trendingMoviesURL, movieListURL } from "../api";

// Action Creator
export const loadMovies = () => async (dispatch, getState) => {
    // The lists rarely change: fetch them once, and never twice at a time
    const { isLoading, isLoaded } = getState().movies;
    if (isLoading || isLoaded) return;

    dispatch({
        type: "LOADING_MOVIES",
    });

    // Fetch all lists in parallel; one failing list must not hide the rest
    const [trending, upcoming, popular, topRated, nowPlaying] =
        await Promise.allSettled([
            axios.get(trendingMoviesURL()),
            axios.get(movieListURL("upcoming")),
            axios.get(movieListURL("popular")),
            axios.get(movieListURL("top_rated")),
            axios.get(movieListURL("now_playing")),
        ]);

    if (trending.status === "fulfilled") {
        dispatch({
            type: "FETCH_MOVIES",
            payload: {
                trending: trending.value.data.results.slice(0, 5),
            },
        });
    }
    if (upcoming.status === "fulfilled") {
        dispatch({
            type: "FETCH_UPCOMING",
            payload: {
                upcoming: upcoming.value.data.results.reverse(),
            },
        });
    }
    if (popular.status === "fulfilled") {
        dispatch({
            type: "FETCH_POPULAR",
            payload: {
                popular: popular.value.data.results,
            },
        });
    }
    if (topRated.status === "fulfilled") {
        dispatch({
            type: "FETCH_TOP_RATED",
            payload: {
                top_rated: topRated.value.data.results,
            },
        });
    }
    if (nowPlaying.status === "fulfilled") {
        dispatch({
            type: "FETCH_NOW_PLAYING",
            payload: {
                now_playing: nowPlaying.value.data.results,
            },
        });
    }

    const results = [trending, upcoming, popular, topRated, nowPlaying];
    dispatch({
        type: "MOVIES_SETTLED",
        payload: {
            // Nothing loaded at all (e.g. offline): Home offers a retry
            hasError: results.every((result) => result.status === "rejected"),
        },
    });
};
