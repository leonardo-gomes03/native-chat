import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllChat from "./Chats/All";
import Login from "./Login";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListUsers from "./Chats/Private/list";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Home() {
  const [socket, setSocket] = React.useState(null);
  const [username, setUsername] = React.useState<string | null>("");

  console.log(socket);

  return (
    <>
      {socket ? (
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Todos">
            <Tab.Screen
              name="Todos"
              options={{
                tabBarIcon: (props) => <Ionicons {...props} name="home" />,
              }}
            >
              {(props) => (
                <AllChat
                  {...props}
                  socket={socket}
                  setSocket={setSocket}
                  username={username}
                />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="Privado"
              options={{
                tabBarIcon: (props) => <Ionicons {...props} name="person" />,
              }}
            >
              {(props) => (
                <ListUsers {...props} socket={socket} username={username} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <Login setSocket={setSocket} setUsername={setUsername} />
      )}
    </>
  );
}

export default Home;
