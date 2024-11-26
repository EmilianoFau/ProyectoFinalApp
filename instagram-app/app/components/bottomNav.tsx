import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNav: React.FC = () => {

    return (
        <View style={styles.navBar}>
            <View style={styles.iconContainer}>
                <Link href="/feed">
                    <MaterialCommunityIcons name="home" size={24} color="black" />
                </Link>
                <Link href="/profile">
                    <MaterialCommunityIcons name="account" size={24} color="black" />
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomNav;
