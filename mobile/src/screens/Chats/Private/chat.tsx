import { Text, View } from "react-native";

export default function PrivateChat({ navigation, route }) {
  const data = route.params;
  console.log(data.data.username);
  return (
    <View>
      <Text>Ola</Text>
    </View>
  );
}
