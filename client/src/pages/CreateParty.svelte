<script lang="ts">
    import socket from '../config/socket';
    import { party } from '../store/party.store';
    import { user } from '../store/user.store';
    const { _id: userID, pseudo } = user;

    let partyName = '';

    const handleCreateParty = () => {
        if (!partyName) return console.log('party name empty');
        socket.emit('create party', { partyName, hostID: $userID, hostPseudo: $pseudo });
    };

    socket.on('create party', (partyCreated) => {
        const { _id, name, host } = partyCreated;
        if ($userID === host.hostID) {
            party.createParty(_id, name);
            party.log();
        }
    });
</script>

<main>
    <h1>Create party</h1>

    <form on:submit|preventDefault={handleCreateParty}>
        <input bind:value={partyName} type="text" placeholder="Party name" />
        <button type="submit">Create</button>
    </form>
</main>

<style>
    main {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
    }
    h1 {
        text-align: center;
        color: var(--white);
        font-size: 3.6rem;
        margin-bottom: 26px;
    }

    form {
        background-color: var(--secondary);
        border: 1px solid var(--primary);
        display: flex;
        flex-direction: column;
        padding: 20px;
    }

    input {
        border: 1px solid var(--primary);
        height: 20px;
        background-color: transparent;
        padding: 16px;
        font-size: 1.6rem;
        height: 50px;
        margin-bottom: 30px;
        color: var(--primary);
    }

    button {
        height: 50px;
        font-size: 1.6rem;
        color: var(--secondary);
        cursor: pointer;
    }
</style>
