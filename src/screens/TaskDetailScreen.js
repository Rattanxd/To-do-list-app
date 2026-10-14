import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskData } = route.params;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.card}>
        <Text style={styles.detailTitle}>{taskData.text}</Text>
        
        <Text style={styles.detailLabel}>Task ID:</Text>
        <Text style={styles.detailValue}>{taskData.id}</Text>
        
        <Text style={styles.detailLabel}>Description:</Text>
        <Text style={styles.detailValue}>{taskData.details}</Text>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Go Back Manually</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  card: { 
    backgroundColor: '#FFF', padding: 20, borderRadius: 10, shadowColor: '#000', 
    shadowOpacity: 0.1, shadowRadius: 5, elevation: 4, marginBottom: 30 
  },
  detailTitle: { 
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#6200EE', 
    borderBottomWidth: 1, borderColor: '#EEE', paddingBottom: 10 
  },
  detailLabel: { fontSize: 14, color: '#888', marginTop: 10 },
  detailValue: { fontSize: 18, color: '#333', marginTop: 5, fontWeight: '500' },
  backButton: { backgroundColor: '#333', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  backButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});