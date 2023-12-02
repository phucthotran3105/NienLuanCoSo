import request from ".";

export const getMe = () => {
  return request(`user/me`, {
    method: "GET",
  });
};

export const updateMe = (data) => {
  return request(`user/me`, {
    method: "PUT",
    data,
  });
};

export const changePasswordApi = (data) => {
  return request(`auth/change-password`, {
    method: "POST",
    data,
  });
};

