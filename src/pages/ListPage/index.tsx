import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ListPageScreen = ({ navigation }: any) => {
  const [items, setItems] = useState([
    { id: "1", name: "Produk A", description: "Deskripsi produk A" },
    { id: "2", name: "Produk B", description: "Deskripsi produk B" },
    { id: "3", name: "Produk C", description: "Deskripsi produk C" },
  ]);

  const handlePress = (item: any) => {
    Alert.alert("Detail Produk", `Kamu memilih: ${item.name}`);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Produk</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ListPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 20,
  },
  listContent: {
    alignItems: "center", 
    paddingBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: width * 0.9,
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#222",
  },
  desc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});