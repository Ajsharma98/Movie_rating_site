<script>
  import { navigate } from "svelte-routing"; // For route navigation
  import profile from "../../../../../profile.png";
  import { fetchUserName } from "../../../../modules/fetchUserDetails";
  let isOpen = false;
  let name = "";

  // Toggle dropdown
  function toggleDropdown() {
    isOpen = !isOpen;
  }

  // Navigate to different routes based on user choice
  function goToUserDetails() {
    isOpen = false; // Close dropdown
    navigate("user-details"); // Navigate to the selected route
  }

  function goToMoviesDetails() {
    isOpen = false;
    navigate("movie-details");
  }

  function goToRatingDetails() {
    isOpen = false;
    navigate("Rating-details");
  }

  // function handleClickOutside(event) {
  //   if (
  //     !event.target.closest(".dropdown") &&
  //     !event.target.closest(".profile-button")
  //   ) {
  //     isOpen = false;
  //   }
  // }

  const UserName = async () => {
    const result = await fetchUserName();
    console.log(result);
    name = result.name;
  };
  UserName();
</script>

<!-- Profile Icon and Dropdown -->
<div class="profile-container">
  <button class="profile-icon" on:click={toggleDropdown}>
    <img src={profile} alt="Profile" />Hi, {name}
  </button>
  {#if isOpen}
    <div class="dropdown">
      <button on:click={goToUserDetails}>User Details</button>
      <button on:click={goToMoviesDetails}>Movies Posted</button>
      <button on:click={goToRatingDetails}>Ratings Posted</button>
      <!-- <button on:click={handleClickOutside}></button> -->
    </div>
    <!-- {:else}
    <dom on:click={handleClickOutside}></dom> -->
  {/if}
</div>

<style>
  .profile-container {
    position: fixed;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
  }

  .profile-icon {
    cursor: pointer;
    /* border-radius: 50%; */
    overflow: hidden;
    width: 65px;
    font-size: 10px;
    height: auto;
    background-color: black;
    color: white;
  }

  .profile-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dropdown {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }

  .dropdown button {
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  .dropdown button:hover {
    background-color: #f0f0f0;
  }
  
</style>
