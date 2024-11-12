<script>
  import { displayedData, fetchAllMovies } from "../../store";
  import { onMount } from "svelte";
  import Logout from "../Components/Logout.svelte";
  import Pagination from "./Pagination.svelte";
  import Addmovies from "./Addmovies.svelte";
  import AddRating from "./AddRating.svelte";
  import MainProfile from "./MainProfile.svelte";
  import AdminProfile from "./Admin/AdminProfile.svelte";
  import { getIdFromToken } from "../../store";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  //   import RatingDetails from "./RatingDetails.svelte";
  let errorMessage = "";
  let Token = "";

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
    fetchAllMovies().catch((err) => {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    });
    Token = await getIdFromToken();
    console.log(Token.Role);
  });
</script>

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
<Pagination /><Logout />

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
    position: relative;

    /* position: relative; */
  }

  .movie-card img {
    max-width: 100%;
    border-radius: 8px;
  }

  .error {
    color: red;
    text-align: center;
  }
  .delete {
    position: absolute;
    top: 10px;
    right: 1px;
    background-color: transparent;
    border: none;
    color: red;
    font-size: 24px;
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
</style>
