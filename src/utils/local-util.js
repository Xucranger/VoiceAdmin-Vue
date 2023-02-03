/*
 * @Description:localstroage相关操作
 * @Author: Xucranger
 * @Date: 2023-01-28 11:25
 */
export const localSave = (key, value) => {
  localStorage.setItem(key, value);
};

export const localRead = (key) => {
  return localStorage.getItem(key) || '';
};

export const localClear = () => {
  localStorage.clear();
};
