import axios from "axios";
import { genreListURL } from "../api";

// Action Creator
export const loadGenres = () => async (dispatch, getState) => {
    // Genres never change during a session: fetch them only once
    if (getState().genres.length > 0) return;

    try {
        // Fetch axios
        const genresData = await axios.get(genreListURL());

        dispatch({
            type: "FETCH_GENRES",
            payload: {
                genres: genresData.data.genres,
            },
        });
    } catch (error) {
        console.error("Failed to load genres", error.message);
    }
};
