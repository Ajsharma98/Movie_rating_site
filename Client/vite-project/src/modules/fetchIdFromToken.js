import { jwtDecode } from "jwt-decode";
export const getIdFromToken = async () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      console.log("Decoded token:", decodedToken); // Log entire token payload

      // Extract the role from the decoded token
      // @ts-ignore
      const user_id = decodedToken.id;
      // @ts-ignore
      const Role = decodedToken.role;
      console.log("User_id:", user_id);
      console.log("User Role:", Role); // Log role
      return { user_id, Role };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
};
