import { SessionStorage } from "@/helpers/browser-storage";
import constants from "@/providers/constants";
import Auth from "@/repositories/Auth/Auth";
import { UserCredential } from "firebase/auth";
import { useRouter } from "vue-router";

export async function login(provider: string) {
  this.loading = true
  try {
    await Auth.login(provider)
      .then((result: UserCredential) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = provider.credentialFromResult(result);
        this.token = credential.accessToken;

        // The signed-in user info.
        this.user = result.user;
        SessionStorage.set(constants.storage.session.USER, result.user)
        SessionStorage.set(constants.storage.session.AUTH_TOKEN, credential.accessToken)
        SessionStorage.set(constants.storage.session.AUTH_EXPIRATION, result._tokenResponse.oauthExpireIn)
      })

  } catch (error) {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;

    // The email of the user's account used.
    // const email = error.customData.email;

    // The AuthCredential type that was used.
    // const credential = provider.credentialFromError(error);
  }
  this.loading = false
}

export async function logout() {
  return Auth.logout()
    .then(() => {
      const router = useRouter();
      SessionStorage.remove(constants.storage.session.USER)
      SessionStorage.remove(constants.storage.session.AUTH_TOKEN)
      SessionStorage.remove(constants.storage.session.AUTH_EXPIRATION)
      router.push({ name: constants.routes.login.name })
    })
}

// export async function loadUserAvatar(context, user_id) {
//   try {
//     await Login.loadUserAvatar(user_id)
//       .then(response => {
//         const reader = new FileReader()
//         reader.readAsDataURL(response.data)
//         console.log('new FileReader', reader.result)

//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         console.log('window.URL.createObjectURL', url)
//         // const link = document.createElement('a');
//         // link.href = url;
//         // link.setAttribute('download', 'file.pdf'); //or any other extension
//         // document.body.appendChild(link);
//         // link.click();

//       })
//   } catch (e) {
//     // supress
//   }
// }
