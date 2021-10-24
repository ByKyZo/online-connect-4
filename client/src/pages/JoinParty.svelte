<script lang="ts">
    import socket from '../config/socket';
    import { user } from '../store/user.store';
    import { party } from '../store/party.store';
    const { _id, pseudo } = user;

    let parties = [];

    // TODO stocker la current partie du joueur dans son state (vide si y'a pas sinon lance le jeu)

    socket.emit('get parties');

    socket.on('get parties', (partiesData) => {
        parties = partiesData;
    });

    socket.on('create party', (party) => {
        parties = [...parties, party];
    });

    $: parties = parties.filter((p) => !p.hasBegun);

    const handleJoinParty = (partyID) => {
        socket.emit('join party', { partyID, guestID: $_id, guestPseudo: $pseudo });
    };
</script>

<div class="wrapper">
    <main>
        <h1>Join party</h1>

        <div class="party-list">
            {#each parties as party}
                <div class="party">
                    <div class="party-infos">
                        <span class="party-name">{party.name}</span>
                        <span class="party-host-name">by {party.host.pseudo}</span>
                    </div>
                    <button on:click={() => handleJoinParty(party._id)} class="party-btn-join">
                        Join
                    </button>
                </div>
            {/each}
        </div>
    </main>
</div>

<style>
    main {
        top: 40%;
        left: 50%;
        margin-top: 10vh;
    }

    .wrapper {
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    h1 {
        text-align: center;
        color: var(--white);
        font-size: 3.6rem;
        margin-bottom: 26px;
    }

    .party-list {
        background-color: var(--secondary);
        border: 1px solid var(--primary);
        display: flex;
        flex-direction: column;
        padding: 26px;
        width: 500px;
        max-height: 68vh;
        overflow-y: auto;
    }
    .party-list::-webkit-scrollbar {
        width: 10px;
    }

    .party-list::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
    }

    .party-list::-webkit-scrollbar-thumb {
        background: var(--primary);
    }

    .party {
        display: flex;
        justify-content: space-between;
        border: 1px solid var(--primary);
        padding: 12px 16px;
        margin-bottom: 20px;
    }

    .party-infos {
        display: flex;
        flex-direction: column;
    }

    .party-name {
        font-size: 1.6rem;
        color: white;
    }

    .party-host-name {
        font-size: 1.2rem;
        color: var(--primary);
    }

    .party-btn-join {
        width: 100px;
        font-size: 1.8rem;
        color: var(--secondary);
        /* background-color: var(--primary); */
        background-color: white;
        border: none;
        cursor: pointer;
    }
</style>
