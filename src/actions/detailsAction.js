import axios from "axios";
import { movieDetailsURL, movieVideosURL } from "../api";

// Increases on every request so a slow response for a movie the user
// already left cannot overwrite the movie they are looking at now
let latestRequest = 0;

export const loadDetails = (id) => async (dispatch) => {
    const request = ++latestRequest;

    dispatch({
        type: "LOADING_DETAILS",
        payload: { id },
    });

    try {
        const [movieDetails, movieVideos] = await Promise.all([
            axios.get(movieDetailsURL(id)),
            axios.get(movieVideosURL(id)),
        ]);
        if (request !== latestRequest) return;

        dispatch({
            type: "GET_DETAILS",
            payload: {
                data: movieDetails.data,
                videos: movieVideos.data.results,
            },
        });
    } catch (error) {
        if (request !== latestRequest) return;

        dispatch({
            type: "DETAILS_FAILED",
        });
    }
};
