import React, { Component } from 'react';
import Layout from './components/Layout'
import Tracks from './components/Tracks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TrackDetails from './components/Tracks/TrackDetails';
import AlbumDetails from './components/Albums/AlbumDetails';
import ArtistDetails from './components/Artists/ArtistDetails';


class App extends Component {
  render() {
    return (
        <div className="container">
            <BrowserRouter>
              <Layout>
                  <Switch>
                    <Route exact path="/" component={Tracks} />
                    <Route exact path="/track/:id" component={TrackDetails} />
                    <Route exact path="/album/:id" component={AlbumDetails} />
                    <Route exact path="/artist/:id" component={ArtistDetails} />
                  </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    )
  }
}

export default App;
