import { get } from "svelte/store";
import { page } from "../store";
import { limit } from "../store";
import { filter } from "../store";
import { displayedData } from "../store";
import { totalPages } from "../store";

export const fetchAllUsers = async (filter) => {
  try {
    const page_num = get(page);
    const limit_val = get(limit);
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found, unauthorized accesss");
      return;
    }
    const response = await fetch(
      `http://localhost:4000/users?page=${page_num}&limit=${limit_val}&filter=${filter}`,
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
      return {
        users: data.Users, // Movies array
        totalPages: data.totalPages, // Total pages for pagination
        total: data.total, // Total number of movies
      };
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
