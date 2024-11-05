<script>
  import { onMount } from "svelte";
  import { getIdFromToken } from "../../store";

  let user = null;
  let movies = [];
  let ratings = [];
  let errorMessage = "";

  const token = localStorage.getItem("jwtToken");

  //   async function getIdFromToken() {
  //     if (!token) return null;
  //     const payload = JSON.parse(atob(token.split(".")[1]));
  //     return payload.user_id;
  //   }

  onMount(async () => {
    const user_id = await getIdFromToken();
    console.log(user_id);

    if (!user_id) {
      errorMessage = "Unable to retrieve user details.";
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/users/${user_id}?include=user,movies,ratings`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result); // Log the result to check the API response structure

      if (response.ok) {
        user = result.user || null;
        movies = result.movies || [];
        ratings = result.ratings || [];
      } else {
        errorMessage = result.error || "Failed to fetch profile data.";
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      errorMessage = "Error fetching profile data.";
    }
  });
</script>

<div class="profile">
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}

  {#if user}
    <h2>User Profile</h2>
    <p><strong>User ID:</strong> {user.user_id}</p>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
  {/if}

  {#if movies.length > 0}
    <h3>Movies Posted by You</h3>
    <ul>
      {#each movies as movie}
        <li>
          <strong>{movie.name}</strong> (Rating: {movie.avg_rating})
        </li>
      {/each}
    </ul>
  {/if}

  {#if ratings.length > 0}
    <h3>Your Ratings</h3>
    <ul>
      {#each ratings as rating}
        <li>
          Rated movie_id: <strong>{rating.movie_id}</strong> with rating: {rating.rating}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .profile {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    max-width: 600px;
    margin: auto;
  }

  h2,
  h3 {
    margin-bottom: 15px;
    color: #333;
  }

  p {
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 8px;
    font-size: 14px;
    color: #444;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
