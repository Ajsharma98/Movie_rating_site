<script>
  import { Router, Route, navigate } from "svelte-routing";
  import Login from "./lib/Components/Login.svelte";
  import Register from "./lib/Components/Register.svelte";
  import Logout from "./lib/Components/Logout.svelte";
  import Movies from "./lib/Components/Movies.svelte";
  import MoviesModal from "./lib/Components/MoviesModal.svelte";
  import RatingModel from "./lib/Components/RatingModel.svelte";
  import MainProfile from "./lib/Components/MainProfile.svelte";
  import UserDetails from "./lib/Components/UserDetails.svelte";
  import MovieDetails from "./lib/Components/MovieDetails.svelte";
  import RatingDetails from "./lib/Components/RatingDetails.svelte";
  import MovieFilter from "./lib/Components/Admin/MovieFilter.svelte";
  import AdminProfile from "./lib/Components/Admin/AdminProfile.svelte";
  import AdminDetails from "./lib/Components/Admin/AdminDetails.svelte";
  import AdminMovieDetails from "./lib/Components/Admin/AdminMovieDetails.svelte";
  import AdminRatingDetails from "./lib/Components/Admin/AdminRatingDetails.svelte";
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
    <Route path="/profile/user-details" component={UserDetails} />
    <Route path="/profile/movie-details" component={MovieDetails} />
    <Route path="/profile/Rating-details" component={RatingDetails} />
    <Route path="/movie_filter" component={MovieFilter} />
    <Route path="/profile/Non-deletedmovies" component={AdminProfile} />
    <Route path="/adminprofile/user-details" component={AdminDetails} />
    <Route path="/adminprofile/movie-details" component={AdminMovieDetails} />
    <Route path="/adminprofile/Rating-details" component={AdminRatingDetails} />
  </div>
</Router>
