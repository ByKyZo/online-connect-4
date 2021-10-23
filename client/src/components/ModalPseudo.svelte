<script lang="ts">
    import Cookie from 'js-cookie';
    import Modal from './widgets/Modal.svelte';
    import socket from '../api/socket';
    export let isOpen = false;

    let pseudo = '';

    const handleSubmit = () => {
        if (!pseudo) {
            console.log('pseudo empty');
            return;
        }
        // socket.on('')
        socket.emit('send pseudo', { pseudo });
        // socket.io.emit('sendpseudo', {});
    };

    socket.on('send pseudo', ({ pseudo }) => {
        console.log('socket on pseudo : ', pseudo);
    });
</script>

<Modal bind:isOpen>
    <form class="modal-pseudo" on:submit|preventDefault={handleSubmit}>
        <input bind:value={pseudo} placeholder="Pseudo" type="text" />
        <button>Submit</button>
    </form>
</Modal>

<style>
    .modal-pseudo {
        display: flex;
        flex-direction: column;
    }

    input {
        border: 1px solid var(--primary);
        height: 20px;
        background-color: transparent;
        padding: 16px;
        font-size: 1.6rem;
        height: 50px;
        margin-bottom: 16px;
        color: var(--primary);
    }

    button {
        height: 50px;
        font-size: 1.6rem;
        color: var(--secondary);
        cursor: pointer;
    }
</style>
