<script>
  import { fetchAllMovies } from "../../../store";
  let filter = "";
  filter = "0";
  fetchAllMovies(filter);
  console.log(fetchAllMovies);
</script>
