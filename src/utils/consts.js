// const URL_IP = `http://192.168.1.100`;
// const URL_IP = `http://192.168.1.101`;
// const URL_IP = `http://192.168.1.102`;
// const URL_IP = `http://192.168.1.103`;
const URL_IP = `https://dev.wmes.pl`;

export const URL_CHECK_LOGIN = `${URL_IP}/users/self`;
export const URL_LOGIN = `${URL_IP}/login`;
export const URL_PRODLINES = `${URL_IP}/prodLines?deactivatedAt=null&limit(0)`;
export const URL_PRODSHIFTORDER = `${URL_IP}/prodShiftOrders`;
export const URL_BALANCING = `${URL_IP}/ct/balancing/pces`;

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
