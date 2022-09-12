import axios from "axios";
import { trendingMoviesURL, movieListURL } from "../api";

// Action Creator
export const loadMovies = () => async (dispatch) => {
    // Fetch axios
    const trendingData = await axios.get(trendingMoviesURL());
    const upcomingListData = await axios.get(movieListURL("upcoming"));
    const popularListData = await axios.get(movieListURL("popular"));
    const topListData = await axios.get(movieListURL("top_rated"));
    const latestListData = await axios.get(movieListURL("latest"));
    const nowListData = await axios.get(movieListURL("now_playing"));


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
        type: "FETCH_LATEST",
        payload: {
            latest: latestListData.data.results,
        },
    });
    dispatch({
        type: "FETCH_NOW_PLAYING",
        payload: {
            now_playing: nowListData.data.results,
        },
    });
};
