<script>
	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';

	const pb = new PocketBase(process.env.BASE_URL);
	let todos = [];
	let task = '';
	let isEmailVerified = false;
	let error = '';

	let loggedInUserRecord = pb.authStore.model;

	onMount(async () => {
		if (loggedInUserRecord.verified) {
			isEmailVerified = true;
			const response = await pb
				.collection('todos')
				.getList(1, 50, { filter: `createdBy="${loggedInUserRecord.id}"` });
			todos = response.items;
		}
	});

	async function createTask() {
		if (!task) {
			error = 'Task is required';
			return;
		}
		error = '';
		await pb.collection('todos').create({ task: task, createdBy: loggedInUserRecord.id });
		const response = await pb
			.collection('todos')
			.getList(1, 50, { filter: `createdBy="${loggedInUserRecord.id}"` });
		todos = response.items;
		task = '';
	}

	async function deleteTask(id) {
		await pb.collection('todos').delete(id);
		const response = await pb
			.collection('todos')
			.getList(1, 50, { filter: `createdBy="${loggedInUserRecord.id}"` });
		todos = response.items;
	}
</script>

<main>
	{#if isEmailVerified}
		<div class="todo-list">
			<ol>
				{#each todos as todo (todo.id)}
					<div class="todo-item">
						<li data-testid={todo.task}>{todo.task}</li>
						<button data-testid="delete {todo.task}" on:click={() => deleteTask(todo.id)}>X</button>
					</div>
				{/each}
			</ol>
		</div>
		<form>
			<input id="task" bind:value={task} />
			<button id="create" on:click={createTask}>Create Task</button>
			{#if error}
				<div class="error" role="alert">{error}</div>
			{/if}
		</form>
		<a href="/logout">Logout</a>
	{:else}
		<div class="error" role="alert">Please verify your email address</div>
	{/if}
</main>

<style>
	.error {
		color: red;
	}

	.todo-item {
		display: flex;
		align-items: center;
	}

	.todo-item button {
		margin-left: 10px;
	}
</style>
