<script>
  import { navigate } from "svelte-routing";
  export const logout = async () => {
    const response = await fetch("http://localhost:4000/users/logout", {
      method: "POST",
      // credentials: 'include',  // Ensure cookies or other credentials are included in the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Clear stored session and role information
      localStorage.removeItem("jwtToken"); // Remove JWT token
      // localStorage.removeItem('sessionId'); // If you're using a session ID
      navigate("/"); // Redirect to the login page after successful logout
    } else {
      alert("Error while logging out");
    }
  };
</script>

<div class="buttonContainer">
  <button class="btn1" on:click={logout}>Log Out</button>
</div>

<style>
  .buttonContainer {
    text-align: center;
    margin-top: 20px;
  }

  .btn1 {
    background-color: #ff4d4d;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .btn1:hover {
    background-color: #ff1a1a;
  }
</style>
