export default {
  aggregates: [
    {
      name: 'aggregate-name',
      commands: 'common/aggregates/entity.commands.js',
      projection: 'common/aggregates/entity.projection.js',
    },
  ],
  readModels: [
    {
      name: 'read-model-name',
      projection: 'common/read-models/entities.projection.js',
      resolvers: 'common/read-models/entities.resolvers.js',
      connectorName: 'default',
    },
  ],
  clientEntries: ['client/index.js'],
}
