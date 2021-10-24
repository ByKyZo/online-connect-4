<script lang="ts">
    import { Router, Route } from 'svelte-navigator';
    import CreateParty from '../pages/CreateParty.svelte';
    import Game from '../pages/Game.svelte';
    import Home from '../pages/Home.svelte';
    import JoinParty from '../pages/JoinParty.svelte';
    import ProtectedRoute from './ProtectedRoute.svelte';
    import SocketJoin from '../pages/SocketJoin.svelte';
</script>

<Router>
    <SocketJoin />
    <Route path="/">
        <ProtectedRoute />
        <Home />
    </Route>
    <Route path="/game">
        <ProtectedRoute />
        <Game />
    </Route>
    <Route path="/create-party">
        <ProtectedRoute />
        <CreateParty />
    </Route>
    <Route path="/join-party">
        <ProtectedRoute />
        <JoinParty />
    </Route>
</Router>

<style>
</style>
