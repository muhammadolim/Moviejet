import { combineReducers } from "redux";

import moviesReducer from "./moviesReducer";
import genresReducer from "./genresReducer";
import detailsReducer from "./detailsReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
    movies: moviesReducer,
    genres: genresReducer,
    details: detailsReducer,
    search: searchReducer,
});

export default rootReducer;
