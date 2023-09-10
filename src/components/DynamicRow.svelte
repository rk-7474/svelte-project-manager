<script lang="ts">
    import { canEdit } from './stores.js'
    import { fade } from 'svelte/transition';

    export let type: string;
    export let value: string = "Nuova task";

    let fading = false;
    let editMode = false;
    let lastValue = "";

    const enableEdit = () => {
        if (!$canEdit) return

        lastValue = value;

        editMode = !($canEdit = false)
    }

    const disableEdit = async () => {
        fading = true
        editMode = !($canEdit = true)

        if (value == "") value = lastValue

        await sleep(150)
        fading = false
    }

    const handleKey = ({keyCode}: any) => {
        if (keyCode == 13 || keyCode == 27) disableEdit()
    }

    const init = (elem: any) => elem.focus() 

    const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds))

</script>


{#if (editMode)}
    <td> 
        <input  
            on:focusout={disableEdit} 
            on:keyup={handleKey} 
            bind:value={value} 
            class={type} 
            use:init 
            transition:fade={{duration: 150}}> 
    </td>
{:else if (!fading)}
    <td on:click={enableEdit} class={type}>{value}</td>
{/if}

<style>
    .title {
        font-weight: 700;
        width: 120px;
    }

    .desc {
        width: 200px;
        text-align: left;
    }

    td {
        cursor: pointer;
        padding: 15px;
        font-size: 1.2em; 
        text-align: left;
        border-right: 2px solid white;
    }

    input {
        font-size: 1em; 
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;  
        border: none;
        outline: none
    }

    input.desc {
        width: 196px;
    }

    input.title {
        width: 116px;
    }
</style>