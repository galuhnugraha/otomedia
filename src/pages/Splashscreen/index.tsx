import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ✅ Definisikan tipe parameter untuk stack kamu
type RootStackParamList = {
  Splashscreen: undefined;
  ListPage: undefined;
  FormPage: undefined;
};

// ✅ Definisikan props untuk komponen
type Props = NativeStackScreenProps<RootStackParamList, "Splashscreen">;

const SplashscreenPage: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Jalankan animasi paralel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Setelah animasi selesai, tunggu sebentar lalu navigasi
      setTimeout(() => {
        navigation.replace("ListPage");
      }, 1000);
    });
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require("../../assets/todo.png")}
          style={styles.logo}
          resizeMode="contain"
          tintColor="white"
        />
        <Text style={styles.title}>Tugas Otomedia</Text>
      </Animated.View>

      <Text style={styles.bottomText}>Versi 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F97316",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Dimensions.get("screen").height * 0.3,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: Dimensions.get("screen").width * 0.25,
    height: Dimensions.get("screen").width * 0.25,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
  bottomText: {
    color: "white",
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    fontFamily: "Poppins-Regular",
  },
});

export default SplashscreenPage;