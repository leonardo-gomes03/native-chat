import { useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Socket, io } from "socket.io-client";

interface Message {
  author: string;
  content: string;
}

// Defina os tipos para os parâmetros
interface ChatProps {
  navigation: any; // Substitua "any" pelos tipos específicos necessários
  route: any; // Substitua "any" pelos tipos específicos necessários
  socket: Socket; // Substitua "any" pelo tipo específico necessário para o objeto socket
}

export default function Chat({ navigation, route, socket }: ChatProps) {
  const { username } = route?.params;

  // console.log(socket);

  const [input, setInput] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    socket.emit("message", input);
    setInput("");
  };

  useEffect(() => {
    // Escute o evento 'mensagem' do servidor
    socket.on("receive_message", (dados) => {
      setMessages((prev) => [
        ...prev,
        { author: dados?.author, content: dados?.content },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View className="bg-zinc-200 flex-1 justify-end">
      <View>
        {messages.map((item, index) =>
          item.author == username ? (
            <MyMessage content={item.content} key={index} />
          ) : (
            <OtherMessage
              content={item.content}
              author={item.author}
              key={index}
            />
          )
        )}
      </View>
      <View className="p-2 bg-zinc-300 flex flex-row items-center my-3 mx-2 rounded-lg">
        <TextInput
          value={input}
          onChange={(e) => setInput(e.nativeEvent.text)}
          className="flex-1"
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity>
          <Text
            className="bg-blue-700 px-4 py-2 rounded-md text-white"
            onPress={() => handleSendMessage()}
          >
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OtherMessage(props: Message) {
  return (
    <View className="items-start mt-3 ml-2">
      <View className="bg-green-300 px-2 py-1 rounded-r-lg rounded-b-lg max-w-[75vw]">
        <Text className="font-bold">{props.author}</Text>
        <Text className="text-slate-900">{props.content}</Text>
      </View>
    </View>
  );
}

function MyMessage(props: { content: string }) {
  return (
    <View className="items-end mt-3 mr-2">
      <View className="bg-white px-2 py-1 rounded-l-lg rounded-b-lg max-w-[75vw]">
        <Text>{props.content}</Text>
      </View>
    </View>
  );
}
