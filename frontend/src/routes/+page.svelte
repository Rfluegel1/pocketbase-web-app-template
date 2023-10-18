<script>
    import PocketBase from 'pocketbase';
    import {onMount} from 'svelte';

    const pb = new PocketBase(process.env.BASE_URL);
    let todos = [];

    onMount(async () => {
        const response = await pb.collection('todos').getList();
        todos = response.items;
    });
</script>

<main>
    <ol>
        {#each todos as todo (todo.id)}
            <li data-testid={todo.task}>{todo.task}</li>
        {/each}
    </ol>
</main>

<style>
    /* Your styles here */
</style>
