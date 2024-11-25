<script>
  import RatingModel from "./RatingModel.svelte"; // Import the modal component
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

<button class="button" on:click={openModal}>+</button>

{#if showModal}
  <div class="modal-overlay">
    <RatingModel {movieId} on:success={handleSuccess} on:close={closeModal} />
  </div>
{/if}

<style>
  .button {
    padding: 10px 20px;
    background-color: rgb(65, 74, 76);
    color: white;
    border: none;
    cursor: pointer;
    /* border-radius: 5px; */
    position: absolute;
    top: 2px;
    left: 0px;
    height: 50px;
    font-size: 20px;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    /* bottom: 10px;
    left: 50%;
    transform: translateX(-50%); */
  }

  .button:hover {
    background-color: rgb(59, 68, 75);
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
    z-index: 1;
  }
</style>
