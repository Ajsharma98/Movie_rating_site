<script>
  import { Router, Route, navigate } from "svelte-routing";
  import Login from "./lib/Components/Login.svelte";
  import Register from "./lib/Components/Register.svelte";
  import Logout from "./lib/Components/Logout.svelte";
  import Movies from "./lib/Components/Movies.svelte";
  import MoviesModal from "./lib/Components/MoviesModal.svelte";
  import RatingModel from "./lib/Components/RatingModel.svelte";
  import MainProfile from "./lib/Components/MainProfile.svelte";
</script>

<Router>
  <div>
    <Route path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/logout" component={Logout} />
    <Route path="/movies" component={Movies} />
    <Route path="/addmovies" component={MoviesModal} />
    <Route path="/addrating" component={RatingModel} />
    <Route path="/Profile" component={MainProfile} />
  </div>
</Router>
