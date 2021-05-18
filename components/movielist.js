import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList} from "react-native";
import Moviedetail from '../components/moviedetail'
import { withNavigation } from 'react-navigation';

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

const MovieList = ({results, navigation}) => {

    //const navigation = useNavigation();

    return (<FlatList 
        contentContainerStyle={{paddingBottom: 18}}
          showsVerticalScrollIndicator={true}
            vertical
            data={results}
            keyExtractor={ele => (ele.id).toString()}
          renderItem = {({item}) => {
          
         return <TouchableOpacity onPress = {() => {navigation.navigate('Movie' , {id: item.id}  )} }>
            <Moviedetail  img={item.poster_path} title={item.original_title} 
           rate={item.vote_average} glist = {genre(item.genre_ids)}/> 
         </TouchableOpacity>
        }}
        />
)};

export default withNavigation(MovieList);