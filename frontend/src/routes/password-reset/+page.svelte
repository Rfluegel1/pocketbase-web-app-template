<script>
	import PocketBase from 'pocketbase';

	const pb = new PocketBase(process.env.BASE_URL);

	let email = '';
	let message = '';

	async function handleSubmit() {
		// try {
		await pb.collection('users').requestPasswordReset(email);
		message = 'Password reset email sent';
		// if (response.ok) {
		//     message = 'Password reset email sent';
		// } else {
		//     message = 'Something went wrong';
		// }
		// } catch (error) {
		//     message = 'Failed to send reset email';
		// }
	}
</script>

<main>
	<h1>Password Reset</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="email">Email:</label>
		<input type="email" id="email" bind:value={email} required />
		<button type="submit">Submit</button>
	</form>
	{#if message}
		<div>{message}</div>
	{/if}
	<a href="/login">Login</a>
</main>
