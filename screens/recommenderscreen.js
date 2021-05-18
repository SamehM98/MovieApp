import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList} from "react-native";
import movie from '../api/movie'
import Moviedetail from '../components/moviedetail'

let genres = new Map();


genres[28] = 'Action';
genres[12] = 'Adventure';
genres[16] = 'Animation';

genres[35] = 'Comedy';
genres[80] = 'Crime';
genres[99] = 'Documentary';

genres[18] = 'Drama';
genres[10751] = 'Family';
genres[14] = 'Fantasy';

genres[36] = 'History';
genres[27] = 'Horror';
genres[10402] = 'Music';

genres[9648] = 'Mystery';
genres[10749] = 'Romance';
genres[878] = 'Science Fiction';

genres[10770] = 'TV Movie';
genres[53] = 'Thriller';
genres[10752] = 'War';
genres[37] = 'Western';

function genre (arr) {

  var i=0;
  var ans="";

    for(i=0;i<arr.length;i++)
    {
        ans += genres[arr[i]];
        if(i != arr.length - 1)
        ans += ", "
    }

    return ans;

}

const recommenderscreen = ({navigation}) =>{

    const [results, setResult] = useState(null);
    const id = navigation.getParam('id');

    //console.log(id);

    const getResult = async id => {
        //console.log('Hi there!');
        try {
          const response = await movie.get(`/${id}/recommendations`, {
            params: {
              api_key: '4e9c97333891ad6c4387325587047af2'
            }
          });
        
          //console.log(response.data.results.slice(0,5));
           setResult(response.data.results.slice(0,10));
        } catch (err) {
          console.log('Something went wrong');
        }
        
        
      };

      useEffect( () => {
        getResult(id);
      }, []);

      return(
          



        <FlatList 
        style={{backgroundColor: 'black'}}
        contentContainerStyle={{paddingBottom: 15}}
          showsVerticalScrollIndicator={true}
            vertical
            data={results}
            keyExtractor={ele => ele.title}
          renderItem = {({item}) => {
          
         return <TouchableOpacity onPress = {() => {navigation.navigate('Movie' , {id: item.id}  )} }>
            <Moviedetail  img={item.poster_path} title={item.original_title} 
           rate={item.vote_average} glist = {genre(item.genre_ids)}/> 
         </TouchableOpacity>
         
    
        }}
        />

      );
    


}

export default recommenderscreen;