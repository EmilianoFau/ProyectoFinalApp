import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Image } from "react-native";
import { useEffect, useState } from "react";
import { getInfo } from "../app/shared/server";
import { Stack, Link } from "expo-router";
import React from "react";
import TopNav from './components/topNav';  
import BottomNav from './components/bottomNav';

interface Post {
    _id: string;
    user: { username: string; profilePicture: string };    
    imageUrl: string;
    caption: string;
    comments: string[];
    likes: string[];
}

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
          const response = await getInfo();
          setPosts(response);
          console.log(response);
          setLoading(false);
        };
    
        fetchInfo();
    }, []);

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading posts...</Text>
          </View>
        );
      }
    return (
      <View style={styles.feedContainer}>
        <TopNav />
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
        <View style={styles.container}>
        {posts.map((post) => (
          <View key={post._id} style={styles.postContainer}>
            <Link
              href={{
                pathname: "/profile",
                params: { username: post.user.username },
              }}
            >
              <Text style={styles.username}>@{post.user.username}</Text>
            </Link>

            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            <Text style={styles.caption}>{post.caption}</Text>

            <View style={styles.actionContainer}>
              <Text style={styles.actionText}>❤️ {post.likes.length} Likes</Text>
              <Text style={styles.actionText}>
                💬 {post.comments.length} Comments
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    <BottomNav />
    </View>
    );
};

export default Feed;

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
    },
    feedContainer: {
      flex: 1,
    },
    postContainer: {
      backgroundColor: "#fff",
      borderRadius: 8,
      marginBottom: 16,
      padding: 16,
      width: "90%",
      elevation: 2,
    },
    postImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      marginBottom: 10,
    },
    username: {
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 10,
      color: "#007BFF",
      textDecorationLine: "underline",
      alignSelf: "flex-start",
    },
    caption: {
      fontSize: 14,
      color: "#666",
      marginBottom: 10,
    },
    actionContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    actionText: {
      fontSize: 14,
      color: "#666",
    },
  });