import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getDBConnection, createTable, getUsers, addUser, updateUser, deleteUser } from '../../db/database'

export interface User {
  id?: number
  name: string
  email: string
}

interface UserState {
  users: User[]
  loading: boolean
  error?: string
}

const initialState: UserState = {
  users: [],
  loading: false,
}

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const db = await getDBConnection()
  await createTable(db)
  return await getUsers(db)
})

export const createUser = createAsyncThunk('users/create', async (user: Omit<User, 'id'>) => {
  const db = await getDBConnection()
  await addUser(db, user.name, user.email)
  return await getUsers(db)
})

export const editUser = createAsyncThunk('users/update', async (user: User) => {
  if (!user.id) throw new Error('User ID required for update')
  const db = await getDBConnection()
  await updateUser(db, user.id, user.name, user.email)
  return await getUsers(db)
})

export const removeUser = createAsyncThunk('users/delete', async (id: number) => {
  const db = await getDBConnection()
  await deleteUser(db, id)
  return await getUsers(db)
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => { state.users = action.payload })
      .addCase(editUser.fulfilled, (state, action) => { state.users = action.payload })
      .addCase(removeUser.fulfilled, (state, action) => { state.users = action.payload })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default usersSlice.reducer
