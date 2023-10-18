import PocketBase from 'pocketbase';

export async function createDevelopmentTestUser() {
    try {
        const pb = new PocketBase('http://127.0.0.1:8090');
        let email = 'test.user@web-app-template.dev';
        let password = process.env.TEST_USER_PASSWORD;
        await pb.collection("users").create({
            email,
            password,
            passwordConfirm: password,
        });
    } catch (e) {
        if (e.response.data.email.message !== 'The email is invalid or already in use.') {
            throw e;
        }
    }
}