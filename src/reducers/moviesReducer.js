const initState = {
    trending: [],
    upcoming: [],
    popular: [],
    top_rated: [],
    latest: [],
    now_playing: [],
};

const moviesReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_MOVIES":
            return {
                ...state,
                trending: action.payload.trending,
            };
        case "FETCH_UPCOMING":
            return {
                ...state,
                upcoming: action.payload.upcoming,
            };
        case "FETCH_POPULAR":
            return {
                ...state,
                popular: action.payload.popular,
            };
        case "FETCH_TOP_RATED":
            return {
                ...state,
                top_rated: action.payload.top_rated,
            };
        case "FETCH_LATEST":
            return {
                ...state,
                latest: action.payload.latest,
            };
        case "FETCH_NOW_PLAYING":
            return {
                ...state,
                now_playing: action.payload.now_playing,
            };
        default:
            return { ...state };
    }
};

export default moviesReducer;
