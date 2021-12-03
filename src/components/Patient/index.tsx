import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

interface IPatient {
  id: number;
  firstName: string;
  lastName: string;
  assignedPractices: string[];
  navigate?: (id: number) => void;
}

export const Patient: React.FC<IPatient> = ({
  firstName,
  lastName,
  id,
  assignedPractices,
  navigate,
}) => {
  return (
    <TouchableHighlight onPress={() => navigate && navigate(id)}>
      <View style={styles.item}>
        <Text style={styles.text}>{firstName + ' ' + lastName}</Text>
        <Text>Assigned practices:</Text>
        {assignedPractices.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
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
