import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React Native', done: false },
    { id: 2, text: '搭建 Expo 项目', done: true },
    { id: 3, text: '开发 iOS App', done: false },
  ]);
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 标题 */}
        <Text style={styles.title}>Hello iOS App!</Text>
        <Text style={styles.subtitle}>React Native + Expo 开发入门</Text>

        {/* 计数器 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>计数器</Text>
          <Text style={styles.counterText}>{count}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.btn} onPress={() => setCount(count - 1)}>
              <Text style={styles.btnText}>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => setCount(0)}>
              <Text style={styles.btnText}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => setCount(count + 1)}>
              <Text style={styles.btnText}>+1</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 待办列表 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>待办清单</Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="输入待办事项..."
              placeholderTextColor="#999"
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
              <Text style={styles.addBtnText}>添加</Text>
            </TouchableOpacity>
          </View>

          {todos.map((todo) => (
            <TouchableOpacity
              key={todo.id}
              style={styles.todoItem}
              onPress={() => toggleTodo(todo.id)}
              onLongPress={() => deleteTodo(todo.id)}
            >
              <Text style={[styles.todoText, todo.done && styles.todoDone]}>
                {todo.done ? '✓' : '○'} {todo.text}
              </Text>
              <Text style={styles.todoHint}>长按删除</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 底部信息 */}
        <Text style={styles.footer}>
          点击✓切换状态 · 长按删除事项
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e94560',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0f3460',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#e94560',
    paddingVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  btn: {
    flex: 1,
    backgroundColor: '#0f3460',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    height: 44,
  },
  addBtn: {
    backgroundColor: '#e94560',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  todoText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  todoDone: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  todoHint: {
    color: '#555',
    fontSize: 12,
  },
  footer: {
    color: '#555',
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 30,
  },
});
