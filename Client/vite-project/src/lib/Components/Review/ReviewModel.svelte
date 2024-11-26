<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let successMessage = "";
  let errorMessage = "";
  const eyeClick = async (event) => {
    event.preventDefault();
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    } catch (error) {}
  };
</script>
