import "./styles.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/UserTable";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./http/api";
import type { User } from "./types/userType";
import users from "./http/api";

function App() {
  const [userList, setUserList] = useState(users); // Use a different name to avoid conflicts with the users state
  const [role, setRole] = useState<string>("");

  // Simulate getting the user's role (you can remove this if it's not necessary)
  useEffect(() => {
    setRole("user");
  }, []);

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole); // Update role based on dropdown selection
  };
  const handleDelete = async (username: string) => {
    try {
      // Log the role before calling the backend
      console.log(
        `Calling deleteUser with role: ${role}, username: ${username}`
      );
      const data = await deleteUser(role, username);
      if (data) {
        const updatedUsers = userList.filter(
          (user) => user.username !== username
        );
        setUserList(updatedUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="app-content">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <div className="main-content-container">
          <h1>Users</h1>
          <label htmlFor="roleDropdown">Select Role:</label>
          <select
            id="roleDropdown"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="intern">Intern</option>
            <option value="executive">Executive</option>
            <option value="manager">Manager</option>
            <option value="CEO">CEO</option>
          </select>
          {userList.length !== 0 && (
            <UserTable
              users={userList.map((user) => ({
                name: user.name,
                email: user.email,
                username: user.username,
              }))}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
