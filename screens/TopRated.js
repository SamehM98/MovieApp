import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList} from "react-native";
import discover from '../api/discover'
import Title from '../components/Title'
import Moviedetail from '../components/moviedetail'
import MovieList from '../components/movielist';
import movie from '../api/movie';

let arr2 = [ {"title" : "Home" , "goto":"Home"} , {"title" : "Search by name" , "goto":"SearchByName"} , 
{"title" : "Search by Genre" , "goto":"SearchByGenre"}];

const TopRated = () => {


    const [result, setResult] = useState(null);
    const getResult = async () => {
        //console.log('Hi there!');
        try {
          const response = await movie.get('/top_rated', {
            params: {
              api_key: '4e9c97333891ad6c4387325587047af2',
              original_language: 'en'
            }
          });
        
          setResult(response.data.results.slice(0,10));
          //console.log(response.data);

          
        } catch (err) {
          setErrorMessage('Something went wrong');
        }
        
        
      };

      

      useEffect(() => {
        getResult();
      }, []);

      if (!result) {
        return null;
      }


    return (<View style={{backgroundColor: 'black' , flex: 1}}>
        <Title name="Top Rated" size={28} arr={arr2}/>
        <MovieList results={result}/>
    </View>)
}

export default TopRated;