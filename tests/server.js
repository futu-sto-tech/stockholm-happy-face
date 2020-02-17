import { Model, Server } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  const server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { id: '1', name: 'Robin' });
      server.create('user', { id: '1', name: 'Robin' });
    },

    routes() {
      this.namespace = 'api';

      this.get('/users', schema => {
        return schema.users.all();
      });
    },
  });

  return server;
}
