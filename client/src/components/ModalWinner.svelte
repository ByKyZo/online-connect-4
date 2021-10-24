<script lang="ts">
    import Modal from './widgets/Modal.svelte';

    export let isOpen = false;
    export let winnerPseudo = '';
</script>

<Modal bind:isOpen>
    <div class="winner-modal">
        <span>{winnerPseudo} has win</span>
        <div class="button-wrapper">
            <button>Restart</button>
            <button>Leave</button>
        </div>
    </div>
</Modal>

<style>
    .button-wrapper {
        display: flex;
    }

    .button-wrapper button {
        width: 50%;
    }
</style>
