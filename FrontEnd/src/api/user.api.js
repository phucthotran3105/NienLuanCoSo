import request from ".";

export const getMe = () => {
  return request(`user/me`, {
    method: "GET",
  });
}

export const updateMe = (data) => {
    return request(`user/me`, {
      method: "PUT",
      data
    });
  }