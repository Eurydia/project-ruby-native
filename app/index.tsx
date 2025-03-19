import { useGreedySolver } from "@/hooks/useGreedySolver";
import { CardState } from "@/types/cards";
import { useState } from "react";
import {
  Button,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [items, setItems] = useState(() => {
    const init = new Array<boolean>(16);
    init.fill(false);
    return init;
  });
  const [moves, setMoves] = useState("3");
  const [result, setResult] = useState<CardState | null>(
    null
  );

  const solver = useGreedySolver();

  return (
    <ScrollView
      style={{
        padding: 16,
        gap: 8,
        display: "flex",
        flexDirection: "column",
        margin: 8,
      }}
    >
      <TextInput
        keyboardType="number-pad"
        editable
        value={moves}
        onChangeText={(value) => setMoves(value)}
      />
      <Button
        title="Solve"
        onPress={() => {
          setResult(
            solver({
              history: [],
              states: items,
              moves: Number.parseInt(moves),
            })
          );
        }}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {items.map((item, index) => {
          const isActive = item;
          return (
            <Pressable
              onPress={() =>
                setItems((prev) => {
                  const next = [...prev];
                  next[index] = !prev[index];
                  return next;
                })
              }
              key={"input-item" + index}
              style={{
                width: "25%",

                padding: 5,
                backgroundColor: isActive
                  ? "skyblue"
                  : "darkgrey",
                aspectRatio: "1/1",
                height: "100%",
                borderColor: "slateblue",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Text>{isActive ? "X" : ""}</Text>
            </Pressable>
          );
        })}
      </View>
      {result !== null && (
        <View>
          <Text>Moves: {result.moves}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {new Array(16).fill(16).map((_, index) => {
              const order =
                result.history.findIndex(
                  (history) => history.latestMove === index
                ) + 1;
              const hasOrder = order > 0;
              return (
                <View
                  style={{
                    height: "100%",
                    alignItems: "center",
                    width: "25%",
                    aspectRatio: "1/1",
                    padding: 5,

                    backgroundColor: hasOrder
                      ? "cornflowerblue"
                      : "darkgrey",
                    justifyContent: "center",
                  }}
                  key={"result-itme" + index}
                >
                  <Text
                    style={{
                      fontWeight: "900",
                    }}
                  >
                    {hasOrder && order.toString()}
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                    }}
                  >
                    {hasOrder &&
                      `${
                        result.history[order - 1].moves
                      }/3`}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

