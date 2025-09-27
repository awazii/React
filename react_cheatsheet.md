
# 🚀 React Notes & Cheatsheet

A personal reference for all the concepts I’ve learned so far + essentials I’ll need in the future.  

---

## ⚡ Basics

### Creating a Component
```jsx
function MyComponent() {
  return <h1>Hello World</h1>
}
```

### JSX Rules
- Must return a single parent element (wrap in `<>...</>` if needed).
- Use `{}` to embed JS expressions.
- Class → `className`, for → `htmlFor`.

### Props
```jsx
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>
}
<Button label="Click Me" onClick={() => alert("Clicked")} />
```

### State
```jsx
import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

---

## 🎯 Hooks

### useState
- Manages component state.
- State updates are async.

### useEffect
```jsx
useEffect(() => {
  console.log("Runs after render")
  return () => console.log("Cleanup") // optional
}, [dependency])
```
- Dependencies decide when it runs.

### useRef
- Stores values without causing re-render.
- Can reference DOM nodes.

```jsx
const inputRef = useRef()
<input ref={inputRef} />
```

### useMemo
- Memoizes a **value** to avoid recalculating.
```jsx
const expensive = useMemo(() => slowCalc(num), [num])
```

### useCallback
- Memoizes a **function** to avoid unnecessary re-creations.
```jsx
const handleClick = useCallback(() => doSomething(), [])
```

### useContext
- Share data without prop drilling.
```jsx
const ThemeContext = createContext()
const value = useContext(ThemeContext)
```

---

## 🧠 React.memo
- Prevents re-render if props don’t change.
```jsx
const MyComp = React.memo(({ value }) => <div>{value}</div>)
```

---

## 🛠️ Future Essentials

### React Router (for navigation)
```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

<BrowserRouter>
  <nav><Link to="/about">About</Link></nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

### Context + Reducer (like mini Redux)
```jsx
const initial = { count: 0 }
function reducer(state, action) {
  switch (action.type) {
    case "inc": return { count: state.count + 1 }
    default: return state
  }
}
const [state, dispatch] = useReducer(reducer, initial)
```

### Custom Hooks
```jsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = () => setValue(v => !v)
  return [value, toggle]
}
```

### Forms & Controlled Inputs
```jsx
<input value={name} onChange={e => setName(e.target.value)} />
```

### Conditional Rendering
```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
{loading && <Spinner />}
```

### Lists & Keys
```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

---

## 🌐 Fetching Data (API)
```jsx
useEffect(() => {
  fetch("/api/data")
    .then(res => res.json())
    .then(setData)
}, [])
```

---

## 🎨 Styling
- **TailwindCSS** (preferred)
```jsx
<div className="bg-gray-800 text-white p-4 rounded-lg">Hello</div>
```

- **CSS Modules**
```jsx
import styles from "./App.module.css"
<div className={styles.container}></div>
```

---

## 📦 Performance Tips
- Use `React.memo` for pure components.
- Use `useMemo` / `useCallback` for expensive stuff.
- Lazy load with `React.lazy` + `Suspense`.

---

## 🧩 Things to Explore Next
- React Query (for API state management).
- Zustand or Redux Toolkit (global state).
- Server Components (Next.js trend).
- Error Boundaries.
- Suspense + Streaming for data fetching.
- Optimizing bundle size.
- forward ref.
- Use reducer.

---

✨ With this cheatsheet, I don’t need to Google the basics every time.
