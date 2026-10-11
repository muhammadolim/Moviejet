import React from "react";
import styled from "styled-components";

// Shown when a request fails for a reason other than "not found"
// (offline, timeout, server error), so the user can try again
const ErrorMessage = ({ message, onRetry, className }) => {
    return (
        <StyledError className={className}>
            <p>{message}</p>
            <button type="button" onClick={onRetry}>
                Retry
            </button>
        </StyledError>
    );
};

const StyledError = styled.div`
    margin: 150px 3rem 2rem;
    text-align: center;
    color: white;

    p {
        margin-bottom: 1rem;
        font-family: "Josefin Sans", sans-serif;
        font-size: 30px;
        line-height: 40px;
    }

    button {
        padding: 6px 20px;
        border: 2px solid white;
        border-radius: 5px;
        background-color: transparent;
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;

        &:hover {
            background-color: white;
            color: black;
        }
    }
`;

export default ErrorMessage;
