const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:8080/users');
    const users = await response.json();
    console.log(users);
    return users;
  } catch (error) {
    console.error(error); 
  }
};

const deleteUser = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/delete-user?id=${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getUsers, deleteUser };