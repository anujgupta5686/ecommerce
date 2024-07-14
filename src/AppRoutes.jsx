import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./page/admin/add-product";
import { useSelector } from "react-redux";
const PrivateRoute = ({ element, authority }) => {
  const user = useSelector((state) => state.user);
  const userDataIni = user?.data?.user?.role;
  console.log("User App.jsx::", user?.data?.user?.role);
  // const userRole = localStorage.getItem("token");
  return authority.includes(userDataIni) ? element : <Navigate to="/login" />;
};

const routesConfig = [
  // Admin Routes
  {
    path: "Add Product",
    element: <AddProduct />,
    authority: ["Admin"],
  },
];

const generateRoutes = (routes) => {
  return routes.map((route, index) => {
    const RouteElement = (
      <PrivateRoute element={route.element} authority={route.authority} />
    );
    return (
      <Route key={index} path={route.path} element={RouteElement}>
        {route.children && generateRoutes(route.children)}
      </Route>
    );
  });
};

const AppRoutes = () => {
  return <Routes>{generateRoutes(routesConfig)}</Routes>;
};

export default AppRoutes;
