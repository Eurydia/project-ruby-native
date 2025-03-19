import { useGreedySolver } from "@/hooks/useGreedySolver";
import { CardState } from "@/types/cards";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Divider,
  Icon,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";

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
        gap: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextInput
        editable
        mode="outlined"
        label="Moves"
        keyboardType="number-pad"
        value={moves}
        onChangeText={(value) => setMoves(value)}
        placeholder="Moves"
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {items.map((item, index) => {
          const isSelected = item;
          return (
            <View
              key={"input-item" + index}
              style={{
                width: "24%",
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1%",
              }}
            >
              <TouchableRipple
                onPress={() =>
                  setItems((prev) => {
                    const next = [...prev];
                    next[index] = !prev[index];
                    return next;
                  })
                }
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "1/1",
                  backgroundColor: isSelected
                    ? "#7986cb"
                    : "#1a237e",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>
                  {isSelected && (
                    <Icon
                      source="check"
                      allowFontScaling
                      size={20}
                    />
                  )}
                </Text>
              </TouchableRipple>
            </View>
          );
        })}
      </View>
      <Button
        mode="outlined"
        onPress={() => {
          setResult(
            solver({
              history: [],
              states: items,
              moves: Number.parseInt(moves),
            })
          );
        }}
      >
        Solve
      </Button>
      {result !== null && (
        <View>
          <Divider />
          <Text variant="displayMedium">
            Moves: {result.moves}
          </Text>
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

              const msg = hasOrder
                ? `${order} (${
                    result.history[order - 1].moves
                  }/3)`
                : "";
              return (
                <View
                  style={{
                    height: "100%",
                    alignItems: "center",
                    width: "25%",
                    aspectRatio: "1/1",
                    padding: 5,

                    backgroundColor: hasOrder
                      ? "#7986cb"
                      : "#1a237e",
                    justifyContent: "center",
                  }}
                  key={"result-itme" + index}
                >
                  {hasOrder && (
                    <Text variant="labelLarge">{msg}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

