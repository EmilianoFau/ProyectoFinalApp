import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useEffect, useState } from "react";
import { getInfo } from "../app/shared/server";
import { Stack, Link } from "expo-router";
import React from "react";

interface Post {
    _id: string;
    user: string;
    imageUrl: string;
    caption: number;
    comments: string[];
    likes: string[];
}

const Index = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchInfo = async () => {
          const response = await getInfo();
          setPosts(response);
        };
    
        fetchInfo();
    }, []);

    return (
        <ScrollView
          style={{
            flex: 1,
          }}
        >
        <Stack.Screen
        options={{
            title: "Home",
            headerStyle: { backgroundColor: "#020127" },
            headerTintColor: "#fff",
            headerTitleStyle: {
            fontWeight: "bold",
            },
        }}
        />
        <View
        style={[
            styles.buttonContainer,
            Platform.OS === "android"
            ? styles.buttonContainerAndroid
            : styles.buttonContainerIOS,
        ]}
        >
        <Link href="/add">
            <TouchableOpacity
            style={[
                styles.addButton,
                Platform.OS === "android" ? styles.androidButton : styles.iosButton,
            ]}
            >
            <Text
                style={
                Platform.OS === "android"
                    ? styles.androidButtonText
                    : styles.iosButtonText
                }
            >
                {Platform.OS === "android" ? "Nuevo Planeta" : "Crear Planeta"}
            </Text>
            </TouchableOpacity>
        </Link>
        </View>
        {posts &&
        posts.map((post) => {
            return (
            <View
                key={post._id}
                style={{
                backgroundColor: "white",
                borderRadius: 10,
                width: "85%",
                margin: 16,
                padding: 16,
                }}
            >
                <Link
                href={{
                    pathname: "/details",
                    params: { id: post.id },
                }}
                >
                <Text style={{ fontWeight: "bold" }}>{post.name}</Text>
                </Link>
            </View>
            );
        })}
    </ScrollView>
    );
};

export default Index;

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 16,
      marginBottom: 16,
      width: "100%",
    },
    buttonContainerAndroid: {
      alignItems: "flex-start",
      paddingLeft: 16,
    },
    buttonContainerIOS: {
      alignItems: "flex-end",
      paddingRight: 16,
    },
    addButton: {
      padding: 12,
      borderRadius: 8,
    },
    androidButton: {
      backgroundColor: "blue",
    },
    iosButton: {
      backgroundColor: "green",
    },
    androidButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    iosButtonText: {
      color: "black",
      fontWeight: "bold",
    },
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 16,
    },
    sortButton: {
      backgroundColor: "#030237",
      padding: 10,
      borderRadius: 8,
    },
    resetButton: {
      backgroundColor: "#030237",
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });