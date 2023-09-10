<script>
    import { fade } from "svelte/transition";
    import { statusList } from "./stores";

    export let status = "Non iniziato";

    let showContextMenu = false;
    let color = "red";

    $statusList = [    
        {name: "Non iniziato", color: "red"},
        {name: "In corso", color: "cyan"},
        {name: "Terminato", color: "lime"},
    ]

    $: { 
        for (let i in $statusList) {
            let curStatus = $statusList[i]

            if (curStatus.name !== status) continue

            color = curStatus.color
            break
        }
    }

    let m = { x: 0, y: 0 };

    const handleChangeStatus = (event) => {
        m.x = event.clientX;
		m.y = event.clientY;
        console.log(m)
        showContextMenu = true; 
    }

    const closeMenu = () => {
        console.log("ciao")
        showContextMenu = false; 
    }

    const handleKey = ({keyCode}) => {
        if (keyCode == 13 || keyCode == 27) closeMenu()
    }

    const setStatus = (name) => {
        showContextMenu = false;
        status = name
    }
</script>

<button class="container" on:click={handleChangeStatus} style="--status-color: {color}">
    {status}
    <div class="dot"/>
</button>
{#if (showContextMenu)}
    <div class="fullscreen" role="button" tabindex="0" on:keydown={handleKey} on:click={closeMenu}/>
    <div class="contextMenu" style:left="{m.x}px" style:top="{m.y}px" style:z-index="0" transition:fade={{duration: 100}} >
        {#each $statusList as elem (elem.name)}
            <button class="container" on:click={() => setStatus(elem.name)} style="--status-color: {elem.color}">
                {elem.name}
                <div class="dot"/>
            </button>
        {/each}
    </div>
{/if}

<style>
    .contextMenu {
        width: 160px;
        background-color: rgb(38, 47, 47);
        padding: 20px;
        border-radius: 5px;
        position: absolute;
    }

    .fullscreen {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .container {
        border:none;
        font-size: 1em;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: rgba(0,0,0,0);
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
        transition: ease .3s;
    }

    button.container::before {
        display: flex;
        content: "";
        height: 30px;
        position: absolute;
        border-radius: 5px;
        width: 160px;
        background-color: var(--status-color);
        opacity: 0.2;
        z-index: -1; 
    }

    .container:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }

    .container:active {
        transition: ease .075s;
        transform: scale(0.95);
    }

    .dot {
        height: 10px;
        width: 10px;
        background-color: var(--status-color);
        border-radius: 100%;
    }
</style>