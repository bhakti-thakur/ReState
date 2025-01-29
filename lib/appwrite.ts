
import {Account, Avatars, Client, OAuthProvider} from "react-native-appwrite";
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from "expo-web-browser";


export const config= {
    platform : 'com.bhaks.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}
export const client = new Client() 

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function logIn() {
    try {
        // Check if a session is already active
        const currentUser  = await account.get();
        if (currentUser .$id) {
            // Log out the current session before creating a new one
            await account.deleteSession('current');
        }

        const redirectUri = Linking.createURL( "/" );
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,redirectUri
        );
        if(!response) throw new Error('failed to login')
        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        if (browserResult.type != 'success') throw new Error('failed to login');

        const url = new URL(browserResult.url)
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if (!secret || !userId) throw new Error('failed to login')
        const session = await account.createSession(userId, secret)
        if (!session) throw new Error('failed to login');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logOut() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getUser() {
    try {
        const response = await account.get();
        if(response.$id){
            const userAvatar = avatar.getInitials(response.name);
            return{
                ...response,
                avatar: userAvatar.toString()
            }
        } 
    } catch (error) {
        console.error(error)
    }
}
