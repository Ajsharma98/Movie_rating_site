<script>
  import { createEventDispatcher } from "svelte";

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

    // Logging the form data before submission
    console.log("Submitting review:", Rating);
    const token = localStorage.getItem("jwtToken");

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

      // Logging the response from the server
      console.log("Server Response:", result);

      if (response.ok) {
        successMessage = "Rating added successfully";
        dispatch("success", { detail: "Rating added successfully" });

        // Clear form data after submission
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
<button class="button" on:click={handleSubmit}>Add Rating</button>
<button class="close-button" type="button" on:click={closeModal}>Close</button>

<form class="modal" on:submit={handleSubmit}>
  <h2>Add Rating for movie</h2>
  <input type="text" placeholder="rating" bind:value={Rating.rating} required />
  <input type="text" placeholder="Review" bind:value={Rating.Review} required />
  <input
    type="Number"
    placeholder="movie_id"
    bind:value={Rating.movie_id}
    required
  />

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
  }

  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    position: fixed;
    bottom: 10px;
    right: 10px;
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
</style>
