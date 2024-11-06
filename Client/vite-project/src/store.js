import { writable, get } from "svelte/store";
import { jwtDecode } from "jwt-decode";
export const page = writable(1);
export const limit = writable(6);
export const filter = writable(0);
export const totalPages = writable(1);
export const displayedData = writable([]);
// export const page_num=writable('');

export const fetchAllMovies = async (filter) => {
  try {
    const page_num = get(page);
    const limit_val = get(limit);
    const movie_filter = get(filter);
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("No token found, unauthorized accesss");
      return;
    }
    const response = await fetch(
      `http://localhost:4000/movies?page=${page_num}&limit=${limit_val}$filter=${movie_filter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Data:", data);
      displayedData.set(data.Movies);
      totalPages.set(data.totalPages);
    } else {
      console.error(
        "Failed to fetch data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchAllUsers = async () => {
  try {
    const page_num = get(page);
    const limit_val = get(limit);
    const token = localStorage.getItem("jwttoken");
    if (!token) {
      console.error("No token found, unauthorized accesss");
      return;
    }
    const response = await fetch(
      `http://localhost:4000/users?page=${page_num}&limit=${limit_val}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Data:", data);
      displayedData.set(data.Users);
      totalPages.set(data.totalPages);
    } else {
      console.error(
        "Failed to fetch data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const fetchAllRatings = async () => {
  try {
    const page_num = get(page);
    const limit_val = get(limit);
    const token = localStorage.getItem("jwttoken");
    if (!token) {
      console.error("No token found, unauthorized accesss");
      return;
    }
    const response = await fetch(
      `http://localhost:4000/rating?page=${page_num}&limit=${limit_val}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Data:", data);
      displayedData.set(data.Ratings);
      totalPages.set(data.totalPages);
    } else {
      console.error(
        "Failed to fetch data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getIdFromToken = async () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      console.log("Decoded token:", decodedToken); // Log entire token payload

      // Extract the role from the decoded token
      const user_id = decodedToken.id;
      const Role = decodedToken.role;
      console.log("User_id:", user_id);
      console.log("User Role:", Role); // Log role
      return { user_id, Role };
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
};
