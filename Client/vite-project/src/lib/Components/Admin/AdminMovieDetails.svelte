<script>
  import { onMount } from "svelte";
  import { getIdFromToken } from "../../../Functions/fetchIdFromToken";

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
    <div class="movie-list">
      {#each movies as movie}
        <div class="movie-card">
          <img src={movie.img} alt={movie.title} />
          <h3>{movie.name}</h3>
          <p>Director: {movie.director_name}</p>
          <p>Writer: {movie.writers}</p>
          <p>{movie.genre}</p>
          <p class="rating">{movie.avg_rating}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .profile {
    padding: 20px;
    background-color: black;
    border-radius: 8px;
    max-width: auto;
    margin: auto;
  }
  .rating::before {
    content: " ★";
    color: gold; /* You can change the star color */
  }

  h3 {
    margin-bottom: 15px;
    color: white;
  }

  p {
    margin-bottom: 10px;
    font-size: 16px;
    color: White;
  }

  .error {
    color: red;
    text-align: center;
  }
  .movie-list {
    display: grid;

    grid-template-columns: repeat(3, 1fr);
    /* create three equal columns  */
    gap: 15px;
    padding: 20px;
    width: 1000px;
    height: auto;
  }
  img {
    max-width: 100%;
    max-height: 300px;
    width: auto;
    height: auto;
  }

  .movie-card {
    background-color: #0a0606;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(239, 234, 234, 0.865);
    text-align: center;

    /* position: relative; */
  }

  .movie-card img {
    max-width: 100%;
    border-radius: 8px;
  }
</style>
