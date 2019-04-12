import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


class TrackItem extends Component {

    state = {
        audioPlaying: false
    }

    //Define as static so only one audioPlayer is created
    static audioPlayer;

    playAudio = (audio, id) => {
        TrackItem.audioPlayer && TrackItem.audioPlayer.pause();
        TrackItem.audioPlayer = new Audio(audio)
        TrackItem.audioPlayer.play();
        TrackItem.audioPlayer.onended = this.pauseAudio;
        this.setState(() => ({audioPlaying: true}));
        this.props.playTrack(id)
    }

    pauseAudio = () => {
        TrackItem.audioPlayer.pause();
        this.setState(() => ({audioPlaying: false}))
    }

    getDetails = () => {
        const {id, type, history} = this.props;
        history.push(`/${type}/${id}`)
    }
    

    render() {

        const {id, title, link, preview, artist, album, type, playingTrackId} = this.props;
        const {audioPlaying} = this.state;


        return (
            <div className="col s12 m3">
                <div className="card">
                    <div className="card-image">
                        <img src={album.cover_medium} alt="track_image"/>
                        <a className="btn-floating halfway-fab waves-effect waves-light red" >
                            { 
                                (!audioPlaying || playingTrackId !== id) ? 
                                <i className="material-icons" onClick={() => this.playAudio(preview, id)}>play_arrow</i>
                                : <i className="material-icons" onClick={() => this.pauseAudio(preview)}>pause</i>
                            }
                        </a>
                    </div>
                    <div className="card-content">
                        <p className="truncate"><b>{title}</b></p>
                        <p className="truncate"><b>Artist: </b><Link to={`/artist/${artist.id}`}>{artist.name}</Link></p>
                        <p className="truncate"><b>Album: </b><Link to={`/album/${album.id}`}>{album.title}</Link></p>
                    </div>
                    <div class="card-action">
                        <a href="#!" onClick={this.getDetails}>Track details</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ playingTrackId: state.playingTrackId })
const mapDispatchToProps = dispatch => ({ playTrack: trackId => dispatch({ type: 'PLAY_TRACK', trackId })})

  export default connect(mapStateToProps, mapDispatchToProps)(TrackItem);



