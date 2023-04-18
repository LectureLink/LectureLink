import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

const SessionInfo = (props) => {
  const formattedDate = new Date(props.date).toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.avg}>AVG: {props.avgEngagement.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    width: "80%",
    marginLeft: 25,
  },
  date: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  avg: {
    fontSize: 16,
    color: colors.primaryBlue,
    fontWeight: "bold",
  },
});

export default SessionInfo;
