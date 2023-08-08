import { SessionStorage } from "@/helpers/browser-storage";
import constants from "@/providers/constants";
import { StateTree } from "pinia";

export default {
  avatar: (state: StateTree) => state?.user?.photoURL,

  isLogged() { return this.getUser !== null && this.getUser !== undefined },

  getUser: (state: StateTree) => {
    if (!state.user && SessionStorage.get(constants.storage.session.USER))
      state.user = SessionStorage.get(constants.storage.session.USER)

    return state?.user
  },
}
