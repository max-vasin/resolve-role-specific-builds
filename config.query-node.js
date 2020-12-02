export default {
  readModels: [
    {
      name: 'entities',
      projection: 'common/read-models/entities.projection.js',
      resolvers: 'common/read-models/entities.resolvers.js',
      connectorName: 'default',
    },
  ],
}
