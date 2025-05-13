import { SafeAreaView, StyleSheet, View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import HomeScreen from "./app/screens/home-screen";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineSmall" style={styles.heading}>Hello world</Text>
        <View>
          <HomeScreen/>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop:50
  },
  heading:{
    color:'#000'
  }
});
