const oneDay = 24 * 60 * 60 * 1000;
const oneWeek = 7 * 24 * 60 * 60 * 1000;
  
export const accessExpiryDate = Date.now() + oneDay;    
export const refreshExpiryDate = Date.now() + oneWeek;