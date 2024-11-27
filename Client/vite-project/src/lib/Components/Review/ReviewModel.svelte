<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let movie_id;
  let reviews = "";
  const dispatch = createEventDispatcher();
  let successMessage = "";
  let errorMessage = "";
  onMount(async () => {
    successMessage = "";
    errorMessage = "";

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token found, unauthorized access");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/movierating/${movie_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reviews = await response.json();
      console.log(reviews);

      if (response.ok) {
        // return {
        //   review: review.Review,
        // };
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });

  function closeModal() {
    dispatch("close");
  }
</script>

<button class="close-button" type="button" on:click={closeModal}>Close</button>

<div class="modal">
  {#if reviews.length > 0}
    <div class="Reviews">
      <h3>Reviews</h3>

      {#each reviews as review}
        <p>
          Review:{review.Review}
          Rating:{review.rating}
        </p>
      {/each}
    </div>
  {/if}
</div>

<style>
  .Reviews {
    color: black;
  }
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
    align-items: center;
  }

  .close-button {
    background-color: red;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin-top: 10px;
  }
</style>
