import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory';

export default function App() {
  // State to keep track of the current task and task history
  const [currentSubject, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);

  return (
    // Use ImageBackground to set the Joker image as the background
    <ImageBackground
      source={require('./src/images/IMG_0444.jpg')}
      style={styles.backgroundImage}
    >
      {/* Create a safe area for content */}
      <SafeAreaView style={styles.container}>
        {/* Apply a semi-transparent overlay for better readability */}
        <View style={styles.overlay} />

        {/* Conditionally render components based on current task */}
        {!currentSubject ? (
          // If no task is active, render Focus and FocusHistory components
          <>
            <Focus addSubject={setCurrentSubject} />
            <FocusHistory history={history} />
          </>
        ) : (
          // If a task is active, render Timer component
          <Timer
            focusSubject={currentSubject}
            // Update task history when timer completes
            onTimerEnd={(subject) => {
              setHistory([...history, subject]);
            }}
            // Clear the current task
            clearSubject={() => setCurrentSubject(null)}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

// Define styles for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'transparent', // Make background transparent
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Resize image to cover the entire screen
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fill entire space
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  },
});
