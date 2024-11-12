<script>
  import { navigate } from "svelte-routing"; // For route navigation
  import profile from "../../../../profile.png";
  import { filter } from "../../../store";
  import { fetchAllMovies } from "../../../store";
  let isOpen = false;
  let anotherisOpen = false;
  let DropdownIs = false;

  // function change_filter(changefilter) {
  //   filter.set(changefilter);
  //   fetchAllMovies();
  // }
  // Toggle dropdown
  function Dropdown() {
    DropdownIs = !DropdownIs;
  }
  function anothertoggleDropdown() {
    anotherisOpen = !anotherisOpen;
  }
  function toggleDropdown() {
    isOpen = !isOpen;
  }

  // Navigate to different routes based on user choice
  function goToUserDetails() {
    isOpen = false; // Close dropdown
    navigate("/adminprofile/user-details"); // Navigate to the selected route
  }

  function goToMoviesDetails() {
    isOpen = false;
    navigate("/adminprofile/movie-details");
  }

  function goToRatingDetails() {
    isOpen = false;
    navigate("/adminprofile/Rating-details");
  }

  function NonDeletedMovies() {
    isOpen = false;
    navigate("/profile/Non-deletedmovies");
  }

  function DeletedMovies() {
    isOpen = false;
    navigate("/profile/deleted-movies");
  }

  function AllMovies() {
    isOpen = false;
    navigate("/profile/Allmovies-posted");
  }
  function NonDeletedUsers() {
    DropdownIs = false;
    navigate("/users/nondeleted-users");
  }

  function DeletedUser() {
    DropdownIs = false;
    navigate("/users/deleted-users");
  }

  function AllUsers() {
    DropdownIs = false;
    navigate("/users/all-users");
  }
</script>

<!-- Profile Icon and Dropdown -->
<div class="profile-container">
  <button class="profile-icon" on:click={toggleDropdown}>
    <img src={profile} alt="Profile" />
  </button>
  {#if isOpen}
    <div class="dropdown">
      <button on:click={goToUserDetails}>User Details</button>
      <button on:click={goToMoviesDetails}>Movies Posted</button>
      <button on:click={goToRatingDetails}>Ratings Posted</button>
      <!-- <button on:click={AlltypeMovies}>All type of movies</button> -->
      <button on:click={anothertoggleDropdown}>AllMovies</button>
      {#if anotherisOpen}
        <button
          on:click={() => {
            // change_filter(0);
            NonDeletedMovies();
          }}>All Non deleted movies</button
        >
        <button
          on:click={() => {
            // change_filter(1);
            DeletedMovies();
          }}>All Deleted Movies</button
        >
        <button
          on:click={() => {
            // change_filter(2);
            AllMovies();
          }}>All Posted Movies</button
        >
      {/if}
      <button on:click={Dropdown}>AllUsers</button>
      {#if DropdownIs}
        <button on:click={NonDeletedUsers}>All Non deleted users</button>
        <button on:click={DeletedUser}>All Deleted users</button>
        <button on:click={AllUsers}>All Type of Users</button>
      {/if}
    </div>
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
    height: auto;
    background-color: black;
    color: black;
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
