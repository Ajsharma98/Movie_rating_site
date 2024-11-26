import { getIdFromToken } from "./fetchIdFromToken";
let errorMessage = "";
let user = "";
const token = localStorage.getItem("jwtToken");

export const fetchUserName = async () => {
  const Token = await getIdFromToken();
  console.log(Token.user_id);

  if (!Token.user_id) {
    errorMessage = "Unable to retrieve user details.";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/users/${Token.user_id}?include=user`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    console.log(result); // Log the result to check the API response structure

    if (response.ok) {
      user = result.user || null;
    } else {
      errorMessage = result.error || "Failed to fetch profile data.";
    }

    return {
      name: user.name,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    errorMessage = "Error fetching profile data.";
  }
};
