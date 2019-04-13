import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackItem from './TrackItem';
import Loader from '../Loader';
import api from '../../api';



class Tracks extends Component {

    state = {
        tracks:[],
        nextPage:"",
        prevPage:"",
        currentPage:0,
        pageIndex: 0,
        total:"",
        loading: true
    }

    componentDidMount(){
        this.fetchTracks();
    }

    componentDidUpdate(nextProps) {
        if (this.props.searchTerm !== nextProps.searchTerm) this.fetchTracks();
      }

    fetchTracks = async (searchTerm = this.props.searchTerm, pageIndex = this.state.pageIndex) => {
        this.setState({loading: true})
        const res = await api.fetchTracks(searchTerm, pageIndex);
        this.setState(({pageIndex}) => ({prevPage: res.data.prev, nextPage:res.data.next, total:res.data.total, tracks: res.data.data, currentPage: pageIndex, loading:false}))
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
        const {currentPage, total} = this.state;
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
        const {loading} = this.state;
        if(loading) return <Loader />

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

const mapStateToProps = state => ({ searchTerm: state.searchTerm })

export default connect(mapStateToProps)(Tracks);

