<script lang="ts">
    import { link } from 'svelte-navigator';
    import { user } from '../store/user.store';
    import ModalPseudo from '../components/ModalPseudo.svelte';
    import { get } from 'svelte/store';
    const { isConnected } = user;

    let isOpen = false;

    const handleClickMode = (e) => {
        if (!get(isConnected)) {
            isOpen = true;
            e.preventDefault();
        } else {
            isOpen = false;
        }
    };
</script>

<ModalPseudo bind:isOpen />

<main>
    <h1>CONNECT 4</h1>

    <div class="mode-selection">
        <h2>PLAY WITH</h2>
        <div class="select-box">
            <!-- <a class="select-box__item" on:click={handleClickMode} href="/game" use:link>
                <img class="mode-icon" src="assets/robot.svg" alt="" />
                <span class="mode-label">ROBOT</span>
            </a> -->
            <a class="select-box__item" on:click={handleClickMode} href="/create-party" use:link>
                <img class="mode-icon" src="assets/robot.svg" alt="" />
                <span class="mode-label">CREATE PARTY</span>
            </a>
            <a class="select-box__item" on:click={handleClickMode} href="/join-party" use:link>
                <img class="mode-icon" src="assets/robot.svg" alt="" />
                <span class="mode-label">JOIN PARTY</span>
            </a>
        </div>
    </div>
</main>

<style>
    h1 {
        color: var(--white);
        position: fixed;
        left: 50%;
        top: 10%;
        transform: translateX(-50%);
        font-size: 6rem;
        width: 100%;
        text-align: center;
    }

    h2 {
        color: var(--white);
        font-size: 4rem;
        text-align: center;
        letter-spacing: 6px;
    }

    .mode-selection {
        background-color: var(--secondary);
        height: 300px;
        width: 600px;
        position: fixed;
        left: 50%;
        top: 38%;
        transform: translateX(-50%);
        font-size: 4rem;
        border: 1px solid var(--primary);
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .select-box {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 100%;
    }

    .select-box__item {
        height: 120px;
        width: 28%;
        border: 1px solid var(--primary);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        text-decoration: none;
        color: var(--primary);
    }

    .mode-icon {
        height: 40%;
        width: 40%;
    }

    .mode-label {
        font-size: 1.6rem;
    }
</style>
