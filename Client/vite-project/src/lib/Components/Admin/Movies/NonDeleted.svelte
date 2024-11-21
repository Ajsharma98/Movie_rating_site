<script>
  import { onMount } from "svelte";
  import { fetchAllMovies } from "../../../../Functions/fetchMovies"; // Assume this function is correct
  import Pagination from "../../Ratings/Pagination.svelte";
  import { displayedData } from "../../../../store";
  let movies = [];
  let errorMessage = "";
  let filter;
  fetchAllMovies((filter = 0));
  onMount(async () => {
    try {
      await fetchAllMovies((filter = 0));
      //   console.log(result);
      //   movies = result.movies;
    } catch (err) {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    }
  });
</script>

<div class="profile">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <!-- {#if movies.length > 0} -->
  <h2>All Non-Deleted Movies</h2>
  <div class="movie-list">
    {#each $displayedData as movie}
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
  <!-- {/if} -->
</div>
<Pagination />

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

  h3,
  h2 {
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
