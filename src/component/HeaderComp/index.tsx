import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface HeaderCompProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

const HeaderComp: React.FC<HeaderCompProps> = ({
  title,
  showBack = false,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image source={require("../../assets/back.png")} style={{width: 25,height:25,marginRight:10}} resizeMode="contain" tintColor={"white"}/>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: "#F97316",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold"
  },
});

export default HeaderComp;