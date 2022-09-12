import axios from "axios";
import { searchMovieURL } from "../api";

// Action Creator
export const loadSearch = (query) => async (dispatch) => {
    // Fetch axios
    const searchData = await axios.get(searchMovieURL(query));

    dispatch({
        type: "FETCH_SEARCH",
        payload: searchData.data.results,
    });
};
