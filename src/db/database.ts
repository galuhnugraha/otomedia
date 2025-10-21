import SQLite from 'react-native-sqlite-storage'

SQLite.enablePromise(true)

export const getDBConnection = async () => {
  return await SQLite.openDatabase({ name: 'appcrud.db', location: 'default' })
}

export const createTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      pesan TEXT NOT NULL
    );
  `
  await db.executeSql(query)
}

export const getUsers = async (db: SQLite.SQLiteDatabase) => {
  const results = await db.executeSql('SELECT * FROM users;')
  const users: { id: number; name: string; email: string }[] = []
  results.forEach((result: { rows: { length: number; item: (arg0: number) => { id: number; name: string; email: string } } }) => {
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i))
    }
  })
  return users
}

export const addUser = async (db: SQLite.SQLiteDatabase, name: string, email: string, pesan: string) => {
  const query = 'INSERT INTO users (name, email,pesan) VALUES (?, ?,?);'
  await db.executeSql(query, [name, email,pesan])
}

export const updateUser = async (db: SQLite.SQLiteDatabase, id: number, name: string, email: string,pesan: string) => {
  const query = 'UPDATE users SET name = ?, email = ?, pesan = ? WHERE id = ?;'
  await db.executeSql(query, [name, email,pesan, id])
}

export const deleteUser = async (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'DELETE FROM users WHERE id = ?;'
  await db.executeSql(query, [id])
}

export const getUserById = async (db: SQLite.SQLiteDatabase, id: number) => {
  try {
    const results = await db.executeSql('SELECT * FROM users WHERE id = ?;', [id]);
    if (results.length > 0 && results[0].rows.length > 0) {
      const user = results[0].rows.item(0);
      return user;
    }
    return null;
  } catch (error) {
    console.error('Gagal mengambil user berdasarkan ID', error);
    throw error;
  }
};

export const dropUsersTable = async () => {
  try {
    const db = await getDBConnection();
    await db.executeSql('DROP TABLE IF EXISTS users;');
    console.log('Table "users" berhasil dihapus!');
  } catch (error) {
    console.error('Gagal menghapus table "users"', error);
  }
};