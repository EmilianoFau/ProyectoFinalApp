import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, Link } from "expo-router";
import { postData } from '../app/shared/server'; 

const Upload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is required to take a photo');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9], 
      quality: 1, 
    });

    if (!result.canceled && result.assets && result.assets[0]) {
        setImage(result.assets[0].uri); 
      }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert('Permission required', 'Gallery permission is required to pick a photo');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
        setImage(result.assets[0].uri); 
      }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert('No Image Selected', 'Please select or take a photo before uploading.');
      return;
    }

    const formData = new FormData();
    const imageUri = image;

    const localUri = imageUri.startsWith('file://') ? imageUri : `file://${imageUri}`;
    const fileName = localUri.split('/').pop()!;
    const type = `image/${fileName.split('.').pop()}`;

    try {
        const response = await fetch(localUri);
        const imageBlob = await response.blob();
    
        if (imageBlob) {
          formData.append('image', imageBlob, fileName);
          formData.append('caption', 'Hola');
    
          const { response: uploadResponse, result } = await postData('http://localhost:3001/api/posts/upload', formData);
    
          if (uploadResponse && result) {
            Alert.alert('Upload Successful', 'Your image has been uploaded successfully!');
          } else {
            Alert.alert('Upload Failed', 'There was an error uploading your image.');
          }
        } else {
          Alert.alert('Error', 'Failed to fetch the image data.');
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert('Error', 'There was an issue with uploading the image.');
      }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
    <Stack.Screen
        options={{
            title: "Uploads",
            headerStyle: { backgroundColor: "#020127" },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}
    />
    <View style={styles.container}>
      <Text style={styles.title}>Upload a Photo</Text>

      <View style={styles.buttonsContainer}>
        <Button title="Take a Photo" onPress={takePhoto} color="#0071E2" />
        <Button title="Pick from Gallery" onPress={pickImage} color="#0071E2" />
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.imagePreview}
        />
      )}

      <View style={styles.uploadButtonContainer}>
        <Button title="Upload Image" onPress={handleUpload} color="#03023F" />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#F5F5F5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    imagePreview: {
      width: 250,
      height: 250,
      marginTop: 20,
      borderRadius: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      resizeMode: 'cover',
    },
    uploadButtonContainer: {
      marginTop: 20,
      width: '100%',
    }
});

export default Upload;
