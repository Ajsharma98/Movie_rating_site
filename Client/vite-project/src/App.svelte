<script>
  import { Router, Route, navigate } from "svelte-routing";
  import Login from "./lib/Components/Login.svelte";
  import Register from "./lib/Components/Register.svelte";
</script>

<Router>
  <div>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
  </div>
</Router>
