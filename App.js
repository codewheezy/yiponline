import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProductManagement from './components/ProductManagement';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ProductManagement />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
