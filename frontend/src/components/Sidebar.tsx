import IconUsers from "../assets/users-icon";
import IconSettings from "../assets/settings-icon";
const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li className="sidebar-elements" style={{ backgroundColor: "#FFBF00" }}>
          <IconUsers />
          <div>Users</div>
        </li>
        <li className="sidebar-elements">
          <IconSettings />
          <div>Settings</div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
