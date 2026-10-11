import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = ({ message = "Page not found" }) => {
    return (
        <StyledNotFound>
            <h2>{message}</h2>
            <Link to="/">Back to home</Link>
        </StyledNotFound>
    );
};

const StyledNotFound = styled.div`
    margin-top: 150px;
    text-align: center;
    color: white;

    h2 {
        margin: 1rem 3rem;
        font-family: "Josefin Sans", sans-serif;
        font-size: 40px;
        line-height: 50px;
    }

    a {
        color: white;
        font-size: 20px;
    }
`;

export default NotFound;
