<script>
    let email = '';
    let password = '';

    function handleSubmit() {
        // Handle form submission
    }
</script>

<style>
    /* Add your styles here */
</style>

<main>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required>

        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required>

        <button type="submit">Login</button>
    </form>
</main>
