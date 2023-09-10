<script lang="ts">
    import { fade } from "svelte/transition";
    import Icons from '../assets/icons.svelte';
    import DynamicRow from './DynamicRow.svelte';
    import Status from './Status.svelte'
    import { format } from 'date-fns'

    // export let isMoved = false;
    export let data: TData;
    $: ({name, desc, status, addedAt} = data)

</script>

<tr class="task" transition:fade>
    <Icons icon="grip"/>
    <DynamicRow value={name} type="title"/>
    <DynamicRow value={desc} type="desc"/>
    <td class="status"><Status {status}/></td>
    <td class="timestamp">{format(new Date(addedAt), "hh:mm dd/MM")}</td>
</tr>

<style>
    .status {
        width: 160px;
        text-align: center;
        padding: 14px;
    }

    .timestamp {
        width: 110px;
        color: gray;
        border: none;
        text-align: center;
    }

    .task {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    td {
        font-size: 1.2em; 
        text-align: left;
    }

    tr > td {
        border-right: 2px solid white;
        padding: 15px;
    }
</style>