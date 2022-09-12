import axios from "axios";
import { movieDetailsURL, movieVideosURL } from "../api";

export const loadDetails = (id) => async (dispatch) => {
    dispatch({
        type: "LOADING_DETAILS",
    });

    const movieDetails = await axios.get(movieDetailsURL(id));
    const movieVideos = await axios.get(movieVideosURL(id));

    dispatch({
        type: "GET_DETAILS",
        payload: movieDetails.data,
    });
    dispatch({
        type: "GET_VIDEOS",
        payload: movieVideos.data.results,
    });
};
