import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IHeader {
  title: string;
}

export const Header: React.FC<IHeader> = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
