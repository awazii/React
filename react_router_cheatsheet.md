# React Router Cheatsheet 🛣️

React Router lets you create single-page applications (SPAs) with multiple views and navigation without reloading the page.

---

## 🚀 Installation
```bash
npm install react-router-dom
```

---

## 🔑 Core Imports
```js
import { createBrowserRouter, RouterProvider, Route, Outlet, NavLink, useParams, useNavigate, useLoaderData, Navigate } from "react-router-dom";
```

---

## 🛠️ Setup with `createBrowserRouter`
```jsx
const router = createBrowserRouter([
  {
    element: <Main />, // Layout wrapper
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/profile/:id", element: <Profile /> }, // Dynamic route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

---

## 📦 Layouts with `<Outlet />`
`Outlet` is where child routes get rendered inside a parent layout.

```jsx
const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />  {/* children go here */}
      <Footer />
    </div>
  );
};
```

---

## 🧭 Navigation
### `NavLink` (active styling)
```jsx
<NavLink 
  to="/about" 
  className={({ isActive }) => isActive ? "text-blue-500" : "text-gray-500"}
>
  About
</NavLink>
```

### `useNavigate`
```jsx
const navigate = useNavigate();
<button onClick={() => navigate("/login")}>Go to Login</button>
```

---

## 🎯 URL Params with `useParams`
```jsx
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  return <h1>Profile of user {id}</h1>;
}
```

---

## 🔐 Auth Context Example
```jsx
import { createContext, useState } from "react";

export const auth = createContext();

const Main = () => {
  const [user, setUser] = useState(null);

  const authValue = {
    user,
    login: () => setUser("Awazii logged in!"),
    logout: () => setUser(null),
  };

  return (
    <auth.Provider value={authValue}>
      <Navbar />
      <Outlet />
      <Footer />
    </auth.Provider>
  );
};
```

---

## 🔒 Protected Routes (Basic Example)
```jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../App";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(auth);
  return user ? children : <Navigate to="/login" replace />;
};

// Usage in routes
{
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}
```

---

## ⚡ Loaders (Data Fetching)
- Run **before** rendering the route.
- Use `useLoaderData()` inside the component.

```jsx
import { useLoaderData } from "react-router-dom";

async function usersLoader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

function Users() {
  const users = useLoaderData();
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
    loader: usersLoader,
  }
]);
```

---

## 🖊️ Actions (Form Handling)
- Perfect for POST/PUT/DELETE requests.
- Use `useActionData()` to get response.

```jsx
async function formAction({ request }) {
  const data = await request.formData();
  const name = data.get("name");
  return { message: `Hello ${name}` };
}

function ContactForm() {
  const actionData = useActionData();
  return (
    <form method="post">
      <input name="name" />
      <button type="submit">Submit</button>
      {actionData && <p>{actionData.message}</p>}
    </form>
  );
}

const router = createBrowserRouter([
  {
    path: "/contact",
    element: <ContactForm />,
    action: formAction,
  }
]);
```

---

## ⚠️ Error Handling with `errorElement`
```jsx
const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />,
    loader: usersLoader,
    errorElement: <h1>❌ Could not load data</h1>
  }
]);
```

---

## 📡 Passing Props via Routes
```jsx
{
  path: "/products",
  element: <Products api={true} />
}
```

---

## 📖 Quick Recap
- **RouterProvider** → wraps whole app
- **createBrowserRouter** → define routes
- **Outlet** → render child routes
- **NavLink** → active navigation link
- **useParams** → read URL params
- **useNavigate** → navigate programmatically
- **ProtectedRoute** → auth-based routing
- **Loader** → fetch data before render
- **Action** → handle form submissions
- **errorElement** → handle errors per route

---

✨ With this, you can handle **multi-page layouts, authentication, data fetching, and dynamic routing** all in one place.

