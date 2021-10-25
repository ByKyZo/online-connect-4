<script lang="ts">
    import socket from '../config/socket';
    import { party } from '../store/party.store';
    import Modal from './widgets/Modal.svelte';
    const { _id } = party;

    export let isOpen = false;
    export let winnerPseudo = '';

    const handleRestart = () => {
        socket.emit('restart party', { partyID: _id });
    };
</script>

<Modal bind:isOpen>
    <div class="winner-modal">
        <p class="winner">{winnerPseudo} has won</p>
        <div class="button-wrapper">
            <button on:click={handleRestart}>Restart</button>
            <button>Leave</button>
        </div>
    </div>
</Modal>

<style>
    .winner-modal {
        width: 300px;
    }

    .button-wrapper {
        display: flex;
    }

    .winner {
        margin-bottom: 24px;
        font-size: 2rem;
        color: var(--primary);
    }

    button {
        background-color: var(--primary);
        color: var(--secondary);
        border: none;
        height: 40px;
        /* width: 100px; */
        font-size: 1rem;
        cursor: pointer;
    }

    button:nth-child(1) {
        margin-right: 12px;
    }

    .button-wrapper button {
        width: 50%;
    }
</style>
