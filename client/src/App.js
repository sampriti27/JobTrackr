import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home, Dashboard, Register } from "./pages";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import FullScreenLoader from "./components/shared/FullScreenLoader";

const App = () => {
  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <FullScreenLoader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/dashboard" replace={true} /> : <>{children}</>;
};

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <>{children}</> : <Navigate to="/" replace={true} />;
};

export default App;
