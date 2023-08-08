import { StateTree } from "pinia";

export default (): StateTree => ({
  loading: false,
  token: null,
  user: null,
})
