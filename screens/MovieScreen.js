import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList} from "react-native";
import movie from '../api/movie';
import { Linking } from "react-native";
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { 
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic 
} from '@expo-google-fonts/nunito-sans'

import { 
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic 
} from '@expo-google-fonts/roboto'

import AppLoading from 'expo-app-loading';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';


const MovieScreen = ({navigation}) => {

  
  let[fontLoaded, error]= useFonts({BebasNeue_400Regular , NunitoSans_700Bold ,
    Roboto_700Bold, Roboto_400Regular , NunitoSans_400Regular});

    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');

   // console.log(id);

    const getResult = async id => {
        //console.log('Hi there!');
        try {
          const response = await movie.get(`/${id}`, {
            params: {
              api_key: '4e9c97333891ad6c4387325587047af2'
            }
          });
        
          setResult(response.data);
         // console.log(response.data);

          
        } catch (err) {
          setErrorMessage('Something went wrong');
        }
        
        
      };

      

      useEffect(() => {

        if(fontLoaded)
        getResult(id);
      }, [fontLoaded , id]);

      if (!result) {
        return null;
      }

      var url = "https://www.themoviedb.org/t/p/original" + result.backdrop_path;
      var imdb = "https://imdb.com/title/"+result.imdb_id;
      src = {uri: url};
     // console.log(imdb);





   if(!fontLoaded)
   {
       return <AppLoading />
   }
   else
   {
    return  (<ScrollView style={{backgroundColor: 'black'}}>

      <Image source = {src}style = {styles.backdrop}/>
      <View style={{padding: 12}}>
              <View style={styles.headerContainer}>
              <Text style={styles.header}>{result.title}</Text>
              <View style={{flexDirection: 'row' , alignItems: 'center'}}>
                <Image style={{height: 28 , width: 28}} source = {{uri: 'https://assets.stickpng.com/images/580b585b2edbce24c47b2913.png'}} />
                <Text style={styles.rating}>{result.vote_average}</Text>
              </View>
              
              </View>
              <Text style={{marginVertical: 12 , color: 'lightgrey'}}>{result.production_countries[0].name}</Text>
              <Text style={{fontSize: 14 , fontFamily: 'Roboto_400Regular' , color: 'lightgray'}}>{result.release_date.slice(0,4)}   {result.runtime} mins</Text>

              <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.button}  onPress={() => Linking.openURL(imdb)}>
                  <Text style={styles.btnText}>IMDB</Text>
              </TouchableOpacity >

              <TouchableOpacity style={styles.button}  onPress={() => Linking.openURL(result.homepage)}>
                  <Text style={styles.btnText}>Homepage</Text>
              </TouchableOpacity >

              <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('Recommender' ,{id : result.id } )}>
                  <Text style={styles.btnText}>More like this</Text>
              </TouchableOpacity >
              </View>

              <Text style={styles.paragraph}>{result.overview}</Text>

      </View>

      
      
        </ScrollView>);
   }
    
    
};

const styles = StyleSheet.create({

  header:{fontSize: 28 , 
    color: 'white',
    flex: 1,
    fontFamily: 'Roboto_700Bold'},

  button:{
      backgroundColor: 'yellow',
      color: 'black',
      alignSelf: 'flex-start',
      padding: 8,
      marginRight: 18,
  },

  btnText:{
    fontWeight: 'bold'
  },

  btnContainer:{
    flexDirection: 'row',
    marginVertical: 18
  },

  paragraph:{
    fontFamily: 'NunitoSans_400Regular',
    color: 'gainsboro',
    fontSize: 18
  },

  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  rating: {
    
    fontWeight: 'bold',
    color: 'lightyellow',
    marginLeft: 5
  },

  backdrop: { height: undefined , width: '100%' , aspectRatio: 1.5, resizeMode: 'cover'}

});

export default MovieScreen;