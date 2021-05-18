import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList} from "react-native";
import discover from '../api/discover'
import Title from '../components/Title'
import Moviedetail from '../components/moviedetail'
import MovieList from '../components/movielist';

                    

let arr2 = [{"title" : "Search by name" , "goto":"SearchByName"} , 
{"title" : "Search by Genre" , "goto":"SearchByGenre"} , {"title" : "Top Rated Movies" , "goto":"TopRated"}];




const homescreen = ({navigation}) => {

  const [results, setResults] = useState([]);

  const searchApi = async () => {
    //console.log('Hi there!');
    try {
      const response = await discover.get('/movie', {
        params: {
          language: 'en-US',
          sort_by: 'popularity.desc',
          api_key: '4e9c97333891ad6c4387325587047af2'
        }
      });

      //console.log(response.data.results.slice(0,5));
      setResults(response.data.results.slice(0,12));
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
    
    
  };

  useEffect( () => {
    searchApi()
  }, []);


    return (


      <View style={{backgroundColor: 'black'  , flex:1}}>

        <Title arr={arr2} name="Popular Movies" size={28}/>

        <MovieList results={results}/>
      </View>


    );
}





export default homescreen;