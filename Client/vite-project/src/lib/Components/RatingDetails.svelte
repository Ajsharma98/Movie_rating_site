<script>
  import { onMount } from "svelte";
  import { getIdFromToken } from "../../store";

  let ratings = [];
  let errorMessage = "";

  const token = localStorage.getItem("jwtToken");

  onMount(async () => {
    const user_id = await getIdFromToken();
    console.log(user_id);

    if (!user_id) {
      errorMessage = "Unable to retrieve user details.";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/users/${user_id}?include=ratings`,
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
        ratings = result.ratings || [];
      } else {
        errorMessage = result.error || "Failed to fetch profile data.";
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      errorMessage = "Error fetching profile data.";
    }
  });
</script>

<div class="profile">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  {#if ratings.length > 0}
    <h3>Your Ratings</h3>
    <ul>
      {#each ratings as rating}
        <li>
          Rated movie_id: <strong>{rating.movie_id}</strong> with rating: {rating.rating}
        </li>
      {/each}
    </ul>
  {/if}
</div>
