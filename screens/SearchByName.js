import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList} from "react-native";
import search from '../api/search'
import Title from '../components/Title'
import Moviedetail from '../components/moviedetail'
import MovieList from '../components/movielist';
import SearchBar from '../components/SearchBar';

let arr2 = [{"title" : "Home" , "goto":"Home"} , 
{"title" : "Search by Genre" , "goto":"SearchByGenre"} , {"title" : "Top Rated Movies" , "goto":"TopRated"}];

const SearchByName = () => {
    const [term, setTerm] = useState('');
    const [result, setResult] = useState(null);

    const getResult = async term => {
        //console.log('Hi there!');
        try {
          const response = await search.get('',{
            params: {
              api_key: '4e9c97333891ad6c4387325587047af2',
              query: term
            }
          });
        
          setResult(response.data.results);
          console.log(response.data);

          
        } catch (err) {
          console.log('Something went wrong');
        }
        
        
      };

    return ( 
    <View style={{backgroundColor: 'black' , flex: 1}}>
            <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => getResult(term)}/>
            <Title arr={arr2} name="" size={0}/>
            <MovieList results={result}/>

    </View>
     );

    
}; 

export default SearchByName;