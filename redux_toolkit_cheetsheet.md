# Redux Toolkit Cheat Sheet

## 1. Core Setup
- **Install**: `npm install @reduxjs/toolkit react-redux`
- **Store**: use `configureStore()` instead of `createStore()`.
- **Provider**: wrap app with `<Provider store={store}>`.

```js
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import counterReducer from './counterSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

---

## 2. Slices
- Combines actions + reducers.
- `createSlice({ name, initialState, reducers })`

```js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => { state.value += action.payload },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

---

## 3. Using Redux State in Components

```js
import { useSelector, useDispatch } from 'react-redux'
import { increment } from './counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
    </>
  )
}
```

---

## 4. Async Logic (Thunk)
- Use `createAsyncThunk()`.

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  return res.json()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading' })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => { state.status = 'failed' })
  },
})

export default usersSlice.reducer
```

---

## 5. Best Practices
- Keep slices small and focused.
- Prefer thunks for async calls.
- Use the Redux DevTools for debugging.
- Co-locate slice + component logic if project is small.

---

## 6. Extras
- `createEntityAdapter` → for normalized state.
- `createListenerMiddleware` → for side effects.
- Use `combineReducers` if multiple reducers per slice needed.

---

✅ Learn these 6 parts and you’ll cover 90% of real-world Redux Toolkit usage.

