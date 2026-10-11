import axios from "axios";
import { genreListURL } from "../api";

// True while the genres request is in flight, so leaving and coming back
// to Home before it finishes does not fetch them a second time
let isLoading = false;

// Action Creator
export const loadGenres = () => async (dispatch, getState) => {
    // Genres never change during a session: fetch them only once
    if (isLoading || getState().genres.length > 0) return;

    isLoading = true;
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
    } finally {
        isLoading = false;
    }
};
