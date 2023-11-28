import { View } from "react-native";

export default function SafeArea({ children }) {
  return (
    <View className="pt-12 bg-red-500 flex-1 w-full h-full">{children}</View>
  );
}
