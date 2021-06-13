import React, { useEffect } from 'react'
import logo from "../../img/mindle_logo.png"
import "../../css/ConnexionActivity/connexion.css"

const ConnexionActivity = ({ setNewHash = () => { } }) => {
    const CLIENT_ID = 'ac2686602dd842ef9dabff18e06e527a';
    const REDIRECT_URI = 'https://marine.dxqv2v8t1rl19.amplifyapp.com/';
    const SCOPES = '';
    const LoginURL =
        'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
        '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
        '&scope=' + encodeURIComponent(SCOPES) +
        '&response_type=token'

    const openConnexion = () => {
        window.location = LoginURL;
    }

    const executeChangeHash = () => {
        const hash = window.location.hash
        .substring(1)
        .split("&")
      .reduce(function (initial, item) {
            if (item) {
                var parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {})
    setNewHash(hash)
    }

    useEffect(() => {
        const url = window.location.hash
        url.startsWith("#access_token") && executeChangeHash()
    },[])

    return (
        <div className ="page">
            <img src={ logo } alt="logo" className="logo" />
            <button onClick={() => { openConnexion() }} className="btnConnection" ></button>
            <div className="label"> CONNECTION </div>
        </div>
    )
}

export default ConnexionActivity