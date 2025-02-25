import { toast } from "react-toastify";

export const errorHandler = (error: any) => {
  let errorMessage = "Something is wrong";

  if (typeof error?.response?.data?.errors?.[0]?.message === "string") {
    errorMessage = error?.message;
    console.log("errorMessage", errorMessage)
  }
  toast.error(errorMessage);
};
