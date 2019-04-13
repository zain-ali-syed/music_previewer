import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import api from '../../api';
import AudioPlayer from '../AudioPlayer';
import moment from 'moment';
import  momentDurationFormatSetup from "moment-duration-format";



class TrackDetails extends Component {

    state = {
        details:null
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.fetchDetails(id);
    }
    
    fetchDetails = async (id, type = "track") => {
        const res = await api.fetchDetails(id, type)
        this.setState(() => ({details: res.data}))
    }

    formatTime = (seconds) => {
        seconds = parseInt(seconds) //because moment js dont know to handle number in string format
        return Math.floor(moment.duration(seconds,'seconds').asHours()) + ':' + moment.duration(seconds,'seconds').minutes() + ':' + moment.duration(seconds,'seconds').seconds();
    }

    render() {
        if(!this.state.details) return <Loader />

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
                                <p><i>Duration: {moment.duration(duration, "seconds").format()}</i></p>
                                <p><i>BPM: {bpm}</i></p>
                                <p><i>Release Date: {release_date}</i></p>
                                <p><i>Explicit Lyrics: {explicit_lyrics?"yes":"no"}</i></p>
                                <p><i>Track Position: {track_position}</i></p>
                                <p><i>Deezer URL: <a href={link} target='_blank'>{link}</a></i></p>
                            </div>
                            <div class="card-action">
                                <AudioPlayer preview={preview}/>
                            </div>
                        </div>
                </div>
          </div>
        );
    }
}

export default TrackDetails;
