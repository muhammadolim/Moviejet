import React, { useEffect } from "react";
import styled from "styled-components";
import { imageMovieURL } from "../api";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadDetails } from "../actions/detailsAction";

// Tabs
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MovieDetails = () => {
    const movieId = window.location.pathname.match(/(\d+)/)[0];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadDetails(movieId));
    }, [dispatch, movieId]);

    const { data, videos, isLoading } = useSelector((state) => state.details);

    const get_video = (key) => {
        return `https://www.youtube-nocookie.com/embed/${key}`;
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const video_types = [
        "Trailer",
        "Clip",
        "Teaser",
        "Featurette",
        "Behind the Scenes",
    ];

    const get_videos = (type) => {
        return videos.filter((video) => video.type === type);
    };
    const exist_videos = (type) => {
        var arr = get_videos(type);
        if (arr.length === 0) return false;
        else return true;
    };

    return (
        <>
            {isLoading ? (
                <Loader>
                    <div className="filmstrip"></div>
                    <p className="text">loading</p>
                </Loader>
            ) : (
                <StyledDetail>
                    <div className="main">
                        <div className="info">
                            <div className="genres">
                                {data.genres.map((genre) => (
                                    <p key={genre.id}>{genre.name}</p>
                                ))}
                            </div>
                            <div className="title">
                                <h1>{data.title}</h1>
                                <p>{data.tagline}</p>
                            </div>
                            <div className="numbers">
                                <p>
                                    IMDb{" "}
                                    {Math.round(10 * data.vote_average) / 10}
                                </p>
                                <p>
                                    {data.release_date.split("-")[0]}{" "}
                                    {
                                        months[
                                            parseInt(
                                                data.release_date.split("-")[1]
                                            )
                                        ]
                                    }
                                </p>
                                <p>
                                    {data.budget !== 0 && (
                                        <>${data.budget / 1000000} million</>
                                    )}
                                </p>
                            </div>
                        </div>
                        <img
                            src={imageMovieURL("w1280", data.backdrop_path)}
                            alt="background"
                        />
                    </div>

                    <Tabs>
                        <TabList>
                            {video_types.map(
                                (type) =>
                                    exist_videos(type) && (
                                        <Tab key={type}>{type}</Tab>
                                    )
                            )}
                        </TabList>

                        {video_types.map(
                            (type) =>
                                exist_videos(type) && (
                                    <TabPanel key={type}>
                                        {get_videos(type).map((video) => {
                                            return (
                                                <iframe
                                                    key={video.id}
                                                    title={video.name}
                                                    marginHeight={0}
                                                    src={`${get_video(
                                                        video.key
                                                    )}?rel=0`}
                                                    frameBorder="0"
                                                    allow="fullscreen;"
                                                ></iframe>
                                            );
                                        })}
                                    </TabPanel>
                                )
                        )}
                    </Tabs>
                </StyledDetail>
            )}
        </>
    );
};

const StyledDetail = styled.div`
    margin-top: 70px;

    .main {
        position: relative;

        .info {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            color: white;
            top: 40%;
            z-index: 2;
            width: 100%;

            p {
                margin: 1rem;
                font-size: 24px;

                @media (max-width: 800px) {
                    font-size: 20px;
                }
            }

            .genres {
                text-align: end;
                border-right: 3px solid white;
                margin-right: 20px;
            }

            .title {
                text-align: center;
                h1 {
                    font-size: 45px;

                    @media (max-width: 800px) {
                        font-size: 25px;
                    }
                }
                p {
                    margin-bottom: 0;

                    @media (max-width: 800px) {
                        font-size: 18px;
                        margin-left: 0;
                        margin-right: 0;
                    }
                }
            }

            .numbers {
                border-left: 3px solid white;
                margin-left: 20px;

                .icon-voted {
                    width: 1rem;
                    margin-left: 16px;
                }
            }
        }

        img {
            filter: blur(5px) brightness(0.4);
            width: 100%;
            height: 70vh;
            object-fit: cover;
        }
    }

    .react-tabs {
        .react-tabs__tab-list {
            display: flex;
            flex-flow: wrap;
            justify-content: center;

            .react-tabs__tab {
                font-size: 30px;
                margin: 10px;

                @media (max-width: 900px) {
                    font-size: 20px;
                    margin: 5px;
                }

                @media (max-width: 560px) {
                    margin: 0;
                }
            }

            .react-tabs__tab:after {
                height: 0;
            }
        }

        .react-tabs__tab-panel {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;

            @media (max-width: 1400px) {
                grid-template-columns: repeat(2, 1fr);
            }

            @media (max-width: 900px) {
                grid-template-columns: repeat(1, 1fr);
            }

            iframe {
                width: 100%;
                height: 400px;
            }
        }
    }
`;

const Loader = styled.div`
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

export default MovieDetails;
