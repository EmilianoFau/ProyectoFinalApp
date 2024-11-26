import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TopNav: React.FC = () => {
  return (
    <View style={styles.navBar}>
      <Text style={styles.title}>FakeStagram</Text>
      <View style={styles.iconContainer}>
        <Link href="/notifications">
          <MaterialCommunityIcons name="heart" size={24} color="black" />
        </Link>
        <Link href="/upload">
          <MaterialCommunityIcons name="plus-circle" size={24} color="black" />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    height: 60,
    backgroundColor: '#fff',
    elevation: 5,
    paddingTop: 0, 
    marginTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default TopNav;
