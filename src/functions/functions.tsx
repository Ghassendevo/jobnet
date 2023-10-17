export const isvalidName = (value: string) => {
  let regex = /^[A-Za-z ]+$/; // Allow both letters and spaces
  return regex.test(value);
};
export const isvalidEmail = (value: string) => {
  let regex = /^[A-Za-z][A-Za-z0-9._-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(value);
};
export const isvalidPassword = (value: string) => {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+}{:;?.-]{8,}$/;
  return regex.test(value);
};

export const isvalidphone = (value: string) => {
  const regex = /^\+\d{11}$/;
  return regex.test(value);
};
export const containsCharacter = (value:string) => {
  const regex = /·/; 
  return regex.test(value);
};
