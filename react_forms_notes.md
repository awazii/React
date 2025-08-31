# React Hook Form (RHF) Notes

React Hook Form is a lightweight library for managing forms in React with minimal re-renders and easy validation.

---

## 1. Basic Usage
```jsx
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register("email", {
        required: "Email is required",
        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
      })} />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Key Concepts
- **`register`** → connects inputs to RHF.
- **`handleSubmit`** → validates & runs callback on valid submission.
- **`errors`** → contains validation errors for each field.
- **Validation** → built-in and custom rules.

---

## 2. Validation Rules (Cheatsheet)

### Built-in Rules
```jsx
<input {...register("username", { required: true })} />
<input {...register("age", { min: 18, max: 99 })} />
<input {...register("password", { minLength: 6, maxLength: 20 })} />
<input {...register("email", { pattern: /^\S+@\S+$/i })} />
```

| Rule       | Description                         | Example |
|------------|-------------------------------------|---------|
| `required` | Field must not be empty             | `{ required: "Field required" }` |
| `min`      | Minimum numeric value               | `{ min: 18 }` |
| `max`      | Maximum numeric value               | `{ max: 99 }` |
| `minLength`| Minimum string length               | `{ minLength: 6 }` |
| `maxLength`| Maximum string length               | `{ maxLength: 20 }` |
| `pattern`  | Must match regex pattern            | `{ pattern: /regex/ }` |

---

## 3. Common Patterns

### Email
```js
/^\S+@\S+$/i
```
Matches basic email format.

### Password (min 8 chars, 1 number, 1 letter)
```js
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
```

### Only Letters
```js
/^[A-Za-z]+$/i
```

### Only Numbers
```js
/^\d+$/
```

### Username (letters, numbers, underscores, 3-16 chars)
```js
/^[a-zA-Z0-9_]{3,16}$/
```

---

## 4. Error Handling
```jsx
{errors.name && <p>{errors.name.message}</p>}
```
Each validation rule can return a **custom error message**.

---

## 5. Default Values
```jsx
const { register, handleSubmit } = useForm({
  defaultValues: {
    name: "Awazii",
    email: "test@mail.com"
  }
});
```

---

## 6. Watching & Resetting
```jsx
const { register, handleSubmit, watch, reset } = useForm();

const password = watch("password");

// Reset form after submit
reset();
```

---

## 7. Controller (For Custom Inputs)
For inputs like Material UI or custom components, use `Controller`.

```jsx
import { useForm, Controller } from "react-hook-form";

<Controller
  name="dob"
  control={control}
  render={({ field }) => <DatePicker {...field} />}
/>
```

---

## 8. Asynchronous Validation
```jsx
<input {...register("username", {
  validate: async (value) => {
    const exists = await checkUsername(value);
    return exists ? "Username already taken" : true;
  }
})} />
```
## 9. trigger
---jsx
<input type="text" onBlur={() => trigger("name")} />

## 10. Integration with APIs
```jsx
const onSubmit = async (data) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
};
```

---

## Key Takeaways
- Minimal re-renders → super performant.
- Easy validation → built-in + custom rules.
- Supports regex patterns for advanced checks.
- Flexible with external components via `Controller`.
- Works great with APIs for submission.

---
✅ **React Hook Form = clean, fast, and powerful form handling in React.**

