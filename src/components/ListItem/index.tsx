import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

interface IData {
  id: number;
  name: string;
  navigate?: (id: number) => void;
}

export const ListItem: React.FC<IData> = ({name, id, navigate}) => {
  return (
    <TouchableHighlight onPress={() => navigate && navigate(id)}>
      <View style={styles.item}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#DDDDDD',
    padding: 20,
    borderBottomColor: '#1c1c1c',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 24,
  },
});
