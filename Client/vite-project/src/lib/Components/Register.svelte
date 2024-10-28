<script>
  import { navigate } from "svelte-routing";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errorMessage = "";
  let successMessage = "";
  let isAuthenticated = false;

  async function signUp(e) {
    e.preventDefault();
    console.log({ email, password, confirmPassword });
    try {
      const response = await fetch("http://localhost:4000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        // window.alert("Registration successful! ");
        successMessage = "Registration successful! You can now log in.";
        isAuthenticated = false; // Set to false until the user logs in
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        errorMessage = result.message || "Sign-up failed. Please try again.";
      }
    } catch (error) {
      errorMessage = "Sign-up failed. Please check your details and try again.";
      console.error(error);
    }
  }
  const signIn = () => {
    navigate("/");
  };
</script>

<form class="container" on:submit={signUp}>
  <h2>Sign Up</h2>

  <!-- Display error messages -->
  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}

  <!-- Display success messages -->
  {#if successMessage}
    <div class="success-message">{successMessage}</div>
  {/if}

  <!-- Input fields -->
  <input type="email" placeholder="Email" bind:value={email} required />
  <input
    type="password"
    placeholder="Password"
    bind:value={password}
    required
  />
  <input
    type="confirm password"
    placeholder="Confirm Password"
    bind:value={confirmPassword}
    required
  />

  <!-- Submit button -->
  <button class="button1" type="submit">Sign Up</button>
</form>

<!-- Redirect to sign-in -->
<div class="redirect">
  <button class="button2" on:click={signIn}>Already have an account?</button>
</div>

<style>
  .container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    background-color: #f3ebeb;
  }

  h2 {
    text-align: center;
    color: #0e0d0d;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .button1 {
    width: 100%;
    padding: 12px;
    background: linear-gradient(45deg, #28a745, #218838);
    color: hsl(0, 8%, 92%);
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition:
      background 0.3s,
      transform 0.3s;
  }

  .button1:hover {
    background: linear-gradient(45deg, #218838, #1e7e34);
    transform: scale(1.05);
  }

  .button1:active {
    transform: scale(0.98);
  }

  .redirect {
    text-align: center;
    margin-top: 1rem;
  }

  .button2 {
    padding: 12px;
    font-size: 16px;
    border: 2px solid #007bff;
    background-color: white;
    color: #007bff;
    border-radius: 6px;
    cursor: pointer;
    transition:
      background 0.3s,
      color 0.3s;
  }

  .button2:hover {
    background-color: #007bff;
    color: white;
  }

  .error-message {
    text-align: center;
    margin-bottom: 1rem;
    color: red;
  }

  .success-message {
    color: green;
    text-align: center;
    margin-bottom: 1rem;
  }
</style>
