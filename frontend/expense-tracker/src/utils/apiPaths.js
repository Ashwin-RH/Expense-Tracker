const isDev = import.meta.env.MODE === 'development';

// export const BASE_URL = isDev
//   ? "https://9098abae7a8c.ngrok-free.app" // ✅ Use ngrok URL here
//   : "https://expense-tracker-backend-kcuq.onrender.com";

// export const BASE_URL = import.meta.env.VITE_API_URL;

// export const BASE_URL = __API__;

export const BASE_URL = isDev
  ? __API__ // ✅ Use ngrok URL here
  : "https://expense-tracker-backend-kcuq.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/api/v1/auth/login`,
    REGISTER: `${BASE_URL}/api/v1/auth/register`,
    GET_USER_INFO: `${BASE_URL}/api/v1/auth/getUser`,
  },
  DASHBOARD: {
    GET_DATA: `${BASE_URL}/api/v1/dashboard`,
  },
  INCOME: {
    ADD_INCOME: `${BASE_URL}/api/v1/income/add`,
    GET_ALL_INCOME: `${BASE_URL}/api/v1/income/get`,
    DELETE_INCOME: (incomeId) => `${BASE_URL}/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `${BASE_URL}/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: `${BASE_URL}/api/v1/expense/add`,
    GET_ALL_EXPENSE: `${BASE_URL}/api/v1/expense/get`,
    DELETE_EXPENSE: (expenseId) => `${BASE_URL}/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `${BASE_URL}/api/v1/expense/downloadexcel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: `${BASE_URL}/api/v1/auth/upload-image`,
  },
  OCR: {
  SCAN: `${BASE_URL}/api/v1/auto-transaction`,
  },
  TRANSACTIONS: {
    SAVE: `${BASE_URL}/api/v1/transactions`,
  },

};
