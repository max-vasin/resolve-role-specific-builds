import {ENTITY_CREATED, ENTITY_DESTROYED} from "../events"

export default {
  Init: () => ({
      isExist: false
  }),
  [ENTITY_CREATED]: (state) => {
    return {
      ...state,
      isExist: true
    }
  },
  [ENTITY_DESTROYED]: (state) => {
    return {
      ...state,
      isExist: false
    }
  }

}
