<script lang="ts">
    import { navigate } from 'svelte-navigator';
    import socket from '../config/socket';
    import { party } from '../store/party.store';
    import { user } from '../store/user.store';
    const { _id: userID } = user;

    socket.on('join party', (partyJoined) => {
        const { _id, name, host, guest, currentPlayer, game_grid } = partyJoined;
        if ($userID === host.hostID || $userID === guest.guestID) {
            party.startParty(_id, name, host, guest, currentPlayer, game_grid);
            party.log();
            // TODO rediriger quand le partie commence
            navigate('/game');
            // console.log('good player');
        }
    });
</script>

<style>
</style>
