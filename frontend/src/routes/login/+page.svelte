<script>
    import PocketBase from 'pocketbase'
    import {goto} from "$app/navigation";

    let email = '';
    let password = '';

    const pb = new PocketBase(process.env.BASE_URL);

    async function handleSubmit() {
        await pb.collection('users').authWithPassword(email, password);
        if (pb.authStore.isValid) {
            await goto('/')
        }
    }
</script>

<style>
    /* Add your styles here */
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
</main>
