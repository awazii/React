
# Understanding `useState` with Function Initializers & `getSavedValue`

---

## 1. Rule of `useState` with Function Initializers

- **Passing a value:**
  ```js
  const [count, setCount] = useState(0);
  ```
  React directly uses `0`.

- **Passing a function:**
  ```js
  const [count, setCount] = useState(() => 5);
  ```
  React **calls the function once** (only on the first render).  
  This is called **lazy initialization** and is useful when computing the initial value is expensive.

✅ Key rule:  
If you give `useState` a function, React executes it only once (on mount) to get the initial state.

---

## 2. The `getSavedValue` Function

```js
function getSavedValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue !== null) return savedValue;

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
}
```

### How it works:
1. `localStorage.getItem(key)` → gets the saved string (or `null` if none).  
2. `JSON.parse(...)` → converts the string back into a JavaScript value.  
   - Example: `"5"` → `5`, `"[1,2,3]"` → `[1,2,3]`.  
3. If `savedValue` exists → return it.  
   This ensures you **get the latest parsed value**, not just the raw string.  
4. If no saved value → check if `initialValue` is a function.  
   - If yes, call it.  
   - If not, return it directly.

---

## 3. Getting the Parsed Value on Next Renders

When you call:
```js
const [value, setValue] = useState(() => getSavedValue(key, initialValue));
```

- On **first render**, React calls `getSavedValue` → returning either the parsed localStorage data or `initialValue`.  
- On **next renders**, React does **not** call `getSavedValue` again (it remembers the state).  
- But if you update state (`setValue`), the `useEffect` hook saves the new value to localStorage (as a string).  

Next time you reload the page (or remount the component), `getSavedValue` will parse the updated localStorage data again → giving you the **new parsed value**.

---

### 🔑 Key Takeaway
- `useState` with a function runs that function once for initialization.  
- `getSavedValue` ensures you always restore the **parsed** data from localStorage.  
- On future renders, React uses the current state, and on page reload, you get the updated parsed data back from storage.
