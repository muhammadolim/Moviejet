const initState = {
    id: null,
    data: {},
    videos: [],
    isLoading: true,
    hasError: false,
};

const detailReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_DETAILS":
            return {
                ...state,
                data: action.payload.data,
                videos: action.payload.videos,
                isLoading: false,
                hasError: false,
            };
        case "LOADING_DETAILS":
            return {
                ...state,
                id: action.payload.id,
                isLoading: true,
                hasError: false,
            };
        case "DETAILS_FAILED":
            return {
                ...state,
                data: {},
                videos: [],
                isLoading: false,
                hasError: true,
            };
        default:
            return state;
    }
};

export default detailReducer;
