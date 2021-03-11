const URL_IP = `http://192.168.1.100`;

export const URL_CHECK_LOGIN = `${URL_IP}/users/self`;
export const URL_LOGIN = `${URL_IP}/login`;
export const URL_PRODLINES = `${URL_IP}/prodLines?deactivatedAt=null&limit(0)`;
export const URL_PRODSHIFTORDER = `${URL_IP}/prodShiftOrders`;
export const URL_BALANCING = `${URL_IP}/ct/balancing/pces`;

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// export default {
//   URL_CHECK_LOGIN,
//   URL_LOGIN,
//   URL_PRODLINES,
//   URL_PRODSHIFTORDER,
//   URL_BALANCING,
// };
