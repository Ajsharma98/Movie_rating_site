<script>
  let search;
  let filteredMovie = [];
  let showMovie = false;
  let queryString;
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  async function showMoviefilter() {
    showMovie = false;
    navigate("/movies");
  }

  onMount(async function () {
    const params = new URLSearchParams(window.location.search);
    search = params.get("query") || "";
    console.log(search, "value of search");
    const q = search;
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`http://localhost:4000/movies/${q}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const movies = await response.json();
      console.log(movies);
      filteredMovie = movies;
      showMovie = true;
      //   console.log(filteredMovie);
      //   asfas
    } else {
      const error = await response.json();
      console.error("Error fetching movie by name:", error.message);
    }
  });
</script>

<!-- <div class="movie_filter">
  <input
    class="input"
    type="text"
    placeholder="search "
    on:input={filterMovieById}
    bind:value={search}
  />

  <!-- <button class="button" on:click={filterMovieById}>search</button> -->

{#if filteredMovie && showMovie}
  <div class="movie-card">
    {#each filteredMovie as movie}
      <p>{movie.id}</p>
      <img src={movie.img} alt={movie.title} />
      <h3>{movie.name}</h3>
      <!-- <p>Movie_id:{movie.id}</p> -->
      <p>Director: {movie.director_name}</p>
      <p>Writer: {movie.writers}</p>
      <p>{movie.genre}</p>
      <p>Posted_by: {movie.posted_by}</p>
      <p class="rating">{movie.avg_rating}</p>
      <button class="close-button" on:click={showMoviefilter}>✖</button>
    {/each}
  </div>
{/if}

<!-- $: if (search){
  filterMovieById()
} -->

<style>
  .input {
    background-color: white;
    position: absolute;
    top: 10px;
    left: 5px;
    border-radius: 5px;
  }
  .movie_filter {
    color: white;
  }
  .button {
    color: black;
    background-color: white;
    position: absolute;
    top: 10px;
    left: 200px;
    height: 15px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }
  h3,
  p {
    color: white;
    word-wrap: break-word; /* Ensures long words break and wrap */
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
    position: relative;

    /* position: relative; */
  }

  .movie-card img {
    max-width: 100%;
    border-radius: 8px;
  }
</style>
