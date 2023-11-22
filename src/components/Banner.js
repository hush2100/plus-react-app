import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/request";

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    //여러 영화 중 하나의 ID를 가져오기
    console.log(request);
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    //특정영화의 상세정보 가져오기
    const {data : movieDetail} = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos"},
    });
    setMovie(movieDetail);  
  }
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }
  return (
    <header 
      className="banner"
      style={{
        backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}  
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner_buttons">
          {movie?.videos?.results[0]?.key &&
            <button type="button" className="banner__button play" onClick={() => {}}>
              Play
            </button>
          }
        </div>
        <p className="banner__description">
          {truncate(movie.overview, 100)}
        </p>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  )
} 

export default Banner;