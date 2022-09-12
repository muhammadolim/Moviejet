import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faJetFighterUp,
    faJetFighter,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    const [query, setQuery] = useState("");
    const [timeoutId, updateTimeoutId] = useState();

    const navigate = useNavigate();

    const onTextChange = (e) => {
        clearTimeout(timeoutId);
        var timeout = setTimeout(() => {
            navigate(`/search/${e.target.value}`);
            setQuery(e.target.value);
        }, 800);
        updateTimeoutId(timeout);
    };

    const logoHandler = () => {
        document.getElementById("input-search").value = "";
    };

    return (
        <StyledNav>
            <div className="logo">
                <Link to="/" className="logo-link" onClick={logoHandler}>
                    <h2>Moviejet</h2>
                </Link>
                <FontAwesomeIcon className="icon" icon={faJetFighter} />
            </div>
            <div className="search">
                <input
                    id="input-search"
                    placeholder="Search..."
                    type="text"
                    onChange={onTextChange}
                />
                <Link to={`/search/${query}`}>
                    <FontAwesomeIcon className="icon" icon={faJetFighterUp} />
                </Link>
            </div>
        </StyledNav>
    );
};

const StyledNav = styled.div`
    background-color: black;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 5;
    padding: 1rem 3rem;
    display: flex;
    justify-content: space-between;

    @media (max-width: 700px) {
        padding: 1rem;
    }

    .logo {
        display: flex;
        align-items: center;

        .logo-link {
            text-decoration: none;
        }

        h2 {
            color: white;
            font-family: "Josefin Sans", sans-serif;
            font-size: 30px;
            line-height: 40px;
        }
    }

    .search {
        text-align: end;

        input {
            font-size: 25px;
            padding: 4px 10px 5px 10px;
            border-radius: 5px;
            font-weight: bold;

            @media (max-width: 700px) {
                font-size: 20px;
                width: 50%;
            }

            ::-webkit-input-placeholder {
                font-size: 20px;
                font-weight: normal;
            }
        }
    }

    .icon {
        color: white;
        font-size: 25px;
        margin-left: 12px;
        cursor: pointer;
    }
`;

export default Nav;
