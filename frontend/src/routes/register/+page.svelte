<script>
	import PocketBase from 'pocketbase';

	let email = '';
	let password = '';
	let passwordConfirm = '';
	let error = '';
	let registered = false;

	export let pb = new PocketBase(process.env.BASE_URL);

	async function handleSubmit() {
		try {
			await pb
				.collection('users')
				.create({ email: email, password: password, passwordConfirm: passwordConfirm });
			await pb.collection('users').requestVerification(email);
			registered = true;
		} catch (e) {
			error = 'There was an error registering your account';
			throw e;
		}
	}
</script>

<main>
	<h1>Register</h1>
	{#if registered}
		<p>Please verify your email address, and then login <a href="/login">here</a></p>
	{:else}
		<form on:submit|preventDefault={handleSubmit}>
			<label for="email">Email:</label>
			<input type="email" id="email" bind:value={email} required />

			<label for="password">Password:</label>
			<input type="password" id="password" bind:value={password} required />

			<label for="passwordConfirm">Confirm Password:</label>
			<input type="password" id="passwordConfirm" bind:value={passwordConfirm} required />

			<button type="submit">Register</button>
		</form>
	{/if}
	{#if error}
		<div class="error" role="alert">{error}</div>
	{/if}
</main>

<style>
	.error {
		color: red;
	}
</style>
