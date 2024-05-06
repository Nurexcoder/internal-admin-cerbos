// api.ts

// Hardcoded user data
let users = [
  { name: "John Doe", email: "johndoe@example.com", username: "johndoe" },
  { name: "Jane Smith", email: "janesmith@example.com", username: "janesmith" },
  { name: "Alice Johnson", email: "alicej@example.com", username: "alicej" },
];

// Function to check with Cerbos if an action is allowed
const isActionAllowed = async (
  role: string,
  action: string,
  resource: string,
  resourceId: string
) => {
  const payload = {
    requestId: "unique_request_id",
    includeMeta: false,
    principal: {
      id: role,
      policyVersion: "default",
      roles: [role],
    },
    resources: [
      {
        actions: [action],
        resource: {
          kind: resource,
          policyVersion: "default",
          id: resourceId,
        },
      },
    ],
  };

  try {
    const response = await fetch("http://localhost:3592/api/check/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Error from Cerbos:", data);
      return false;
    }

    return data.results[0].actions[action] === "EFFECT_ALLOW";
  } catch (error) {
    console.error("Error sending request to Cerbos:", error);
    return false;
  }
};

// Function to fetch users based on the provided role
export const getUsers = async (role: string) => {
  const authorized = await isActionAllowed(role, "read", "users", "all_users");
  if (!authorized) {
    console.error(`Role ${role} is not authorized to view users`);
    return [];
  }

  return users;
};

// Function to delete a user by username
export const deleteUser = async (role: string, username: string) => {
  const authorized = await isActionAllowed(role, "delete", "users", username);
  if (!authorized) {
    console.error(`Role ${role} is not authorized to delete users`);
    return false;
  }

  const index = users.findIndex((user) => user.username === username);
  if (index > -1) {
    users.splice(index, 1);
    console.log(`User ${username} deleted successfully`);
    return true;
  }

  console.error(`User ${username} not found`);
  return false;
};

export default users;
