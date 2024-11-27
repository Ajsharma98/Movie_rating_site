<script>
  import ReviewModel from "./ReviewModel.svelte";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faEye } from "@fortawesome/free-solid-svg-icons";

  let showModal = false;
  export let movie_id;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<button class="eye" on:click={openModal}>
  <FontAwesomeIcon icon={faEye} />
</button>
{#if showModal}
  <div class="modal-overlay">
    <ReviewModel {movie_id} on:close={closeModal} />
  </div>
{/if}

<style>
  .eye {
    position: absolute;
    top: 20px;
    left: 50px;
    background-color: transparent;
    border: none;
    font-size: 17px;
    /* cursor: pointer; */
    transition: transform 0.2s ease;
    color: burlywood;
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
