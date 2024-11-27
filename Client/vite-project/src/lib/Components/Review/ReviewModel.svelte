<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let movie_id;
  let review = "";
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
      review = await response.json();
      console.log(review.Review);

      if (response.ok) {
        return {
          review: review.Review,
        };
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

<div>
  <p>{review.Review}</p>
</div>

<style>
  p {
    color: white;
  }
</style>
