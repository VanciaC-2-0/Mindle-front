import React, { useEffect, useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import SwipableCard from './SwipableCard';
import Infos from './Infos/index.jsx';
import jsonData from '../../mockedData/mockedData.json'
import axios from 'axios';
import TinderCard from 'react-tinder-card'
import '../../css/MainActivity/MainActivity.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const MainActivity = ({ accessToken }) => {

    const randomOffset = Math.floor(Math.random() * 1000);

    const getRandomSearch = () => {
        // Liste des caractères pouvant être choisis aléatoirement pour la recherche
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        // Récupération d’un caractère aléatoire dans characters
        const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        let randomSearch = '';
        randomSearch = randomCharacter;

        return randomSearch;
    }

    const addNewSongList = (tracks) => {
        const newSongList = []
        tracks["items"].forEach(element => {
            const songItem = {
                title: element["name"],
                artist: element["artists"][0]["name"],
                album: element["album"]["name"],
                cover: element["album"]["images"][0]["url"]
            };
                if (songList) {
                    newSongList.push(songItem)
                } else {
                    newSongList.push(songItem)
                }
        });
        setSongList(newSongList)
    }

    const [songList, setSongList] = useState();

    const getRandomSong = () => {
        axios.get('https://api.spotify.com/v1/search?q=' + getRandomSearch() + '&offset=' + randomOffset + '&type=track&limit=1',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => response.data)
            .then((resp) => {
                addNewSongList(resp["tracks"])
            })
    };

    useEffect(() => {
        getRandomSong()
    }, []); 

    const like = (song) => {
        getRandomSong()
        console.log(songList[0].album + " Liked :)")
    }

    const dislike = (song) => {
        getRandomSong()
        console.log(songList[0].album + " Disliked :(")
    }
 
    return (
        <div id='mainActivity'>
           
            <div className="coverArt">
            {
                songList &&
                    <img src={songList[0].cover} alt="" />
            }
            </div>

            <div className="buttons">
                <Button variant="success" onClick={ like } className="buttonElement">LIKE</Button>{' '}
                <Button variant="danger" onClick={ dislike } className="buttonElement">DISLIKE</Button>{' '}
                <div className="logout">
                    <a href='/'>DECONNEXION</a>
                </div>
            </div>

        </div>
    );
}

export default MainActivity


