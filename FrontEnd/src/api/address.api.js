import request from ".";

export const getAddressByUser = () => {
  return request(`address`, {
    method: "GET"
  });
};

export const createAddress = (data) => {
  return request(`address`, {
    method: "POST",
    data,
  });
};

export const updateAddress = (id, data) => {
  return request(`address/${id}`, {
    method: "PUT",
    data,
  });
};

export const deleteAddress = (id) => {
  return request(`address/${id}`, {
    method: "DELETE",
  });
};

