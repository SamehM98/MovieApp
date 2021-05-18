import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList , CheckBox} from "react-native";
import discover from '../api/discover'
import Title from '../components/Title'
import Moviedetail from '../components/moviedetail'
import MovieList from '../components/movielist';
import SearchBar from '../components/SearchBar';

let arr2 = [{"title" : "Home" , "goto":"Home"}, {"title" : "Search by name" , "goto":"SearchByName"} , {"title" : "Top Rated Movies" , "goto":"TopRated"}];

let genrelist = [{"title" : "Action"} , {"title" : "Adventure"} , {"title" : "Animation"} , {"title" : "Comedy"} ,
{"title" : "Crime"} , {"title" : "Documentary"} , {"title" : "Drama"} , {"title" : "Family"}  , {"title" : "Fantasy"} , 
{"title" : "History"} , {"title" : "Horror"} , {"title" : "Music"}  , {"title" : "Mystery"} , {"title" : "Romance"},
{"title" : "Science Fiction"} , {"title" : "TV Movie"} , {"title" : "Thriller"} ,
{"title" : "War"} , {"title" : "Western"}]


let genres = new Map();


genres['Action'] = 28;
genres['Adventure'] = 12;
genres['Animation'] = 16;

genres['Comedy'] = 35;
genres['Crime'] = 80;
genres['Documentary'] = 99;

genres['Drama'] = 18;
genres['Family'] = 10751;
genres['Fantasy'] = 14;

genres['History'] = 36;
genres['Horror'] = 27;
genres['Music'] = 10402;

genres['Mystery'] = 9648;
genres['Romance'] = 10749;
genres['Science Fiction'] = 878;

genres['TV Movie'] = 10770;
genres['Thriller'] = 53;
genres['War'] = 10752;
genres['Western'] = 37;







function adder(curr , genre){

    if(curr.includes(genre))
    {
        if(curr.includes(genre + ','))
        curr = curr.replace((genre + ','),'');
        else
        curr = curr.replace((genre),'');
    }
        
    else
        {
            if(curr)
                curr = curr + ',' + genre;
            else
                curr = genre;
        }

    if(curr[curr.length - 1] == ',')
    curr = curr.slice(0,-1);

    return curr;
}



function converter(arr){

    var i=0;
    var ans="";

    for(i=0;i<arr.length;i++)
    {
        ans += genres[arr[i]];
        if(i != arr.length - 1)
        ans += ","
    }

    return ans;
}




const SearchByGenre = () => {
    const [term, setTerm] = useState('');


    const [results, setResults] = useState([]);

  const searchApi = async (term) => {
    //console.log('Hi there!');
    try {
      const response = await discover.get('/movie', {
        params: {
          language: 'en-US',
          with_original_language: 'en',
          sort_by: 'popularity.desc',
          api_key: '4e9c97333891ad6c4387325587047af2',
          with_genres: converter(term.split(','))
        }
      });

      //console.log(response.data.results.slice(0,5));
      setResults(response.data.results.slice(0,12));
      setTerm('');
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
    
    
  };



   




    

    return ( 
            <View style={{backgroundColor: 'black', padding: 18, flex:1}}>
                <Text style={{color: 'white', fontSize: 16, paddingVertical:5}}>{term}</Text>
            <FlatList
                contentContainerStyle={{paddingBottom: 12}}
               style = {{marginVertical: 25}}
               horizontal
               keyExtractor={ele => ele.title}
               data={genrelist}
               renderItem = {({item}) => {

               return  <View>
                
                

                <TouchableOpacity onPress={() => setTerm(adder(term,item.title))}>
                    <Text style={styles.listitem}>{item.title}</Text>
                </TouchableOpacity>
                </View>
            
            }}
               />

               <TouchableOpacity style={styles.button} onPress={() => searchApi(term)}>
                  <Text style={styles.btnText}>Search</Text>
              </TouchableOpacity >


            <FlatList
            contentContainerStyle={{paddingBottom: 12}}
            style={{marginVertical: 8 }}
            horizontal
            data={arr2}
            keyExtractor={ele => ele.title}
            renderItem={({item}) => {
                return <TouchableOpacity onPress={() => {navigation.navigate(item.goto)}}>
                        <Text style={{color:'white' , marginRight: 14, fontSize: 14}}>{item.title}</Text>
                </TouchableOpacity>
                
            }} />



        <MovieList results={results}/>

         


            </View>

     );

    
};

const styles = StyleSheet.create({
    listitem:{
        fontSize: 16,
        color: 'lightgrey',
        marginRight: 16,
        fontWeight: 'bold'
    },

    button:{
        backgroundColor: 'navy',
        color: 'black',
        alignSelf: 'flex-start',
        marginBottom: 12,
        padding: 8
    },
  
    btnText:{
      fontWeight: 'bold', color: 'gainsboro'
    },
})


export default SearchByGenre;