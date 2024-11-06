<script>
  import { onMount } from "svelte";
  import { displayedData, totalPages, fetchAllMovies } from "../../../store"; // Assume this function is correct

  let movies = [];
  let errorMessage = "";
  let filter;

  onMount(async () => {
    try {
      const result = await fetchAllMovies((filter = 0));
      //   console.log(result);
      movies = result.movies;
    } catch (err) {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    }
  });
</script>

<!-- UI rendering -->
<div class="profile">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  {#if movies.length > 0}
    <!-- Conditionally display if movies are available -->
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
  /* Add some styles for better visualization */
  .profile {
    padding: 20px;
  }

  .error {
    color: red;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  strong {
    font-weight: bold;
  }
</style>
