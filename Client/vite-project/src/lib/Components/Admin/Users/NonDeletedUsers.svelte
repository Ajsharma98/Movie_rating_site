<script>
  import { onMount } from "svelte";
  import { displayedData } from "../../../../store";
  import { fetchAllUsers } from "../../../../modules/fetchUsers";
  import { page, totalPages } from "../../../../store";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  let users = [];
  let errorMessage = "";
  let filter;
  fetchAllUsers((filter = 0));
  onMount(async () => {
    try {
      page.set(1);
      const result = await fetchAllUsers((filter = 0));
      //   console.log(result);
      users = result.users;
    } catch (err) {
      errorMessage = "Failed to fetch movies";
      console.error("Error:", err);
    }
  });
  let inputPage = "";
  const handlePageInput = (e) => {
    e.preventDefault();
    const pageNum = Number(inputPage);
    if (!isNaN(pageNum)) {
      goToPage(pageNum);
    }
  };

  async function deletedUser(user_id) {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`http://localhost:4000/users/${user_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include Bearer prefix for JWT
      },
    });
    if (response.ok) {
      fetchAllUsers();
    } else {
      const error = await response.json();
      console.error("Error deleting book:", error.message);
    }
  }

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= $totalPages) {
      page.set(newPage);
      //   $filter;
      fetchAllUsers((filter = 0));
    } else {
      console.warn("Page number out of range:", newPage);
    }
  };
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
          <th>id </th>
          <th>Email</th>
          <th>Name</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each $displayedData as user}
          <tr>
            <td>{user.user_id}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td
              ><button
                on:click={() => deletedUser(user.user_id)}
                class="delete"
                aria-label="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</body>
<div class="pagination-controls">
  <button on:click={() => goToPage(1)} disabled={$page === 1}>&laquo </button>

  <button on:click={() => goToPage($page - 1)} disabled={$page === 1}
    >&lt</button
  >
  <span id="pageDisplay">Page {$page} of {$totalPages}</span>
  <form on:input={handlePageInput}>
    <input
      type="number"
      min="1"
      max={$totalPages}
      bind:value={inputPage}
      placeholder="Go to Page"
      aria-label="Go to Page "
    />
  </form>
  <button on:click={() => goToPage($page + 1)} disabled={$page === $totalPages}>
    &gt;
  </button>

  <button
    on:click={() => goToPage($totalPages)}
    disabled={$page === $totalPages}
  >
    &raquo;
  </button>
</div>

<!-- <Pagination /> -->

<style>
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: Arial, sans-serif;
  }

  table {
    width: 100%;
    height: 100vh;
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

  input {
    color: black;
    background-color: white;
  }
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .pagination-controls button {
    margin: 0 8px;
    padding: 8px 15px;
    font-size: 1rem;
    border: 2px solid transparent;
    background-color: #007bff;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition:
      background-color 0.3s,
      border-color 0.3s;
  }

  .pagination-controls button:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  .pagination-controls button:disabled {
    background-color: #d6d6d6;
    color: #a0a0a0;
    cursor: not-allowed;
    border-color: #d6d6d6;
  }

  #pageDisplay {
    margin: 0 12px;
    font-weight: bold;
    font-size: 1.1rem;
    color: white;
    /* background-color: hsl(0, 12%, 89%); */
  }

  .delete {
    background-color: transparent;
    border: none;
    color: red;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
</style>
