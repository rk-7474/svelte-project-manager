<script lang="ts">
  import Task from './components/Task.svelte'
  import Icons from './assets/icons.svelte';
  import { currentId } from './components/stores'
  import Draggable from './components/Draggable.svelte';

  let tasks: Array<TData> = [{
    name: "prova",
    desc: "prova prova",
    status: "Non iniziato",
    addedAt: 0,
    id: 1
  },{
    name: "prova2",
    desc: "prova prova",
    status: "Non iniziato",
    addedAt: 0,
    id: 2
  },{
    name: "prova3",
    desc: "prova prova",
    status: "Non iniziato",
    addedAt: 0,
    id: 3
  }]

  const handleAddClick = () => {
    if (tasks.some(task => task.name === "Nuova task")) return

    tasks = [...tasks, {
      name: "Nuova task",
      desc: "prova prova",
      status: "Non iniziato",
      addedAt: Date.now(),
      id: (++$currentId)
    }]
    console.log(tasks)
  }
  
</script>

<main>
  <button on:click={handleAddClick} class="add">
    <Icons icon="add" size="50px"/>
  </button>
  <div class="container">
    {#each tasks as data (data.id)}
      <Task {data}/>
    {/each}
  </div>
</main>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: -3px 8px 21px -2px #000000;
    transition: width ease .3s;
  }

  .add {
    margin-bottom: 20px;
    width: 55px;
    height: 55px;
    border-radius: 15px;
    box-shadow: -3px 8px 21px -2px #000000;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #242424;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
</style>
