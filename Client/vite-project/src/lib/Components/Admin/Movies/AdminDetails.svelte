<script>
  import { onMount } from "svelte";
  import { getIdFromToken } from "../../../../modules/fetchIdFromToken";

  let user = null;
  let errorMessage = "";

  const token = localStorage.getItem("jwtToken");

  onMount(async () => {
    const Token = await getIdFromToken();
    console.log(Token.user_id);

    if (!Token.user_id) {
      errorMessage = "Unable to retrieve user details.";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/users/${Token.user_id}?include=user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result); // Log the result to check the API response structure

      if (response.ok) {
        user = result.user || null;
      } else {
        errorMessage = result.error || "Failed to fetch profile data.";
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      errorMessage = "Error fetching profile data.";
    }
  });
</script>

<div class="profile">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  {#if user}
    <h2>Your Profile</h2>
    <p><strong>User ID: </strong> {user.user_id}</p>
    <p><strong>Name: </strong> {user.name}</p>
    <p><strong>Email: </strong> {user.email}</p>
    <p><strong>Role: </strong> {user.role}</p>
  {/if}
</div>

<style>
  .profile {
    padding: 20px;
    background-color: black;
    border-radius: 8px;
    max-width: 600px;
    margin: auto;
  }

  h2 {
    margin-bottom: 15px;
    color: white;
    background-color: black;
  }

  p {
    margin-bottom: 10px;
    font-size: 16px;
    color: white;
    background-color: black;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
