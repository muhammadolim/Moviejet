import axios from "axios";
import { movieDetailsURL, movieVideosURL } from "../api";

// Increases on every request so a slow response for a movie the user
// already left cannot overwrite the movie they are looking at now
let latestRequest = 0;

export const loadDetails = (id) => async (dispatch, getState) => {
    // Revisiting the movie already in the store: reuse it, no refetch
    const { details } = getState();
    if (details.id === id && !details.isLoading && !details.hasError) return;

    const request = ++latestRequest;

    dispatch({
        type: "LOADING_DETAILS",
        payload: { id },
    });

    // TMDB ids are numbers: anything else can never be a movie
    if (!/^\d+$/.test(id)) {
        dispatch({
            type: "DETAILS_FAILED",
            payload: { notFound: true },
        });
        return;
    }

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
            payload: {
                // Offline, timeouts and server errors can be retried
                notFound: error.response?.status === 404,
            },
        });
    }
};
