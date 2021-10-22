<script lang="ts">
    import { Link } from 'svelte-navigator';
</script>

<main>
    <h1>CONNECT 4</h1>

    <div class="mode-selection">
        <h2>PLAY WITH</h2>
        <Link to="/game">to gameeee</Link>
        <div class="select-box">
            <Link class="" to="/game/ia">
                <img class="mode-icon" src="assets/robot.svg" alt="" />
                <span class="mode-label">ROBOT</span>
            </Link>
            <Link class="select-box__item" to="/create-party">
                <img class="mode-icon" src="assets/robot.svg" alt="" />
                <span class="mode-label">CREATE PARTY</span>
            </Link>
            <Link class="select-box__item" to="/join-party">
                <img class="mode-icon" src="assets/robot.svg" alt="" />
                <span class="mode-label">JOIN PARTY</span>
            </Link>
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

    .select-box > :global(a) {
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
