<script lang="ts">
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import ModalWinner from '../components/ModalWinner.svelte';
    import socket from '../config/socket';
    import Game from '../game/Game';
    import { party } from '../store/party.store';
    import { user } from '../store/user.store';
    const { host, guest, currentPlayer, game_grid, isExisting } = party;
    const { _id: userID } = user;

    // TODO Refactoriser proprement !
    // TODO Plus verifier la position valide en back
    // TODO Empecher de jouer en back si on spam une touche
    // TODO Ajouter le jeton en temps reel pour le joueur qui le pose
    // TODO Faire la modal de gagnant

    let isWin = false;
    let winnerState = {
        winnerID: '',
        winnerPseudo: '',
        coinPost: [],
    };

    let gridEl;
    let game: Game;

    onMount(() => {
        if (!$game_grid || !isExisting) {
            navigate('/');
            return;
        }

        game = new Game(gridEl, $game_grid);
    });

    socket.on('play coin', (data) => {
        const { coinPos, oldPlayer, updatedPlayer, winner } = data;

        game_grid.update((old) => {
            old[coinPos.row][coinPos.col] = oldPlayer.char;
            return old;
        });

        console.log(winner);
        if (winner) {
            isWin = true;
            winnerState = winner;

            if ($host.hostID === winner.winnerID) {
                party.incScore(host);
            } else if ($guest.guestID === winner.winnerID) {
                party.incScore(guest);
            }
            party.log();
        }

        // TODO A voir pour mettre le old player en parametre
        $: game && game.onPlay(coinPos.row, coinPos.col);

        currentPlayer.set(updatedPlayer);
    });

    $: {
        if (game) {
            console.log('update $ game');

            game.drawGrid();
            game.eventListenerHandler();
        }
    }
</script>

<!-- <ModalWinner bind:isOpen={isWin} /> -->
<ModalWinner bind:isOpen={isWin} winnerPseudo={winnerState.winnerPseudo} />

<h1>Game</h1>

<main>
    <!-- <button class="emotes">
    </button> -->
    <div bind:this={gridEl} class="grid">
        <!--  -->
    </div>
    <div class="display">
        <div class="player1-info display-part">
            <span class="player-info-name">{$host && $host.pseudo}</span>
            <span class="player-info-score">{$host && $host.score}</span>
        </div>
        <div class="current-player display-part">
            <span>CURRENT</span>
            <span>123</span>
        </div>
        <div class="player1-info display-part">
            <span class="player-info-name">{$host && $guest.pseudo}</span>
            <span class="player-info-score">{$host && $guest.score}</span>
        </div>
    </div>
</main>

<style>
    main {
        position: fixed;
        top: 0;
        left: 0;
        min-height: 100vh;
        min-width: 100vw;
        /* background-color: rgb(66, 66, 66); */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .display {
        display: flex;
        background-color: var(--secondary);
        border: 1px solid var(--primary);
        margin-top: auto;
    }

    .display-part {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        color: var(--primary);
        width: 230px;
        font-size: 2rem;
    }

    .current-player {
        border-left: 1px solid var(--primary);
        border-right: 1px solid var(--primary);
    }

    /* .player-info-name {
        font-size: 2rem;
    }
    .player-info-score {
        font-size: 2rem;
    } */

    .score {
        font-size: 2rem;
        width: 300px;
        display: flex;
        justify-content: space-between;
    }

    .grid {
        margin-top: 130px;
        position: relative;
        background-color: #262626;
        padding: 10px;
        border: 1px solid #b5b5b5;
    }

    :global(.token) {
        border-radius: 50%;
        height: 100%;
        width: 100%;
    }

    :global(.player1) {
        background-color: rgb(218, 56, 56);
    }

    :global(.player2) {
        background-color: rgb(50, 50, 221);
    }

    :global(.placeholder) {
        opacity: 0.3;
    }

    :global(.row) {
        background-color: transparent;
        border: none;
        display: flex;
    }

    :global(.cell) {
        /* border: 1px solid white; */
        border: 1px solid #b5b5b5;
        /* background-color: #262626; */
        background-color: #424242;
        margin: 6px;
        border-radius: 50%;
    }
</style>
