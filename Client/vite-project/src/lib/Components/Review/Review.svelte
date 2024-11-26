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
  function handleSuccess(event) {
    console.log(event.detail); // Handle success if needed
    closeModal();
  }
</script>

<button class="eye" on:click={openModal}>
  <FontAwesomeIcon icon={faEye} />
</button>

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
</style>
