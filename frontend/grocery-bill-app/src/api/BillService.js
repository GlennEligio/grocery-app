const fetchBills = async (jwt) => {
  return await fetch("http://localhost:8080/api/v1/bills/summary", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const fetchBillsWithQueryPagingSorting = async (
  jwt,
  queryType,
  queryValue,
  currentPage,
  pageSize,
  sort,
  field
) => {
  var url = `http://localhost:8080/api/v1/bills?${queryType}=${encodeURIComponent(
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
  return await fetch("http://localhost:8080/api/v1/bills/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });
};

const download = async (jwt) => {
  return await fetch("http://localhost:8080/api/v1/bills/download", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const downloadTemplate = async (jwt) => {
  return await fetch("http://localhost:8080/api/v1/bills/download/template", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const createBill = async (jwt, bill) => {
  return await fetch("http://localhost:8080/api/v1/bills", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(bill),
  });
};

export default {
  fetchBills,
  createBill,
  fetchBillsWithQueryPagingSorting,
  upload,
  download,
  downloadTemplate,
};
