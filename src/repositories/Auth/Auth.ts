import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Firebase from "@/providers/firebase";

class Login  {
  login(provider: string) {
    let providerInstance: any;

    if (provider === `google`) providerInstance = new GoogleAuthProvider();

    return signInWithPopup(Firebase.auth, providerInstance);
  }

  logout() {
    return signOut(Firebase.auth);
  }

}

export default new Login()
