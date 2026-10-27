import { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem("shobhub_users") || "[]");

    const newUser = { email, password };
    const user = users.find((user) => user.email === newUser.email);

    if (!user) {
      users.push(newUser);

      localStorage.setItem("shobhub_users", JSON.stringify(users));
      localStorage.setItem("currentUserEmail", email);
      setUser({ email });

      return { success: true };
    } else {
      return { success: false, error: "Email already exists. Please login." };
    }
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("shobhub_users"));
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      return {success: false, error: "Invalid email or password"}
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true }
  };

  const logout = () => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;