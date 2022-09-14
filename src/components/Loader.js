import React from "react";
import styled from "styled-components";

const Loader = () => {
    return (
        <StyledLoader>
            <div className="filmstrip"></div>
            <p className="text">loading</p>
        </StyledLoader>
    );
};

const StyledLoader = styled.div`
    margin-top: 150px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text {
        margin: 5px auto;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0px;
        font-size: 14px;
        font-family: Arial, sans-serif;
        font-weight: bold;
    }
    .filmstrip {
        position: relative;
        width: 60px;
        height: 70px;
        background: white;
        z-index: -1;
        &:before,
        &:after {
            content: "";
            position: absolute;
            height: 120%;
            border-left: 6px dashed black;
            animation: roll 20ms infinite;
        }
        &:before {
            left: 5px;
        }
        &:after {
            right: 5px;
        }
    }

    @keyframes roll {
        0% {
            top: 0px;
        }
        100% {
            top: -15px;
        }
    }
`;

export default Loader;
