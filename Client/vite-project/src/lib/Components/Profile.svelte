<script>
  import { onMount } from "svelte";
  import { getIdFromToken } from "../../store";
  let user_id = "";
  let user = null;
  let movies = [];
  let ratings = [];
  let errorMessage = "";

  // Fetch user data, movies, and ratings by user_id
  const token = localStorage.getItem("jwtToken");

  onMount(async () => {
    const user_id = getIdFromToken(); // Extract the user_id from JWT
    if (!user_id) {
      errorMessage = "User ID not found in token.";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/users/${user_id}?include=user,movies,ratings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the token in the Authorization header
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        user = result.user;
        movies = result.movies;
        ratings = result.ratings;
      } else {
        errorMessage = result.error || "Error fetching profile data.";
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      errorMessage = "Error fetching profile data.";
    }
  });
</script>

<div class="profile-container">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  {#if user}
    <div>
      <h3 class="profile-title">User ID: {user.user_id}</h3>
      <p>Name: {user.name}</p>
    </div>

    <div class="movies">
      <h4>Movies Posted:</h4>
      {#if movies.length > 0}
        {#each movies as movie}
          <div class="movie-item">
            <p>{movie.name}</p>
          </div>
        {/each}
      {:else}
        <p>No movies posted yet.</p>
      {/if}
    </div>

    <div class="ratings">
      <h4>Ratings Added:</h4>
      {#if ratings.length > 0}
        {#each ratings as rating}
          <div class="rating-item">
            <p>Movie ID: {rating.movie_id}, Rating: {rating.rating}</p>
          </div>
        {/each}
      {:else}
        <p>No ratings added yet.</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .profile-container {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #e6d6d6;
    padding: 15px;
    border-radius: 10px;
    color: white;
    max-width: 300px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  }

  .profile-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .movies,
  .ratings {
    margin-top: 10px;
  }

  .movie-item,
  .rating-item {
    margin-bottom: 8px;
  }

  .error {
    color: red;
  }
</style>
