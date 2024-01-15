import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import "./style/index.scss";
import AddTask from "./components/addTask/AddTask";
import Menu from "./components/menu/Menu";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="add" element={<AddTask />} />
      <Route path="edit/:id" element={<AddTask />} />

      <Route path="menu" element={<Menu />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
