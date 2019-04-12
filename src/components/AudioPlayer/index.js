import React from 'react';

const AudioPlayer = ({preview}) => {
    return (
        <audio controls>
            <source src={preview} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioPlayer;