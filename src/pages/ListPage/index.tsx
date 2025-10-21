import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import HeaderComp from "../../component/HeaderComp";
import { getDBConnection, getUsers, deleteUser, getUserById } from "../../db/database"; 
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ListPageScreen = ({ navigation }: any) => {
  const [items, setItems] = useState<any[]>([]);
  const [db, setDb] = useState<any>(null);

  // Inisialisasi DB
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await getDBConnection();
        setDb(database);
      } catch (error) {
        console.error("DB Error: ", error);
      }
    };
    initDB();
  }, []);

  // Refresh data setiap screen fokus
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (db) {
          try {
            const users = await getUsers(db);
            setItems(users);
          } catch (error) {
            console.error("Get Users Error: ", error);
          }
        }
      };
      fetchData();
    }, [db])
  );

  const handleEdit = async (id: number) => {
    if (!db) return;

    try {
      const user = await getUserById(db, id);
      if (user) {
        navigation.navigate("FormPage", { item: user });
      } else {
        Alert.alert("Info", "User tidak ditemukan");
      }
    } catch (error) {
      console.error("Get User By ID Error: ", error);
    }
  };


  const handleDelete = (id: number) => {
    Alert.alert("Konfirmasi", "Apakah kamu yakin ingin menghapus data ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        onPress: async () => {
          try {
            if (db) {
              await deleteUser(db, id);
              const users = await getUsers(db);
              setItems(users);
            }
          } catch (error) {
            console.error("Delete User Error: ", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.label}>Nama Lengkap:</Text>
      <Text style={styles.text}>{item.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{item.email}</Text>

      <Text style={styles.label}>Pesan:</Text>
      <Text style={styles.text}>{item.pesan}</Text>

      <View style={{ alignItems: "center", marginTop: 25 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: Dimensions.get("screen").width * 0.8,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#F97316",
              width: Dimensions.get("screen").width * 0.38,
              paddingVertical: 10,
              alignItems: "center",
              borderRadius: 8,
            }}
            onPress={() => {
              handleEdit(item.id)
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/editing.png")}
                style={{ width: 20, height: 20, marginRight: 8 }}
                tintColor={"white"}
              />
              <Text style={{ color: "white",fontFamily:"Poppins-SemiBold" }}>Edit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#F97316",
              width: Dimensions.get("screen").width * 0.38,
              paddingVertical: 10,
              alignItems: "center",
              borderRadius: 8,
            }}
            onPress={() => handleDelete(item.id)}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../../assets/delete.png")}
                style={{ width: 20, height: 20, marginRight: 8 }}
                tintColor={"#F97316"}
              />
              <Text style={{ color: "#F97316",fontFamily:"Poppins-SemiBold" }}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleFloatingPress = () => {
    navigation.navigate("FormPage");
  };

  return (
    <View style={styles.container}>
      <HeaderComp title="List Page" />

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...styles.listContent,
          paddingBottom: height * 0.15,
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Image source={require("../../assets/empty.png")} style={{height: 210,width:210}}/>
            <Text style={styles.emptyText}>Data masih kosong</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButtonContainer}
        onPress={handleFloatingPress}
      >
        <View style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContent: {
    paddingVertical: height * 0.03,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: width * 0.9,
    padding: width * 0.05,
    borderRadius: 12,
    marginBottom: height * 0.02,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("screen").height * 0.15
  },
  emptyText: {
    fontSize: width * 0.05,
    color: "black",
    fontWeight: "500",
    fontFamily:"Poppins-Regular" 
  },

  label: {
    fontSize: width * 0.035,
    color: "#555",
    fontWeight: "500",
    marginTop: height * 0.01,
    fontFamily: "Poppins-Regular"
  },
  text: {
    fontSize: width * 0.04,
    color: "#222",
    marginTop: height * 0.003,
    fontFamily: "Poppins-Regular"
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: height * 0.04,
    right: width * 0.05,
  },
  floatingButton: {
    backgroundColor: "#F97316",
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: (width * 0.14) / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    elevation: 6,
  },
  floatingButtonText: {
    color: "white",
    fontSize: width * 0.08,
    fontWeight: "bold",
  },
});
