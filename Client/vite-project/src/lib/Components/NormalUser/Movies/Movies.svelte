<script>
  import { fetchAllMovies } from "../../../../Functions/fetchMovies";
  import { displayedData } from "../../../../store";
  import { onMount } from "svelte";
  import Logout from "../HomePage/Logout.svelte";
  import Pagination from "../../Ratings/Pagination.svelte";
  import Addmovies from "./Addmovies.svelte";
  import AddRating from "../../Ratings/AddRating.svelte";
  import MainProfile from "./MainProfile.svelte";
  import AdminProfile from "../../Admin/Admin/AdminProfile.svelte";
  import { getIdFromToken } from "../../../../Functions/fetchIdFromToken";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import FilterMoviebyid from "./filterMoviebyid.svelte";
  import { navigate } from "svelte-routing";
  import { faSearch, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
  import { page } from "../../../../store";
  import MovieFilter from "../../Admin/Filters/MovieFilter.svelte";

  //   import RatingDetails from "./RatingDetails.svelte";
  let errorMessage = "";
  let Token = "";
  let search = "";

  // Reset the flag when needed
  async function deletedMovie(id) {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`http://localhost:4000/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include Bearer prefix for JWT
      },
    });
    if (response.ok) {
      fetchAllMovies();
    } else {
      const error = await response.json();
      console.error("Error deleting book:", error.message);
    }
  }

  onMount(async () => {
    page.set(1);
    fetchAllMovies().catch((err) => {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    });
    Token = await getIdFromToken();
    console.log(Token.Role);
  });
  function handleGlobalSearch() {
    navigate(`/filteredMovie?query=${encodeURIComponent(search)}`);
  }
  // console.log(filtersearch);
</script>

<!-- <FilterMoviebyid bind:this={filterMovieComponent} /> -->
<header class="header">
  <!-- Logo or Website Name -->
  <div class="logo">
    <a href="/">🎥 IMDb</a>
  </div>

  <!-- Search Bar and Button -->
  <div class="search-bar">
    <div class="input-wrapper">
      <FontAwesomeIcon
        icon={faSearch}
        class="icon"
        style="position: absolute;
    right: 10px;
    color: #888;
    font-size: 1rem;"
      />
      <input
        class="input"
        type="text"
        placeholder="Search movies..."
        bind:value={search}
      />
    </div>
    <button class="search-button" on:click={handleGlobalSearch}>
      Search
    </button>
  </div>
  <!-- Logout Button -->
  <div class="logout">
    <Logout />
  </div>
</header>
<!-- <FilterMoviebyid {search} /> -->
{#if Token.Role === "admin"}
  <AdminProfile />
{:else}
  <MainProfile />
{/if}
<body>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {:else}
    <div class="movie-list">
      {#each $displayedData as movie}
        <div class="movie-card">
          <img src={movie.img} alt={movie.title} />
          <h3>{movie.name}</h3>
          <!-- <p>Movie_id:{movie.id}</p> -->
          <p>Director: {movie.director_name}</p>
          <p>Writer: {movie.writers}</p>
          <p>{movie.genre}</p>
          <p>Posted_by: {movie.posted_by}</p>
          <p class="rating">{movie.avg_rating}</p>
          <button
            on:click={() => deletedMovie(movie.id)}
            class="delete"
            aria-label="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <AddRating movieId={movie.id} />
          <!-- <button class="button" on:click={openModal}>Add Rating</button> -->
        </div>
      {/each}
    </div>
  {/if}
</body>
<Addmovies />

<Pagination />

<style>
  h3,
  p {
    color: white;
    word-wrap: break-word; /* Ensures long words break and wrap */
  }
  .rating::before {
    content: " ★";
    color: gold; /* You can change the star color */
  }
  .movie-list {
    display: grid;
    background-color: black;
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
    width: 200px;
    height: 300px;
  }

  .movie-card {
    background-color: #0a0606;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(239, 234, 234, 0.865);
    text-align: center;

    position: relative;
  }

  .movie-card img {
    max-width: 100%;
    border-radius: 8px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
  .movie-card img:hover {
    transform: translateY(-20px) scale(1.2);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .error {
    color: red;
    text-align: center;
  }
  .delete {
    position: absolute;
    top: 2px;
    right: 0px;
    background-color: transparent;
    border: none;
    color: red;
    font-size: 17px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  /* .button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    /* position: absolute; */
  /* bottom: 10px;
    left: 50%;
    transform: translateX(-50%); */
  /* }

  .button:hover {
    background-color: #218838;
  } */

  /* .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    } */
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

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1c1c1c;
    color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .logo a {
    color: #ff5722;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 250px;
    font-size: 1rem;
    color: black;
    margin-left: 10px;
  }

  .search-button {
    background-color: #ff5722;
    color: #fff;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  .search-button:hover {
    background-color: #e64a19;
  }

  .logout {
    margin-left: auto;
  }
</style>
