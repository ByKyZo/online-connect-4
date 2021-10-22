<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import Game from '../pages/Game.svelte';
    import Home from '../pages/Home.svelte';
</script>

<Router>
    <Route path="/">
        <Home />
    </Route>
    <Route path="/game">
        <Game />
    </Route>
</Router>

<style>
</style>
