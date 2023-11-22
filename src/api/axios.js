import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '82c3520a81270651bd1cd6eefb98aa24',
    language: 'ko-KR',
  } 
})

export default instance;