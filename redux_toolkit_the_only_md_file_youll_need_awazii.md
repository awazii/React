# Redux Toolkit – The Only MD File You’ll Need

> A practical, batteries‑included cheat sheet for modern Redux with RTK & RTK Query. Minimal boilerplate, maximum clarity.

---

## TL;DR
- Use **`configureStore`** + **`createSlice`**. No hand‑rolled reducers or action types.
- Async? Prefer **`createAsyncThunk`** or **RTK Query** (for data fetching/caching).
- Keep state **serializable** and **tiny**; derive with **selectors**.
- Co-locate by **feature**: `/features/todos/todosSlice.js`.

---

## Install
```bash
npm i @reduxjs/toolkit react-redux
```

---

## Project Wiring (React)
```js
// src/store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'

export const store = configureStore({
  reducer: { counter: counterReducer },
})
```

```jsx
// src/main.jsx (or index.js)
import { Provider } from 'react-redux'
import { store } from './store'

<Provider store={store}>
  <App />
</Provider>
```

---

## Slices 101
```js
// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    addBy: (state, action) => { state.value += action.payload },
    reset: () => initialState,
  },
})

export const { increment, decrement, addBy, reset } = counterSlice.actions
export default counterSlice.reducer
```

### Using in Components
```jsx
import { useDispatch, useSelector } from 'react-redux'
import { increment, addBy } from './counterSlice'

export default function Counter() {
  const value = useSelector((s) => s.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(addBy(5))}>+5</button>
    </div>
  )
}
```

---

## Async with `createAsyncThunk`
```js
// src/features/auth/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = { user: null, status: 'idle', error: null }

export const login = createAsyncThunk(
  'auth/login',
  async (cred, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cred),
      })
      if (!res.ok) throw new Error('Invalid credentials')
      return await res.json()
    } catch (e) {
      return rejectWithValue(e.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { logout: (s) => { s.user = null } },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(login.fulfilled, (s, a) => {
        s.status = 'succeeded'; s.user = a.payload
      })
      .addCase(login.rejected, (s, a) => {
        s.status = 'failed'; s.error = a.payload || 'Login failed'
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
```

---

## RTK Query (Data Fetching + Caching)
```js
// src/services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Todos'],
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => '/todos',
      providesTags: (result) =>
        result ? [
          ...result.map(({ id }) => ({ type: 'Todos', id })),
          { type: 'Todos', id: 'LIST' }
        ] : [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodo: build.mutation({
      query: (body) => ({ url: '/todos', method: 'POST', body }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    toggleTodo: build.mutation({
      query: (id) => ({ url: `/todos/${id}/toggle`, method: 'PATCH' }),
      invalidatesTags: (r, e, id) => [{ type: 'Todos', id }],
    }),
  }),
})

export const { useGetTodosQuery, useAddTodoMutation, useToggleTodoMutation } = api
```

```js
// src/store.js
import { configureStore } from '@reduxjs/toolkit'
import { api } from './services/api'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
})
```

---

## Selectors & Memoization
```js
import { createSelector } from '@reduxjs/toolkit'

const cartItems = (s) => s.cart.items
export const cartTotal = createSelector([cartItems], (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
)
```

---

## Entity Adapter
```js
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title)
})

const slice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    upsertMany: postsAdapter.upsertMany,
    addOne: postsAdapter.addOne,
    removeOne: postsAdapter.removeOne,
  }
})

export const postsSelectors = postsAdapter.getSelectors((s) => s.posts)
```

---

## Listener Middleware
```js
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { addToCart, removeFromCart } from './cartSlice'

export const listenerMw = createListenerMiddleware()
listenerMw.startListening({
  matcher: isAnyOf(addToCart, removeFromCart),
  effect: async (action, api) => {
    const state = api.getState()
    // analytics, sync, toasts, debounce, etc.
  }
})
```

---

## Persisting State (optional)
```js
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = { key: 'root', storage, whitelist: ['auth', 'cart'] }
const rootReducer = combineReducers({ auth, cart, [api.reducerPath]: api.reducer })

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefault) => getDefault({ serializableCheck: false }).concat(api.middleware)
})

export const persistor = persistStore(store)
```

---

## Testing
```js
import reducer, { increment, addBy } from './counterSlice'

test('increment', () => {
  expect(reducer({ value: 0 }, increment())).toEqual({ value: 1 })
})

test('addBy', () => {
  expect(reducer({ value: 1 }, addBy(4))).toEqual({ value: 5 })
})
```

---

## Quick Checklist
- [ ] Store created with `configureStore`
- [ ] Slices only (no manual reducers)
- [ ] Async via RTKQ / `createAsyncThunk`
- [ ] Selectors for computed values
- [ ] DevTools works, no non‑serializable warnings
- [ ] Folder by feature
- [ ] Tests for reducers

---

**You’re set.** Build features, not boilerplate. 💪

