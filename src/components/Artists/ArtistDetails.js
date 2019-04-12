import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

import api from '../../api';


class ArtistDetails extends Component {

    state = {
        details:null,
        albums: []
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.fetchDetails(id);
    }
    
    fetchDetails = async (id) => {
       //two api calls - one to get artist and one to get albums
       const artistPromise =  api.fetchDetails(id, "artist");
       const albumsPromise =  api.fetchAlbums(id);

       const [artist, albums] = await Promise.all([artistPromise, albumsPromise]);
       this.setState(() => ({details:artist.data, albums:albums.data.data}))
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

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <table className="striped">
                            <thead>
                                <tr>
                                    <th><h5>Albums</h5></th>
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





export default ArtistDetails;
       