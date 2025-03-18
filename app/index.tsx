import { useGreedySolver } from "@/hooks/useGreedySolver";
import { CardState } from "@/types/cards";
import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [items, setItems] = useState(() => {
    const init = new Array<boolean>(16);
    init.fill(false);
    return init;
  });
  const [result, setResult] = useState<CardState | null>(
    null
  );

  const solver = useGreedySolver();

  return (
    <ScrollView>
      <FlatList
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
        data={items}
        numColumns={4}
        renderItem={(item) => {
          const isActive = item.item;
          return (
            <Pressable
              onPress={() =>
                setItems((prev) => {
                  const next = [...prev];
                  next[item.index] = !prev[item.index];
                  return next;
                })
              }
              style={{
                width: "25%",
                height: "auto",
                aspectRatio: "1/1",
                display: "flex",
                padding: 5,
                backgroundColor: isActive
                  ? "skyblue"
                  : "darkgrey",
              }}
            >
              <Text>{item.item.toString()}</Text>
            </Pressable>
          );
        }}
      />
      <Button
        title="hi"
        onPress={() => {
          setResult(
            solver({
              history: [],
              states: items,
              moves: 3,
            })
          );
        }}
      />
      {result !== null && (
        <View style={{ padding: 16, width: " 100%" }}>
          <FlatList
            contentContainerStyle={{ gap: 2 }}
            columnWrapperStyle={{ gap: 2 }}
            data={new Array(16).fill(16)}
            numColumns={4}
            renderItem={(item) => {
              const order =
                result.history.indexOf(item.index) + 1;
              const hasOrder = order > 0;
              return (
                <Text
                  style={{
                    width: "25%",
                    height: "auto",
                    aspectRatio: "1/1",
                    padding: 5,
                    backgroundColor: hasOrder
                      ? "cornflowerblue"
                      : "darkgrey",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "900",
                    fontSize: 26,
                  }}
                >
                  {hasOrder && order.toString()}
                </Text>
              );
            }}
          />
        </View>
      )}
    </ScrollView>
  );
}

