// Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=d77bd05db014b976998a4dcf362430b4&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api