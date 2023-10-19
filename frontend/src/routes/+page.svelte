<script>
    import PocketBase from 'pocketbase';
    import {onMount} from 'svelte';

    const pb = new PocketBase(process.env.BASE_URL);
    let todos = [];
    let task = ''
    let error = ''

    let loggedInUserRecord = pb.authStore.model;

    onMount(async () => {
        const response = await pb.collection('todos').getList(1, 50, {filter: `createdBy="${loggedInUserRecord.id}"`});
        todos = response.items;
    });

    async function createTask() {
        if (!task) {
            error = 'Task is required';
            return;
        }
        error = '';
        await pb.collection('todos').create({ task: task, createdBy: loggedInUserRecord.id });
        const response = await pb.collection('todos').getList(1, 50, {filter: `createdBy="${loggedInUserRecord.id}"`});
        todos = response.items;
        task = '';
    }
</script>

<main>
    <ol>
        {#each todos as todo (todo.id)}
            <li data-testid={todo.task}>{todo.task}</li>
        {/each}
    </ol>
    <input id="task" bind:value={task}>
    <button id="create" on:click={createTask}>Create Task</button>
    {#if error}
        <div class="error" role="alert">{error}</div>
    {/if}
</main>

<style>
    .error {
        color: red;
    }
</style>
