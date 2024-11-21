<script>
  import { jwtDecode } from "jwt-decode";
  import { navigate } from "svelte-routing";
  import { page } from "../../../../store";

  let email = "";
  let password = "";
  let errorMessage = "";
  let successMessage = "";
  let isAuthenticated = false;
  let user = "";

  const login = async () => {
    if (!email || !password) {
      errorMessage = "Email and Password are required";
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("jwtToken", result.token);
        const decodedToken = jwtDecode(result.token);
        successMessage = "Login Successful";
        isAuthenticated = true;
        navigate("/movies");
        page.set(1);
      } else {
        errorMessage =
          result.message || "Sign-in failed. Please check your credentials.  ";
      }
    } catch (error) {
      errorMessage = "Sign-in failed. Please try again later.";
      console.error(error);
    }
  };
  const handleSignup = () => {
    navigate("register");
  };
</script>

<!-- <html>
  <body> -->
<div class="heading">
  <h1>AJ Movies Rating</h1>
</div>
<div class="wrapper">
  <div class="container">
    <h2>Login</h2>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <div class="btn1Container">
      <button class="btn1" on:click={login}>Sign in</button>
    </div>
    <div class="btn2">
      <button class="btn2" on:click={handleSignup}>Create a New account</button>
    </div>
    {#if successMessage}
      <p class="success">{successMessage}</p>
    {/if}
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
  </div>
</div>

<!-- </body>
</html> -->

<style>
  /* html,
  global:(body) {
    background-color: rgb(12, 1, 1);
    margin: 0;
  } */
  :global(*) {
    background-color: black;
  }
  .container {
    max-width: 400px;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(244, 240, 240, 0.1);
    background-color: #ffffff;
    color: white;
    /* White background for the form */
  }
  .heading {
    background-color: black;
    color: #04bb75;
    font-family: "Times New Roman", Times, serif;
    font-style: inherit;
    animation: colorchange 5s infinite;
  }
  @keyframes colorchange {
    0% {
      color: rgb(255, 0, 119);
    }
    50% {
      color: rgb(183, 255, 0);
    }
    100% {
      color: green;
    }
  }
  h2 {
    text-align: center;
    color: hsl(0, 85%, 3%);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    background-color: white;
  }

  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  .btn1Container {
    margin-top: 1rem;
    background-color: white;
  }

  .btn1 {
    width: 100%;
    padding: 12px;
    background: linear-gradient(45deg, #04bb75, #11a073);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .btn1:hover {
    background: linear-gradient(45deg, #0056b3, #003d7a);
    transform: scale(1.05);
  }

  .btn1:active {
    transform: scale(0.98);
  }

  .btn2 {
    text-align: center;
    margin-top: 1rem;
    background-color: white;
  }

  .btn2 button {
    padding: 12px;
    font-size: 16px;
    border: 2px solid #0056b3;
    background-color: white;
    color: #0056b3;
    border-radius: 6px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .btn2 button:hover {
    background-color: #0056b3;
    color: white;
  }

  .success {
    color: green;
    text-align: center;
    margin-top: 1rem;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 1rem;
    background-color: white;
  }
</style>
