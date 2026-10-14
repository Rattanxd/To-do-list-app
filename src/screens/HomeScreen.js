import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.welcomeTitle}>Welcome to TaskPro</Text>
      <Text style={styles.welcomeSubtitle}>Manage your daily goals easily.</Text>
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('TaskList')}
      >
        <Text style={styles.primaryButtonText}>View My Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    padding: 20 
  },
  welcomeTitle: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  welcomeSubtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  primaryButton: { 
    backgroundColor: '#6200EE', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 25 
  },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});