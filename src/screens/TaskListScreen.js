import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskListScreen({ navigation }) {
  const [task, setTask] = useState('');
  // Added "completed: false" to our initial state
  const [tasks, setTasks] = useState([
    { id: '101', text: 'Buy Groceries', details: 'Milk, Eggs, Bread, and Coffee', completed: false },
    { id: '102', text: 'Finish React Project', details: 'Implement React Navigation with 3 screens.', completed: true },
  ]);

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, { 
        id: Date.now().toString(), 
        text: task, 
        details: 'No extra details provided yet.',
        completed: false // New tasks start uncompleted
      }]);
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // New function to toggle the completion status
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      {/* Checkbox Icon */}
      <TouchableOpacity onPress={() => handleToggleComplete(item.id)} style={styles.checkbox}>
        <Ionicons 
          name={item.completed ? "checkmark-circle" : "ellipse-outline"} 
          size={28} 
          color={item.completed ? "#4CAF50" : "#C0C0C0"} 
        />
      </TouchableOpacity>

      {/* Task Text Container - clicking this goes to Details */}
      <TouchableOpacity 
        style={styles.taskTextContainer}
        onPress={() => navigation.navigate('TaskDetail', { taskData: item })}
      >
        {/* Apply conditional styling based on 'item.completed' */}
        <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
          {item.text}
        </Text>
        <Text style={styles.subText}>Tap to view details</Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={22} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet.</Text>}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a new task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  listContainer: { padding: 20, paddingBottom: 100 },
  taskItem: { 
    backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, flexDirection: 'row', 
    alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, 
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 
  },
  checkbox: { marginRight: 15 },
  taskTextContainer: { flex: 1 },
  taskText: { fontSize: 18, fontWeight: '600', color: '#333' },
  // New style for completed text
  taskTextCompleted: { textDecorationLine: 'line-through', color: '#A0A0A0' },
  subText: { fontSize: 12, color: '#888', marginTop: 4 },
  deleteButton: { backgroundColor: '#FF3B30', padding: 10, borderRadius: 8 },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', padding: 20, 
    backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E0E0E0' 
  },
  input: { 
    flex: 1, padding: 15, backgroundColor: '#F9F9F9', borderRadius: 25, 
    borderColor: '#C0C0C0', borderWidth: 1, marginRight: 10, fontSize: 16 
  },
  addButton: { 
    backgroundColor: '#6200EE', width: 54, height: 54, borderRadius: 27, 
    justifyContent: 'center', alignItems: 'center' 
  },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20, fontSize: 16 }
});