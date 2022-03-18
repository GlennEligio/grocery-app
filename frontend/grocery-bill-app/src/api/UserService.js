const fetchUsers = async (jwt) => {
  return await fetch("http://localhost:8080/api/v1/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const fetchUsersWithQueryPagingSorting = async (
  jwt,
  queryType,
  queryValue,
  currentPage,
  pageSize,
  sort,
  field
) => {
  var url = `http://localhost:8080/api/v1/users?${queryType}=${encodeURIComponent(
    queryValue
  )}&page=${encodeURIComponent(currentPage)}&size=${encodeURIComponent(
    pageSize
  )}&sort=${encodeURIComponent(sort)}&field=${encodeURIComponent(field)}`;

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const register = async (user) => {
  return await fetch("http://localhost:8080/api/v1/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const login = async (user) => {
  return await fetch("http://localhost:8080/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const editUser = async (jwt, userToEdit) => {
  return await fetch("http://localhost:8080/api/v1/users", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(userToEdit),
  });
};

const createUser = async (jwt, userToCreate) => {
  return await fetch("http://localhost:8080/api/v1/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(userToCreate),
  });
};

export default {
  fetchUsers,
  fetchUsersWithQueryPagingSorting,
  register,
  login,
  editUser,
  createUser,
};