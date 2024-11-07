<script>
  import { onMount } from "svelte";
  import { fetchAllUsers } from "../../../store";
  let users = [];
  let errorMessage = "";
  let filter;

  onMount(async () => {
    try {
      const result = await fetchAllUsers((filter = 2));
      //   console.log(result);
      users = result.users;
    } catch (err) {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    }
  });
</script>

<div class="profile">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  {#if users.length > 0}
    <h3>deleted users</h3>
    <ul>
      {#each users as user}
        <li>
          <strong
            >Email: {user.email} Name: {user.name} with Id:{user.user_id}</strong
          >
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .profile {
    padding: 20px;
  }

  .error {
    color: red;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  strong {
    font-weight: bold;
  }
</style>
