# Notes

## Nest packages

- `@nestjs/common`: majority of code that's needed for nest
- `@nestjs/platform-express`: uses Express to handle HTTP requests
  - fastify is another option. Express is default
- `reflect-metadata`: helps make decorators work

## Nest breakdown

- Pipe: validates incoming data contained in request
- Guard: handles authentication
- Controller: route the request to a particular function. Handles incoming requests
- Service: runs business logic
- Repository: access a database
- Modules: groups together code
- Filters: handles errors that occur during request handling
- Interceptors: adds extra logic to incoming requests or outgoing responses
