<script>
  import { onMount } from "svelte";
  import { getIdFromToken } from "../../../../Functions/fetchIdFromToken";

  let movies = [];
  let errorMessage = "";

  const token = localStorage.getItem("jwtToken");

  onMount(async () => {
    const Token = await getIdFromToken();
    console.log(Token.user_id);

    if (!Token.user_id) {
      errorMessage = "Unable to retrieve user details.";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/users/${Token.user_id}?include=movies`,
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
        movies = result.movies || [];
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
  {#if movies.length > 0}
    <h3>Movies Posted by You</h3>
    <ul>
      {#each movies as movie}
        <li>
          <strong>{movie.name}</strong> (Rating: {movie.avg_rating})
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .profile {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 600px;
    margin: auto;
  }

  h2 {
    margin-bottom: 15px;
    color: #333;
  }

  p {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
