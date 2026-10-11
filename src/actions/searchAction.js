import axios from "axios";
import { searchMovieURL } from "../api";

// Increases on every search so a slow response for an older query cannot
// overwrite the results of the newest one
let latestRequest = 0;

// Action Creator
export const loadSearch = (query) => async (dispatch) => {
    const request = ++latestRequest;

    dispatch({
        type: "LOADING_SEARCH",
    });

    try {
        // Fetch axios
        const searchData = await axios.get(searchMovieURL(query));
        if (request !== latestRequest) return;

        dispatch({
            type: "FETCH_SEARCH",
            payload: {
                query,
                results: searchData.data.results,
                hasError: false,
            },
        });
    } catch (error) {
        if (request !== latestRequest) return;

        dispatch({
            type: "FETCH_SEARCH",
            payload: {
                query,
                results: [],
                // A failed request is not "no results": let the user retry
                hasError: true,
            },
        });
    }
};
