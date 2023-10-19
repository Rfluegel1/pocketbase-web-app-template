<script>
    import PocketBase from 'pocketbase'
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';
    let passwordConfirm = '';
    let error = '';

    const pb = new PocketBase(process.env.BASE_URL);

    async function handleSubmit() {
        try {
            await pb.collection('users').create({email: email, password: password, passwordConfirm: passwordConfirm});
            await goto('/login')
        } catch (e) {
            error = 'There was an error registering your account'
            throw e
        }
    }
</script>

<style>
    .error {
        color: red;
    }
</style>

<main>
    <h1>Register</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required>

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required>

        <label for="passwordConfirm">Confirm Password:</label>
        <input type="password" id="passwordConfirm" bind:value={passwordConfirm} required>

        <button type="submit">Register</button>
    </form>
    {#if error}
        <div class="error" role="alert">{error}</div>
    {/if}
</main>
