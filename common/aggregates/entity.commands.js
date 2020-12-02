import {ENTITY_CREATED, ENTITY_DESTROYED} from "../events"

export default {
  create: (state, { payload }) => {
    if (state.isExist) {
      throw Error('entity already exists')
    }
    return {
      type: ENTITY_CREATED,
      payload: {
        ...payload
      }
    }
  },
  destroy: (state, command) => {
    if (!state.isExist) {
      throw Error('entity not exists')
    }
    return {
      type: ENTITY_DESTROYED,
      payload: {}
    }
  }
}
