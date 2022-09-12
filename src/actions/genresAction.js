import axios from "axios";
import { genreListURL } from "../api";

// Action Creator
export const loadGenres = () => async (dispatch) => {
    // Fetch axios
    const genresData = await axios.get(genreListURL());

    dispatch({
        type: "FETCH_GENRES",
        payload: {
            genres: genresData.data.genres,
        },
    });
};
