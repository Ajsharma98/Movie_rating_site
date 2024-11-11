<script>
  import { onMount } from "svelte";
  import { fetchAllUsers, displayedData } from "../../../store";
  let users = [];
  let errorMessage = "";
  let filter;

  onMount(async () => {
    try {
      const result = await fetchAllUsers((filter = 0));
      //   console.log(result);
      users = result.users;
    } catch (err) {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    }
  });
</script>

<body>
  <div class="profile">
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
    <!-- {#if users.length > 0} -->

    <h3>Non-deleted Users</h3>

    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {#each $displayedData as user}
          <tr>
            <td>{user.email}</td>
            <td>{user.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</body>

<style>
  /* Make the table take up the whole page */
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: Arial, sans-serif;
  }

  table {
    width: 100%;
    height: 100vh; /* 100% of the viewport height */
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    align-items: center;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #eaeaea;
  }

  /* Force each row to fill the remaining height evenly */
  tbody {
    height: 100%;
    display: block;
    overflow-y: auto;
  }

  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  td {
    color: white;
  }
  h3 {
    color: white;
  }
</style>
