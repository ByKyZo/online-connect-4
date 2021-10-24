<script lang="ts">
    import Cookie from 'js-cookie';
    import Loader from './components/Loader.svelte';
    import socket from './config/socket';
    import Router from './router/Router.svelte';
    import { user } from './store/user.store';
    import { ECookie } from './typescript/enum';

    const SESSION_COOKIE = Cookie.get(ECookie.SESSION);

    let isLoading = true;

    if (SESSION_COOKIE) {
        socket.emit('load session', { token: SESSION_COOKIE });
        socket.on('load session', ({ userLoaded }) => {
            isLoading = false;

            if (!userLoaded) {
                console.log('session not found');
                user.removeCookieSession();
                return;
            }

            user.loadSession(userLoaded._id, userLoaded.pseudo);
            user.log();
        });
    } else {
        isLoading = false;
    }
</script>

{#if isLoading}
    <Loader />
{:else}
    <Router />
{/if}

<style>
</style>
