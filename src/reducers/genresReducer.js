const initState = [];

const genresReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_GENRES":
            return action.payload.genres;
        default:
            return state;
    }
};

export default genresReducer;