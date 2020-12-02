import {ENTITY_CREATED, ENTITY_DESTROYED} from "../events"

export default {
  Init: async (store) => {
    await store.defineTable('Entities', {
      indexes: { id: 'string' },
      fields: [
        'data',
      ],
    })
  },
  [ENTITY_CREATED]: async (store, { aggregateId, payload }) => {
    await store.insert('Entities', {
      id: aggregateId,
      data: payload
    })
  },
  [ENTITY_DESTROYED]: async (store, { aggregateId }) => {
    await store.delete('Entities', { id: aggregateId })
  }
}
