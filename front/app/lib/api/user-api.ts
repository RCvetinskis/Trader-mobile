import { generateAxiosErrorMessage } from "../../utils/general-helpers";
import { API_GENERAL } from "../constants";
import axios from "axios";

export interface IUser {}
export const registerUser = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const params = {
      user: {
        name,
        email,
        password,
      },
    };

    const response = await axios.post(`${API_GENERAL}/users`, params);
    return response.data;
  } catch (error: any) {
    throw new Error(generateAxiosErrorMessage(error));
  }
};
