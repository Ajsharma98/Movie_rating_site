<script>
    import {Router, Route, navigate} from 'svelte-routing';
    import Login from './lib/Components/Login.svelte';


</script>
<Router>
    <div>
      <Route path="/" component={Login}/>
    </div>
</Router>