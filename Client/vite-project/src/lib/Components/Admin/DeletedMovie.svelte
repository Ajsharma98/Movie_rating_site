<script>
  import { fetchAllMovies } from "../../../store";
  import { onMount } from "svelte";
  import { displayedData } from "../../../store";
  import Pagination from "../Pagination.svelte";
  import { page, totalPages } from "../../../store";

  let movies = [];
  let errorMessage = "";
  let filter;
  fetchAllMovies((filter = 1));
  onMount(async () => {
    try {
      await fetchAllMovies((filter = 1));
    } catch (err) {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    }
  });
  let inputPage = "";
  const handlePageInput = (e) => {
    e.preventDefault();
    const pageNum = Number(inputPage);
    if (!isNaN(pageNum)) {
      goToPage(pageNum);
    }
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= $totalPages) {
      page.set(newPage);
      //   $filter;
      fetchAllMovies((filter = 2));
    } else {
      console.warn("Page number out of range:", newPage);
    }
  };
</script>

<div class="profile">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  <!-- {#if movies.length > 0} -->
  <h2>All Deleted Movies</h2>
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
<div class="pagination-controls">
  <button on:click={() => goToPage(1)} disabled={$page === 1}>&laquo </button>

  <button on:click={() => goToPage($page - 1)} disabled={$page === 1}
    >&lt</button
  >
  <span id="pageDisplay">Page {$page} of {$totalPages}</span>
  <form on:input={handlePageInput}>
    <input
      type="number"
      min="1"
      max={$totalPages}
      bind:value={inputPage}
      placeholder="Go to Page"
      aria-label="Go to Page "
    />
  </form>
  <button on:click={() => goToPage($page + 1)} disabled={$page === $totalPages}>
    &gt;
  </button>

  <button
    on:click={() => goToPage($totalPages)}
    disabled={$page === $totalPages}
  >
    &raquo;
  </button>
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

  input {
    color: black;
    background-color: white;
  }
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .pagination-controls button {
    margin: 0 8px;
    padding: 8px 15px;
    font-size: 1rem;
    border: 2px solid transparent;
    background-color: #007bff;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      border-color 0.3s;
  }

  .pagination-controls button:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  .pagination-controls button:disabled {
    background-color: #d6d6d6;
    color: #a0a0a0;
    cursor: not-allowed;
    border-color: #d6d6d6;
  }

  #pageDisplay {
    margin: 0 12px;
    font-weight: bold;
    font-size: 1.1rem;
    color: white;
    /* background-color: hsl(0, 12%, 89%); */
  }
</style>
