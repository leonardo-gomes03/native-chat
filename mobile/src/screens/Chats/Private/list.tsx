import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { Socket } from "socket.io-client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrivateChat from "./chat";

const Stack = createNativeStackNavigator();

// Defina os tipos para os parâmetros
interface ListProps {
  socket: Socket;
  username: string;
}

interface ListItem {
  id: string;
  data: {
    username: string;
  };
}
export default function ListUsers({ socket }: ListProps) {
  const [users, setUsers] = useState<ListItem[]>([]);
  const [first, setfirst] = useState(1);

  useEffect(() => {
    socket.emit("allusers", "");
    socket.on("allusers", (dados) => {
      setUsers(dados);
      // console.log(dados);
    });
  }, []);

  return (
    <>
      <Stack.Navigator
        initialRouteName="Usuarios"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Usuarios">
          {(props) => {
            return (
              <View className="flex-1" {...props}>
                <View className="flex-1  gap-3">
                  {users.map((item, index) => (
                    <View
                      className="  px-3 py-2"
                      key={index}
                      onTouchStart={() =>
                        props.navigation.navigate("Private", item)
                      }
                    >
                      <Text className="text-xl">{item.data?.username}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="Private">
          {(props) => <PrivateChat {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  );
}
