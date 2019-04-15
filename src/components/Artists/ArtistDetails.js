import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router'
import Loader from '../Loader';
import api from '../../api';


class ArtistDetails extends Component {

    state = {
        details:null,
        albums: [],
        relatedArtists: []
    }

    componentDidMount() {

        this.props.history.listen((location, action) => {
            this.setState({details: null}); 
            const id = Number(location.pathname.split("/")[2])
            this.fetchDetails(id);
        });

        this.fetchDetails(this.props.match.params.id);
    }
    
    fetchDetails = async (id) => {
       
       //three api calls - one to get artist and one to get albums and one to get similar artists
       const artistPromise =  api.fetchDetails(id, "artist");
       const albumsPromise =  api.fetchAlbums(id);
       const relatedArtistsPromise =  api.fetchRelatedArtists(id);

       const [artist, albums, relatedArtists] = await Promise.all([artistPromise, albumsPromise, relatedArtistsPromise]);
       this.setState(() => ({details:artist.data, albums:albums.data.data, relatedArtists:relatedArtists.data.data}))
    }

    displaySimilarArtists = () => {
        const relatedArtists = this.state.relatedArtists;

        return relatedArtists.map(({id, name, picture_small})                                               => 
                 <div className="chip grey darken-1">
                 <img src={picture_small} alt="Contact Person" />
                 <Link to={`/artist/${id}`}><span className="white-text">{name}</span></Link>
                 </div>
        )
    }

    render() {
        if(!this.state.details) return <Loader />

        const {id, name, picture_big, nb_album, nb_fan } = this.state.details;

        return (
            <>
                <div className="card row">
                    <div className="card-image col s12 m6" style={{padding: '20px'}}>
                        <img src={picture_big} alt={name}/>
                    </div>
                    <div className="col s12 m6">
                        <div class="card-content">
                            <h4>{name}</h4>
                            <p><i>Albums: {nb_album}</i></p>
                            <p><i>Fans: {nb_fan}</i></p>
                        </div>
                        <div class="card-action">
                        <h6>Similar Artists</h6>
                            {this.displaySimilarArtists()}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th><h5>Albums by {name}</h5></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.albums.map(({id, title, cover_small}) => {
                                        return (<tr>
                                            <td className="avatar">
                                                <img src={cover_small} alt="" className="circle" />
                                            </td>
                                             <td>{title}</td>
                                            <td style={{width: '40%'}}><Link to={`/album/${id}`}>View Tracks</Link></td>
                                        </tr>
                                        )
                                })}
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}





export default withRouter(ArtistDetails);
       