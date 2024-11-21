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
  import MovieFilter from "./lib/Components/Admin/Filters/MovieFilter.svelte";
  import AdminProfile from "./lib/Components/Admin/Admin/AdminProfile.svelte";
  import AdminDetails from "./lib/Components/Admin/Movies/AdminDetails.svelte";
  import AdminMovieDetails from "./lib/Components/Admin/Admin/AdminMovieDetails.svelte";
  import AdminRatingDetails from "./lib/Components/Admin/Admin/AdminRatingDetails.svelte";
  import NonDeleted from "./lib/Components/Admin/Movies/NonDeleted.svelte";
  import DeletedMovie from "./lib/Components/Admin/Movies/DeletedMovie.svelte";
  import AllMovies from "./lib/Components/Admin/Movies/AllMovies.svelte";
  import NonDeletedUsers from "./lib/Components/Admin/Users/NonDeletedUsers.svelte";
  import DeletedUser from "./lib/Components/Admin/Users/DeletedUser.svelte";
  import AllUserDetails from "./lib/Components/Admin/Users/AllUserDetails.svelte";
  import FilterMoviebyid from "./lib/Components/filterMoviebyid.svelte";
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
    <Route path="/user-details" component={UserDetails} />
    <Route path="/movie-details" component={MovieDetails} />
    <Route path="/Rating-details" component={RatingDetails} />
    <Route path="/movie_filter" component={MovieFilter} />
    <Route path="/adminprofile/user-details" component={AdminDetails} />
    <Route path="/adminprofile/movie-details" component={AdminMovieDetails} />
    <Route path="/adminprofile/Rating-details" component={AdminRatingDetails} />
    <Route path="/profile/Non-deletedmovies" component={NonDeleted} />
    <Route path="/profile/deleted-movies" component={DeletedMovie} />
    <Route path="/profile/Allmovies-posted" component={AllMovies} />
    <Route path="/users/nondeleted-users" component={NonDeletedUsers} />
    <Route path="/users/deleted-users" component={DeletedUser} />
    <Route path="/users/all-users" component={AllUserDetails} />
    <Route path="/filteredMovie" component={FilterMoviebyid} />
  </div>
</Router>
