export const getJWTToken = () => {
  return localStorage.getItem('token');
}

export const getErrorMessage = error => {
  let message = '';
  message = error.response?.data.apiErrors[0]?.message || 'Something Went Wrong!';
  
  return message;
}

export const NOOP = () => {}
export const identity = v => v;
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function objectWithoutProps(obj, keys) {
  let target = {};
  
  for(const key in obj) {
    if (keys.indexOf(key) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    target[key] = obj[key];
  }
  
  return target;
}