<script>
  import { createEventDispatcher } from "svelte";
  import { fetchAllMovies } from "../../../../modules/fetchMovies";

  let newMovies = {
    name: "",
    director_name: "",
    writers: "",
    img: "",
    genre: "",
    // avg_rating: "",
  };

  let successMessage = "";
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  const handleSubmit = async (event) => {
    event.preventDefault();

    successMessage = "";
    errorMessage = "";

    // Logging the form data before submission
    console.log("Submitting Movie Data:", newMovies);
    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch("http://localhost:4000/movies/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMovies),
      });

      const result = await response.json();

      // Logging the response from the server
      console.log("Server Response:", result);

      if (response.ok) {
        successMessage = "Movie added successfully";
        fetchAllMovies();
        dispatch("success", { detail: "Movie added successfully" });

        // Clear form data after submission
        newMovies = {
          name: "",
          director_name: "",
          writers: "",
          img: "",
          genre: "",
          //   avg_rating: "",
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
  <h2>Add Movie</h2>
  <input
    type="text"
    placeholder="Movie Name"
    bind:value={newMovies.name}
    required
  />
  <input
    type="text"
    placeholder="Director"
    bind:value={newMovies.director_name}
    required
  />
  <input
    type="text"
    placeholder="Writers"
    bind:value={newMovies.writers}
    required
  />
  <input
    type="text"
    placeholder="Image URL"
    bind:value={newMovies.img}
    required
  />
  <input
    type="text"
    placeholder="Genre"
    bind:value={newMovies.genre}
    required
  />
  <button class="button" on:click={handleSubmit}>Add Movie</button>

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
    /* right: 10px;  */
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
