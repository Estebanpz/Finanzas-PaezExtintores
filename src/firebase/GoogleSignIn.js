import { auth } from "./config";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
const GoogleSignIn = async(e) => {
    e.preventDefault();
    try {
        const googleProvider = new GoogleAuthProvider();
        auth.languageCode ="es";
       const result =  await signInWithPopup(auth, googleProvider);
       const credentials = GoogleAuthProvider.credentialFromResult(result);
       const token = credentials.accessToken;
       const user = result.user;
    
       console.log(token);
       console.log(user);
    } catch (error) {
        console.log(error);
    }
}
 
export default GoogleSignIn;