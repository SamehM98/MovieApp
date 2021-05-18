import React from 'react';
import { View, Image, Text, StyleSheet , TouchableOpacity } from 'react-native';
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


const Moviedetail = ({img , title, rate , glist}) => { 

    var url = "https://www.themoviedb.org/t/p/w154" + img;
    src = {uri: url};
    //console.log(glist);
    
    let[fontLoaded, error]= useFonts({BebasNeue_400Regular , NunitoSans_700Bold ,
         Roboto_700Bold, Roboto_400Regular});

    if(!fontLoaded)
    {
        return <AppLoading />
    }

    return(


        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "row"
          }]}>
            <View style={{ flex: 4}}>
                <Image source = {src} style={styles.image}/>
            </View>
            <View style={{ flex: 4, height: 165, marginLeft: 8}}>
                <Text style={{fontSize: 20 , color: 'ivory' , fontFamily: 'NunitoSans_700Bold'}}>{title}</Text>
                <Text style={{fontSize: 12 ,color: 'cornsilk' , marginTop: 8, fontFamily:'Roboto_400Regular'}}>{glist}</Text>
                <Text style={{marginTop: 'auto' , color: 'cornsilk' , fontSize: 14}}>Rating: {rate}</Text>
            </View>
          </View>

    );

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: 165,
        marginTop: 24,
        padding: 2
    },

    box1: {
        flex: 1,
        backgroundColor: 'red'
    },

    box2: {
        flex: 2,
        flexDirection: 'column'
    },

    image:{
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 4
    }

});

export default Moviedetail;