<script>
  import { createEventDispatcher } from "svelte";
  import { fetchAllMovies } from "../../store";
  export let movieId;

  let Rating = {
    rating: "",
    Review: "",
    movie_id: "",
  };

  let successMessage = "";
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  const handleSubmit = async (event) => {
    event.preventDefault();
    successMessage = "";
    errorMessage = "";
    Rating.movie_id = movieId;
    console.log("Submitting review:", Rating);
    const token = localStorage.getItem("jwtToken");
    console.log(movieId);
    try {
      const response = await fetch("http://localhost:4000/rating/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(Rating),
      });

      const result = await response.json();

      console.log("Server Response:", result);

      if (response.ok) {
        successMessage = "Rating added successfully";
        fetchAllMovies();
        dispatch("success", { detail: "Rating added successfully" });

        Rating = {
          rating: "",
          Review: "",
          movie_id: "",
        };
      } else {
        errorMessage = result.message || "Error while submitting data";
      }
    } catch (error) {
      console.error("Error while submitting data:", error);
      errorMessage = "Error while submitting data";
    }
  };

  function closeModal() {
    dispatch("close");
  }
</script>

<!-- Add button to trigger the form submission -->

<button class="close-button" type="button" on:click={closeModal}>Close</button>

<form class="modal" on:submit={handleSubmit}>
  <h2>Add Rating</h2>
  <input type="text" placeholder="rating" bind:value={Rating.rating} required />
  <input type="text" placeholder="Review" bind:value={Rating.Review} required />
  <!-- <input
    type="Number"
    placeholder="movie_id"
    bind:value={Rating.movie_id}
    required
  /> -->
  <button class="button" on:click={handleSubmit}>Add Rating</button>
  {#if successMessage}
    <p class="success-message">{successMessage}</p>
  {/if}
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
</form>

<style>
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    align-items: center;
  }

  input {
    display: block;
    width: 90%;
    padding: 10px;
    /* margin-top: 5px; */
    margin-bottom: 20px;
    margin-left: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
    background-color: white;
    align-items: flex-end;
  }

  .button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    position: relative;
    bottom: 10px;
    /* margin-bottom: 10px; */
  }

  .button:hover {
    background-color: #0056b3;
  }

  .close-button {
    background-color: red;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }

  .success-message {
    color: green;
  }

  .error-message {
    color: red;
  }
  h2 {
    background-color: white;
    font-family: "Times New Roman", Times, serif;
    font-style: normal;
    font-size: 30px;
  }
</style>
