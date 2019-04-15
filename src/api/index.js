import axios from 'axios';

//using heroku as proxy server. Do not do this in production
const SERVER_URL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com";
const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};

 const fetchTracks = (searchTerm = "Hanz Zimmer", pageIndex) => {
    return axios.get(`${SERVER_URL}/search?q=${searchTerm}&index=${pageIndex}`, {headers})
 };

 const fetchDetails = (id, type) => {
    return axios.get(`${SERVER_URL}/${type}/${id}`, {headers})
 };

 const fetchAlbums = (id) => {
    return axios.get(`${SERVER_URL}/artist/${id}/albums`,{headers})
 };

 const fetchRelatedArtists = (id) => {
    return axios.get(`${SERVER_URL}/artist/${id}/related`,{headers})
 };

export default {fetchTracks, fetchDetails, fetchAlbums, fetchRelatedArtists}

