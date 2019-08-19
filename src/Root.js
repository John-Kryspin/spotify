import React, { useEffect, useState } from 'react'
import accessTokenStore from './accessTokenStore'
import axios from 'axios'
const spotifyLoginLink = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http:%2F%2Flocalhost:3000%2FauthenticationCallback&scope=user-read-private%20user-read-email%20user-top-read&response_type=token&state=123`
function Root(props) {
    let [topTracks, setTopTracks] = useState([])
    useEffect(() => {
        console.log(accessTokenStore.getAccessToken())
        if (accessTokenStore.getAccessToken() && topTracks.length == 0) {
            axios.get('https://api.spotify.com/v1/me/top/tracks', { headers: { 'Authorization': "Bearer " + accessTokenStore.getAccessToken() } })
                .then((result) => {
                    console.log(result.data.items)
                    setTopTracks(result.data.items)
                })
        }
    });
    return (
        <div className="App">
            HELLO
            <ul>
        {topTracks.map((track) => {
                return <li>{track.name}</li>
            })}
            </ul>
            <a href={spotifyLoginLink}>Login To Spotify</a>

        </div>)
}
export default Root