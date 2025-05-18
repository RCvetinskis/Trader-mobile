export const generateAxiosErrorMessage = (error: any) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Something went wrong"
  );
};
