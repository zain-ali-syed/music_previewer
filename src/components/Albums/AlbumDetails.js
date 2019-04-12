import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from '../AudioPlayer';
import api from '../../api';


class AlbumDetails extends Component {

    state = {
        details:null
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.fetchDetails(id);
    }

    fetchDetails = async (id, type = "album") => {
        const res = await api.fetchDetails(id, type)
        this.setState(() => ({details: res.data}))
    }

    render() {
        if(!this.state.details) return <div>Loading...</div>

        const {artist, title, type, cover_big, genres, genre_id, label,
            release_date, fans, record_type, explicit_lyrics, contributors, duration, nb_tracks, tracks} = this.state.details;

        return (
            <>
                <div className="card row">
                    <div className="card-image col s12 m6" style={{padding: '20px'}}>
                        <img src={cover_big} alt={title}/>
                    </div>
                    <div className="col s12 m6">
                        <div class="card-content">
                            <div className="collection-item avatar">
                                <img src={artist.picture_small} alt="" className="circle" />
                                <span className="title">by <Link to={`/artist/${artist.id}`}>{artist.name}</Link></span>
                            </div>
                            <h4>{title}</h4>
                            <p><i>Label: {label}</i></p>
                            <p><i>Genres: {genres.data.map(({name}) => name)}</i></p>
                            <p><i>Tracks: {nb_tracks}</i></p>
                            <p><i>Duration: {duration}</i></p>
                            <p><i>Release Date: {release_date}</i></p>
                            <p><i>Explicit Lyrics: {explicit_lyrics?"yes":"no"}</i></p>
                            <p><i>Fans: {fans}</i></p>
                        </div>
                        <div class="card-action">

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th><h5>Tracks</h5></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.data.map(({id, title, preview}) => { return(
                                <tr>
                                    <td>{title}</td>
                                    <td style={{width:'40%'}}>
                                       <AudioPlayer preview={preview} />
                                    </td>
                                    <td><Link to={`/track/${id}`}>Details</Link></td>
                                </tr>
                                ) })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}





export default AlbumDetails;
       