import axios from "axios";
import { trendingMoviesURL, movieListURL } from "../api";

// Action Creator
export const loadMovies = () => async (dispatch) => {
    try {
        // Fetch all lists in parallel instead of one after another
        const [
            trendingData,
            upcomingListData,
            popularListData,
            topListData,
            nowListData,
        ] = await Promise.all([
            axios.get(trendingMoviesURL()),
            axios.get(movieListURL("upcoming")),
            axios.get(movieListURL("popular")),
            axios.get(movieListURL("top_rated")),
            axios.get(movieListURL("now_playing")),
        ]);

        dispatch({
            type: "FETCH_MOVIES",
            payload: {
                trending: trendingData.data.results.slice(0, 5),
            },
        });
        dispatch({
            type: "FETCH_UPCOMING",
            payload: {
                upcoming: upcomingListData.data.results.reverse(),
            },
        });
        dispatch({
            type: "FETCH_POPULAR",
            payload: {
                popular: popularListData.data.results,
            },
        });
        dispatch({
            type: "FETCH_TOP_RATED",
            payload: {
                top_rated: topListData.data.results,
            },
        });
        dispatch({
            type: "FETCH_NOW_PLAYING",
            payload: {
                now_playing: nowListData.data.results,
            },
        });
    } catch (error) {
        console.error("Failed to load movies", error.message);
    }
};
