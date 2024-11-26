import { get } from "svelte/store";
import { page } from "../store";
import { limit } from "../store";
import { filter } from "../store";
import { displayedData } from "../store";
import { totalPages } from "../store";

export const fetchAllMovies = async (filter) => {
  try {
    const page_num = get(page); // Get current page value from the store
    const limit_val = get(limit);
    // const new_filter = get(filter); // Get limit value from the store
    // const movie_filter = get(filter); // Use passed filter value
    const token = localStorage.getItem("jwtToken"); // Get token from localStorage

    if (!token) {
      console.error("No token found, unauthorized access");
      return;
    }

    // Correct the query parameter structure by replacing `$` with `&`
    const response = await fetch(
      `http://localhost:4000/movies?page=${page_num}&limit=${limit_val}&filter=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      displayedData.set(data.Movies); // Set fetched movies in a Svelte store
      totalPages.set(data.totalPages);
      //   filter.set(data.movie_filter); // Set total pages in a Svelte store for pagination
      return {
        movies: data.Movies, // Movies array
        totalPages: data.totalPages, // Total pages for pagination
        total: data.total, // Total number of movies
      };
      //   console.log("Fetched Data:", data);
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
