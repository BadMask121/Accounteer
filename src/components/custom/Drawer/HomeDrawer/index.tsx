import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {View} from 'react-native-animatable';
import {app} from 'helpers/constants';

export default props => (
  <ScrollView style={{flex: 1}}>
    <View style={styles.container}>
      <DrawerItems {...props} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C50B8',
  },
});
