<script>
  import RatingModel from "../Components/RatingModel.svelte"; // Import the modal component
  let showModal = false;
  export let movieId;
  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleSuccess(event) {
    console.log(event.detail); // Handle success if needed
    closeModal();
  }
</script>

<button class="button" on:click={openModal}>Add Rating</button>

{#if showModal}
  <div class="modal-overlay">
    <RatingModel {movieId} on:success={handleSuccess} on:close={closeModal} />
  </div>
{/if}

<style>
  .button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    /* position: absolute; */
    /* bottom: 10px;
    left: 50%;
    transform: translateX(-50%); */
  }

  .button:hover {
    background-color: #218838;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
