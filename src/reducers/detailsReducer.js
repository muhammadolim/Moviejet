const initState = {
    data: {},
    videos: [],
    isLoading: true,
};

const detailReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_DETAILS":
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };
        case "GET_VIDEOS":
            return {
                ...state,
                videos: action.payload,
                isLoading: false,
            };
        case "LOADING_DETAILS":
            return {
                ...state,
                isLoading: true,
            };
        default:
            return { ...state };
    }
};

export default detailReducer;
