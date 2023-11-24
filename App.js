import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Chat from "./src/screens/Chat";

const Stack = createNativeStackNavigator();

function App() {
  const [socket, setSocket] = React.useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <Home {...props} setSocket={setSocket} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <Chat {...props} socket={socket} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
