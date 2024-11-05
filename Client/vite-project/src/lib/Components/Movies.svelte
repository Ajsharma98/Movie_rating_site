<script>
  import { displayedData, fetchAllMovies } from "../../store";
  import { onMount } from "svelte";
  import Logout from "../Components/Logout.svelte";
  import Pagination from "./Pagination.svelte";
  import Addmovies from "./Addmovies.svelte";
  import AddRating from "./AddRating.svelte";
  import MainProfile from "./MainProfile.svelte";
  let errorMessage = "";

  onMount(() => {
    fetchAllMovies().catch((err) => {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    });
  });
</script>

<MainProfile />
<body>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {:else}
    <div class="movie-list">
      {#each $displayedData as movie}
        <div class="movie-card">
          <img src={movie.img} alt={movie.title} />
          <h3>{movie.name}</h3>
          <p>Movie_id:{movie.id}</p>
          <p>Director: {movie.director_name}</p>
          <p>Writer: {movie.writers}</p>
          <p>{movie.genre}</p>
          <p>Posted_by: {movie.posted_by}</p>
          <p class="rating">{movie.avg_rating}</p>
        </div>
      {/each}
    </div>
  {/if}
</body>
<AddRating />
<Addmovies />
<Logout />
<Pagination />

<style>
  h3,
  p {
    color: white;
  }
  .rating::before {
    content: " ★";
    color: gold; /* You can change the star color */
  }
  .movie-list {
    display: grid;

    grid-template-columns: repeat(3, 1fr);
    /* create three equal columns  */
    gap: 15px;
    padding: 20px;
  }

  .movie-card {
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
