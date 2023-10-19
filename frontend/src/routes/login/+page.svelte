<script>
    import PocketBase from 'pocketbase'
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';
    let error = '';

    const pb = new PocketBase(process.env.BASE_URL);

    async function handleSubmit() {
        try {
            await pb.collection('users').authWithPassword(email, password);
            await goto('/')
        } catch (e) {
            error = 'Invalid email or password'
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
    <h1>Login</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required>

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required>

        <button type="submit">Login</button>
    </form>
    {#if error}
        <div class="error" role="alert">{error}</div>
    {/if}
</main>
