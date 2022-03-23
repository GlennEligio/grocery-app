const fetchItems = async (jwt) => {
  return await fetch("http://localhost:8080/api/v1/items", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const fetchItemsWithQueryPagingSorting = async (
  jwt,
  queryType,
  queryValue,
  currentPage,
  pageSize,
  sort,
  field
) => {
  var url = `http://localhost:8080/api/v1/items?${queryType}=${encodeURIComponent(
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
  return await fetch("http://localhost:8080/api/v1/items/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });
};

const download = async (jwt) => {
  return await fetch("http://localhost:8080/api/v1/items/download", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const downloadTemplate = async (jwt) => {
  return await fetch("http://localhost:8080/api/v1/items/download/template", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const addItem = async (jwt, item) => {
  return await fetch("http://localhost:8080/api/v1/items", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

const editItem = async (jwt, item) => {
  return await fetch("http://localhost:8080/api/v1/items", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

const deleteItem = async (jwt, id) => {
  return await fetch(`http://localhost:8080/api/v1/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export default {
  fetchItems,
  fetchItemsWithQueryPagingSorting,
  addItem,
  editItem,
  deleteItem,
  upload,
  download,
  downloadTemplate,
};
