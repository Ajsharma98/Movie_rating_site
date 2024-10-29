<script>
  import { displayedData, fetchAllMovies } from "../../store";
  import { onMount } from "svelte";
  import Logout from "../Components/Logout.svelte";
  import Pagination from "./Pagination.svelte";

  let errorMessage = "";

  onMount(() => {
    fetchAllMovies().catch((err) => {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    });
  });
</script>

<body>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {:else}
    <div class="movie-list">
      {#each $displayedData as movie}
        <div class="movie-card">
          <img src={movie.image} alt={movie.title} />
          <h3>{movie.name}</h3>
          <p>Director: {movie.director_name}</p>
          <p>Writer: {movie.writers}</p>
          <p>{movie.genre}</p>
          <p>Posted_by: {movie.posted_by}</p>
          <p>{movie.avg_rating}</p>
        </div>
      {/each}
    </div>
  {/if}
</body>

<Logout />
<Pagination />

<style>
  .movie-list {
    display: flex;
    overflow-x: auto;
    gap: 20px;
    padding: 20px;
  }
  h3,
  p {
    color: white;
  }

  .movie-card {
    flex: 0 0 auto;
    width: 200px;
    background-color: #0a0606;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(239, 234, 234, 0.865);
    text-align: center;
  }

  .movie-card img {
    max-width: 100%;
    border-radius: 8px;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
