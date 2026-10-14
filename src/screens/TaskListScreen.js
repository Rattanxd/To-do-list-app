import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  FlatList, KeyboardAvoidingView, Platform 
} from 'react-native';

export default function TaskListScreen({ navigation }) {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: '101', text: 'Buy Groceries', details: 'Milk, Eggs, Bread, and Coffee' },
    { id: '102', text: 'Finish React Project', details: 'Implement React Navigation with 3 screens.' },
  ]);

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTasks([...tasks, { 
        id: Date.now().toString(), 
        text: task, 
        details: 'No extra details provided yet.' 
      }]);
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.taskItem}
      onPress={() => navigation.navigate('TaskDetail', { taskData: item })}
    >
      <View style={styles.taskTextContainer}>
        <Text style={styles.taskText}>{item.text}</Text>
        <Text style={styles.subText}>Tap to view details</Text>
      </View>

      <TouchableOpacity 
        onPress={() => handleDeleteTask(item.id)} 
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a new task..."
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
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
  taskTextContainer: { flex: 1 },
  taskText: { fontSize: 18, fontWeight: '600', color: '#333' },
  subText: { fontSize: 12, color: '#888', marginTop: 4 },
  deleteButton: { backgroundColor: '#FF3B30', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  deleteText: { color: '#FFF', fontWeight: 'bold' },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', padding: 20, 
    backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E0E0E0' 
  },
  input: { 
    flex: 1, padding: 15, backgroundColor: '#F9F9F9', borderRadius: 25, 
    borderColor: '#C0C0C0', borderWidth: 1, marginRight: 10, fontSize: 16 
  },
  addButton: { 
    backgroundColor: '#6200EE', paddingVertical: 15, paddingHorizontal: 20, 
    borderRadius: 25, justifyContent: 'center', alignItems: 'center' 
  },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20, fontSize: 16 }
});