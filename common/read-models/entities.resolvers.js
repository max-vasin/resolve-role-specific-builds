export default {
  all: async (store) => {
    return await store.find('Entities', {}, null, { id: 1 })
  },
}
