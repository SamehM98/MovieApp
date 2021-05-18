import React from 'react';
import { useEffect, useState } from 'react';
import { Text, StyleSheet , View , Button, TouchableOpacity, Image , FlatList} from "react-native";
import { withNavigation } from 'react-navigation';

const Title = ({arr , name , size, navigation}) =>{

    return (
        <View>
                  <Text style={{color: 'white' , padding:18, fontSize: size}}>{name}</Text>

                <FlatList

                    style={{marginLeft: 18, marginVertical: 8 }}
                    horizontal
                    data={arr}
                    keyExtractor={ele => ele.title}
                    renderItem={({item}) => {
                        return <TouchableOpacity onPress={() => {navigation.navigate(item.goto)}}>
                                <Text style={{color:'white' , marginRight: 14, fontSize: 14}}>{item.title}</Text>
                        </TouchableOpacity>
                        
                    }} />
        </View>
    );
};

export default withNavigation(Title);