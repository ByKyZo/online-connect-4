<script>
    export let isOpen = false;
    let clazz = '';
    export { clazz as class };
</script>

{#if isOpen}
    <div class="overlay">
        <div class={`modal ${clazz || ''}`}>
            <!-- <div class={$$.props.class}> -->
            <!-- <div class={`${clazz || ''}`}> -->
            <slot />
            <!-- </div> -->
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 999;
    }

    .modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--secondary);
        border: 1px solid var(--primary);
        padding: 20px 30px;
    }
</style>
