import SQLite from 'react-native-sqlite-storage'

SQLite.enablePromise(true)

export const getDBConnection = async () => {
  return await SQLite.openDatabase({ name: 'crudapp.db', location: 'default' })
}

export const createTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
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

export const addUser = async (db: SQLite.SQLiteDatabase, name: string, email: string) => {
  const query = 'INSERT INTO users (name, email) VALUES (?, ?);'
  await db.executeSql(query, [name, email])
}

export const updateUser = async (db: SQLite.SQLiteDatabase, id: number, name: string, email: string) => {
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?;'
  await db.executeSql(query, [name, email, id])
}

export const deleteUser = async (db: SQLite.SQLiteDatabase, id: number) => {
  const query = 'DELETE FROM users WHERE id = ?;'
  await db.executeSql(query, [id])
}
