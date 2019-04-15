const initState = {
    searchTerm: "Pink Floyd",
    playingTrackId: ""
}

const rootReducer = (state = initState, action) => {
    switch(action.type) 
    {
     case "PLAY_TRACK":
           return {...state, playingTrackId: action.trackId }
     
     case "NEW_SEARCH":
       return {...state, searchTerm: action.searchTerm };
     
     default:
       return state;
    } 
}

export default rootReducer;