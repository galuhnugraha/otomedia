import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import HeaderComp from "../../component/HeaderComp";
import { getDBConnection, createTable, addUser, updateUser } from "../../db/database"

const FormPageScreen = ({ navigation,route }: any) => {
  console.log(route,"route");
  const [name, setName] = useState(route?.params?.item?.name);
  const [email, setEmail] = useState(route?.params?.item?.email);
  const [message, setMessage] = useState(route?.params?.item?.pesan);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await getDBConnection();
        setDb(database);
        await createTable(database); 
      } catch (error) {
        console.error("DB Error: ", error);
      }
    };
    initDB();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert("Peringatan", "Harap isi semua kolom!");
      return;
    }

    try {
      if (db) {
        if(route.params === undefined) {
          await addUser(db, name, email, message);
          navigation.goBack()
          setName("");
          setEmail("");
          setMessage("");
        } else {
          await updateUser(db, route?.params?.item?.id, name, email, message);

          navigation.goBack()
        }
  
      }
    } catch (error) {
      console.error("Add User Error: ", error);
      Alert.alert("Error", "Gagal menyimpan data!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <HeaderComp
        title="Form Page"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama anda...."
              value={name}
              onChangeText={setName}
              placeholderTextColor={"gray"}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="masukan email anda...."
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={"gray"}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Pesan</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tulis pesan kamu di sini..."
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
              placeholderTextColor={"gray"}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default FormPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 20, 
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 14, 
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    fontFamily:"Poppins-Regular",
    color: "#444",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12, 
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    fontFamily:"Poppins-Regular" 
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F8F9FA",
  },
  button: {
    backgroundColor: "#F97316",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16, 
    fontWeight: "600",
    fontFamily:"Poppins-Regular" 
  },
});