<script lang="ts">
    import { link } from 'svelte-navigator';
    import Cookie from 'js-cookie';
    import ModalPseudo from '../components/ModalPseudo.svelte';

    const SESSION_COOKIE = Cookie.get('SESSION');
    let isOpen = false;
    console.log(SESSION_COOKIE);

    const handleClickMode = (e) => {
        if (!SESSION_COOKIE) {
            isOpen = true;
            e.preventDefault();
        } else {
            isOpen = false;
        }
    };

    const test = document.cookie;
</script>

<ModalPseudo bind:isOpen />

<main>
    <h1>CONNECT 4</h1>

    <div class="mode-selection">
        <h2>PLAY WITH</h2>
        <div class="select-box">
            <a class="select-box__item" on:click={handleClickMode} href="/game" use:link>
                <img class="mode-icon" src="assets/robot.svg" alt="" />
                <span class="mode-label">ROBOT</span>
            </a>
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
    main {
        background-color: var(--background);
        min-height: 100vh;
        width: 100vw;
    }

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
