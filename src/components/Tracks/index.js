import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import axios from 'axios';
import TrackItem from './TrackItem';

const SERVER_URL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com";
const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'};

//Bug with deezer API - for any search term for e.g 'Pink Floyd' the TOTAL number of tracks found for pink floyd
// changes when the index (paging) parameter changes.

//This will cause issues with pagination as the total number of tracks found for any given artist should be a CONSTANT.

class Tracks extends Component {

    state = {
        tracks:[],
        nextPage:"",
        prevPage:"",
        currentPage:0,
        pageIndex: 0,
        total:""
    }

    componentDidMount(){
        this.fetchTracks();
    }

    fetchTracks = (searchTerm = "The Eagles") => {
      axios.get(`${SERVER_URL}/search?q=${searchTerm}&index=${this.state.pageIndex}`, { headers})
           .then(res => this.setState(({pageIndex}) => ({prevPage: res.data.prev, nextPage:res.data.next, total:res.data.total, tracks: res.data.data, currentPage: pageIndex})))
           .catch(err => console.log("err ", err))
    }

    nextPage = () => {
        const {nextPage} = this.state;
        if(!nextPage) return;
    
        this.setState((prevState) => ({pageIndex: prevState.pageIndex + 25}), this.fetchTracks)
    }

    prevPage = () => {
        const {prevPage} = this.state;
        if(!prevPage) return;
        this.setState((prevState) => ({pageIndex: prevState.pageIndex - 25}), this.fetchTracks)
    }

    selectPage = (pageIndex) => {
        this.setState(() => ({pageIndex}), this.fetchTracks)
    }

    renderPagination = () => {
        const {prevPage, nextPage, currentPage, total} = this.state;
        const noOfPages = Math.ceil(total/25);
        const pageIndices = [];

        for(let i=0; i<noOfPages; i++){
            pageIndices.push(i*25);
        }
        return (
                <ul class="pagination">
                    <li>
                        <a onClick={this.prevPage}  href="#!">
                            <i class="small material-icons">chevron_left</i>
                        </a>
                    </li>
                        {
                            pageIndices.map((index, i) => {
                                const theClass = currentPage === index?'active grey':'';
                                return <li className={`waves-effect ${theClass}`} onClick={() => this.selectPage(index)}><a href="#!">{i+1}</a></li>
                            })
                        }
                    <li>
                        <a onClick={this.nextPage} href="#!">
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>
                </ul>
        )
    }

    renderTrackList = () => {
        const {tracks} = this.state;
        const {history} = this.props;

        return tracks.map (({id, title, link, preview, artist, album, type}) => {
            return <TrackItem id={id} title={title} link={link} preview={preview} artist={artist} album={album} type={type} history={history}/>
        })
    }

    render() {
        const {prevPage, nextPage, total, tracks} = this.state;
       if(!tracks.length) return <div>Loading... </div>
       console.log("total ", this.state)

        return (
            <>
                <div className="center-align">{this.renderPagination()}</div>
                <div className="row">
                    {this.renderTrackList()}
                </div>
            </>
        );
    }
}

export default Tracks;