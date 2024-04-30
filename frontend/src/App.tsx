import "./styles.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UserTable from "./components/UserTable";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "./http/api";
import type { User } from "./types/userType";

function App() {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data) => setUsers(data)).catch((error) => console.error(error));
  },[])

  const handleDelete = async (username: string) => {
    try {
      const data = await deleteUser(username);
      if (data) {
        const updatedUsers = users.filter((user) => user.Username !== username);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="app-content">
      <Navbar />
      <div className="content-container">
        <Sidebar />
        <div className="main-content-container"> 
          <h1>Users</h1>
          {users.length !== 0 &&
            <UserTable users={users} handleDelete={handleDelete}/>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
