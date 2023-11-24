import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Message {
  author: string;
  content: string;
}

export default function Chat({ navigation, route }) {
  const { username } = route?.params; // Chegando

  const messages: Message[] = [
    {
      author: "Person 1",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, non amet facilis accusamus enim, nam voluptatum laudantium at odit distinctio debitis odio ipsum velit excepturi in quis voluptates labore sed.",
    },
    {
      author: "Person 2",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, non amet facilis accusamus enim, nam voluptatum laudantium at odit distinctio debitis odio ipsum velit excepturi in quis voluptates labore sed.",
    },
    {
      author: "Person 3",
      content: "Oi",
    },
    {
      author: "Person 2",
      content: "Oi",
    },
  ];

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
      <View className="w-full py-2 bg-zinc-500 flex flex-row items-center px-3 mt-3">
        <TextInput className="flex-1" placeholder="Digite sua mensagem..." />
        <TouchableOpacity>
          <Text className="bg-blue-500 px-4 py-2 rounded-md">Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OtherMessage(props: Message) {
  return (
    <View className="items-start mt-3 ml-2">
      <View className="bg-green-400 px-2 py-1 rounded-r-lg rounded-b-lg max-w-[75vw]">
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
