import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
// import PushNotification from 'react-native-push-notification';
import ProductManagement from './components/ProductManagement';


// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
//   requestPermissions: Platform.OS === 'ios',
// });


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
