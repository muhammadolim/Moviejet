const initState = [];

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_SEARCH":
            return action.payload;
        default:
            return state;
    }
};

export default searchReducer;
