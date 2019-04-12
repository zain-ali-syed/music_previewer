import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const SERVER_URL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com";
const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};

class TrackDetails extends Component {

    state = {
        details:null
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.fetchDetails(id);
    }
    
    fetchDetails = (id) => {
        axios.get(`${SERVER_URL}/track/${id}`, { headers})
           .then(res => this.setState(() => ({details: res.data})))
           .catch(err => console.log("err ", err))
    }

    render() {
        if(!this.state.details) return <div>Loading...</div>

        const {title, album, artist, bpm, duration, link, preview, explicit_lyrics, release_date, track_position} = this.state.details;
        return (
            <div>
                <div className="card row">
                        <div className="card-image col s12 m6" style={{padding:'20px'}}>
                            <img src={album.cover_xl} />
                        </div>
                        <div className="col s12 m6">
                            <div class="card-content">
                                <div class="collection-item avatar">
                                    <img src={artist.picture_small} alt="" className="circle" />
                                    <span className="title">by <Link to={`/artist/${artist.id}`}>{artist.name}</Link></span>
                                </div>
                                <h4>{title}</h4>
                                <p><i>Album: <Link to={`/album/${album.id}`}>{album.title}</Link></i></p>
                                <p><i>Duration: {duration} secs</i></p>
                                <p><i>BPM: {bpm}</i></p>
                                <p><i>Release Date: {release_date}</i></p>
                                <p><i>Explicit Lyrics: {explicit_lyrics?"yes":"no"}</i></p>
                                <p><i>Track Position: {track_position}</i></p>
                                <p><i>Deezer URL: {link}</i></p>
                            </div>
                            <div class="card-action">
                                <audio controls>
                                    <source src={preview} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                </div>
          </div>
        );
    }
}

export default TrackDetails;
