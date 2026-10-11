const initState = {
    query: null,
    results: [],
    hasError: false,
};

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_SEARCH":
            return action.payload;
        case "LOADING_SEARCH":
            return initState;
        default:
            return state;
    }
};

export default searchReducer;
