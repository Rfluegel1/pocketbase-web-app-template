<script>
    import PocketBase from 'pocketbase'

    let email = '';
    let password = '';
    let loggedInUser = null;

    const pb = new PocketBase('http://localhost:8090');

    async function handleSubmit() {
        const authData = await pb.collection('users').authWithPassword(email, password);
        console.log(authData)
        loggedInUser = authData.record
    }
</script>

<style>
    /* Add your styles here */
</style>

<main>
    {#if loggedInUser}  <!-- Display the logged-in user's email if logged in -->
        <h1>Welcome, {loggedInUser.email}</h1>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required>

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required>

        <button type="submit">Login</button>
    </form>
</main>
