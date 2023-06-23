import { auth } from "./config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
const FbSignIn = async () => {
    try {
        const facebookProvider = new FacebookAuthProvider();
        auth.languageCode = "es";
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        const credentials = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credentials.accessToken;

        console.log(user);
        console.log(accessToken);
    } catch (error) {
        console.log(error);
    }
}

export default FbSignIn;