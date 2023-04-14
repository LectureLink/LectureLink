import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Class from "../components/Class";
import colors from "../styles/colors";

function StudentClasses() {
  const classes = [
    { id: 1, title: "ENTR 3000" },
    { id: 2, title: "MATH 1010" },
    { id: 3, title: "PHYS 2020" },
    { id: 4, title: "ENGL 2010" },
    { id: 5, title: "HIST 2000" },
    { id: 6, title: "CS 1400" },
    { id: 7, title: "CS 1400" },
    { id: 8, title: "CS 1400" },
    { id: 9, title: "CS 1400" },
  ];

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo2.png")} />
      <Text style={styles.title}>My Classes</Text>
      <ScrollView style={styles.scrollView}>
        {classes.map((c) => (
          <Class key={c.id} title={c.title} />
        ))}
        <TouchableOpacity>
          <Text style={styles.addClassText}>Add class +</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBlue,
  },
  logo: {
    height: 61,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addClassText: {
    color: colors.primaryBlue,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default StudentClasses;
