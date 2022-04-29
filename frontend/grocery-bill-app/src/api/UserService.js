const gatewayUri =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_GATEWAY_URI_PROD
    : process.env.REACT_APP_BACKEND_GATEWAY_URI_DEV;

const fetchUsers = async (jwt) => {
  return await fetch(`${gatewayUri}/api/v1/users`, {
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
  var url = `${gatewayUri}/api/v1/users?${queryType}=${encodeURIComponent(
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

const upload = async (jwt, formData) => {
  return await fetch(`${gatewayUri}/api/v1/users/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });
};

const download = async (jwt) => {
  return await fetch(`${gatewayUri}/api/v1/users/download`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const downloadTemplate = async (jwt) => {
  return await fetch(`${gatewayUri}/api/v1/users/download/template`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const register = async (user) => {
  return await fetch(`${gatewayUri}/api/v1/users/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const login = async (user) => {
  return await fetch(`${gatewayUri}/api/v1/users/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const validateToken = async (jwt) => {
  return await fetch(`${gatewayUri}/api/v1/users/validateToken?token=${jwt}`, {
    method: "POST",
  });
};

const refreshToken = async (refreshToken) => {
  return await fetch(
    `${gatewayUri}/api/v1/users/refreshToken?token=${refreshToken}`,
    {
      method: "POST",
    }
  );
};

const editUser = async (jwt, userToEdit) => {
  return await fetch(`${gatewayUri}/api/v1/users`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(userToEdit),
  });
};

const createUser = async (jwt, userToCreate) => {
  return await fetch(`${gatewayUri}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(userToCreate),
  });
};

const deleteUser = async (jwt, id) => {
  return await fetch(`${gatewayUri}/api/v1/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export default {
  fetchUsers,
  fetchUsersWithQueryPagingSorting,
  register,
  login,
  editUser,
  createUser,
  download,
  downloadTemplate,
  upload,
  validateToken,
  refreshToken,
  deleteUser,
};
