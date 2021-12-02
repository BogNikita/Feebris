import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

interface ICheckup {
  createdAt: number;
  averageSPO2?: number[];
}

export const Checkup: React.FC<ICheckup> = ({createdAt, averageSPO2}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>
        Date check: {moment(createdAt).format('hh:mm:ss YYYY/MM/DD')}
      </Text>
      {!!averageSPO2?.length && (
        <View>
          <Text>Average SPO2: {averageSPO2.join(', ')}</Text>
        </View>
      )}
    </View>
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
    fontSize: 18,
  },
});
