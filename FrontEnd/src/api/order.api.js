import request from ".";

export const getOrder = (params) => {
  return request(`order`, {
    method: "GET",
    params
  });
}

export const getOrderMe = () => {
  return request(`order/me`, {
    method: "GET"
  });
}

export const addOrder = (data, params) => {
  return request(`order`, {
    method: "POST",
    data,
    params
  });
}

export const updateOrder = (id, data) => {
  return request(`order/${id}`, {
    method: "PUT",
    data
  });
}
