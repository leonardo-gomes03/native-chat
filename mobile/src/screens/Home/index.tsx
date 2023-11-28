import { JSXElementConstructor, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home({ navigation, setSocket }) {
  const [name, setName] = useState<string>("");

  const disabled = !(name.length > 3);

  const handleGoToChat = async () => {
    const wSocket = io("http://10.0.0.120:3001");
    wSocket.connect();
    wSocket.emit("set_username", name);
    setSocket(wSocket);
    navigation.navigate("Chat", { username: name });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-52 flex items-center gap-4">
        <Text className="text-lg">Bem vindo ao chat</Text>
        <TextInput
          placeholder="Coloque seu nome..."
          className="py-1 px-3 border-2 border-gray-300 rounded-md w-full "
          onChange={(e) => setName(e.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={() => handleGoToChat()}
          className={`${
            disabled ? "bg-zinc-400" : "bg-blue-800"
          } px-4 py-2 rounded-md w-full`}
          disabled={disabled}
        >
          <Text className="text-white text-center py-1 font-bold">
            Ir para Chat
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
