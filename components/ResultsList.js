import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ResultsDetail from './ResultsDetail';
import {withNavigation} from 'react-navigation'

const ResultsList = ({ title, results , navigation}) => {

    if(results.length==0)
    return null;

  return (
    <View styles={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={results}
        keyExtractor={result => result.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {

          return <TouchableOpacity onPress={() => navigation.navigate('ResultsShow' ,{id : item.id } )}>
                    <ResultsDetail result={item} />
              </TouchableOpacity>
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5
  },

  container: {
      marginBottom: 10
  }
});

export default withNavigation(ResultsList);
