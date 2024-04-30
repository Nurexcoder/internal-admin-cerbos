import React, { useState } from "react";
import type { User } from "../types/userType";
import IconSearch from "../assets/search-icon";

interface UserTableProps {
  users: User[];
  handleDelete: (username: string) => Promise<void>;
}

const UserTable: React.FC<UserTableProps> = ({ users, handleDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredUsers.map((user, ind) => (
            <tr key={ind} className="table-row">
              <td className="other-row">{user.Name}</td>
              <td className="other-row">{user.Email}</td>
              <td className="other-row">@{user.Username}</td>
              <td className="other-row">
                <button onClick={() => handleDelete(user.Username)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
