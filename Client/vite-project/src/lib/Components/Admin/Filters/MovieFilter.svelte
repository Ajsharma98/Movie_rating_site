<script>
  import { fetchAllMovies } from "../../../../modules/fetchMovies";
  let filter = "";
  const MovieFilterNonDeleted = () => {
    filter = "0";
    fetchAllMovies();
    console.log(fetchAllMovies);
  };

  const MovieFilterDeleted = () => {
    filter = "1";
    fetchAllMovies();
    console.log(fetchAllMovies);
  };

  const MovieFilterAllMovies = () => {
    filter = "2";
    fetchAllMovies();
    console.log(fetchAllMovies);
  };
</script>

<div class="button-container">
  <button class="button" on:click={MovieFilterNonDeleted}
    >Non Deleted Movies</button
  >
  <button class="button" on:click={MovieFilterDeleted}>Deleted Movies</button>
  <button class="button" on:click={MovieFilterAllMovies}>All Movies</button>
</div>

<style>
  .button {
    padding: 10px 20px;
    background-color: #007bff;
    color: rgb(238, 231, 231);
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin: 5px; /* Adds spacing between buttons */
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Adjusts spacing between buttons */
  }
</style>
