import React, { useState } from "react";
import type { User } from "../types/userType";
import IconSearch from "../assets/search-icon";

interface UserTableProps {
  users: User[];
  role: string; // Receive role as a prop
  handleDelete: (username: string) => Promise<void>; // No need to pass role here
}

const UserTable: React.FC<UserTableProps> = ({ users, role, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = async (username: string) => {
    console.log(`Trying to delete ${username} with role: ${role}`);
    await handleDelete(username);
  };

  const isAdmin = role === "CEO" || role === "manager";

  return (
    <div className="table-container">
      <div className="search-container">
        <div className="search-icon">
          <IconSearch />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table className="users-table">
        <thead className="table-heading">
          <tr>
            <th scope="col" className="heading-row">
              Name
            </th>
            <th scope="col" className="heading-row">
              Email
            </th>
            <th scope="col" className="heading-row">
              Username
            </th>
            <th scope="col" className="heading-row">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index} className="table-row">
              <td className="other-row">{user.name}</td>
              <td className="other-row">{user.email}</td>
              <td className="other-row">@{user.username}</td>
              <td className="other-row">
                {isAdmin ? (
                  <button
                    onClick={() => handleDeleteClick(user.username)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                ) : (
                  <span>Not Authorized</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
