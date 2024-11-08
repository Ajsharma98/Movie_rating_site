<script>
  import { page, totalPages, fetchAllMovies } from "../../store";

  let inputPage = "";
  const handlePageInput = (e) => {
    e.preventDefault();
    const pageNum = Number(inputPage);
    if (!isNaN(pageNum)) {
      goToPage(pageNum);
    }
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= $totalPages) {
      page.set(newPage);
      fetchAllMovies();
    } else {
      console.warn("Page number out of range:", newPage);
    }
  };
</script>

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

<style>
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
</style>
