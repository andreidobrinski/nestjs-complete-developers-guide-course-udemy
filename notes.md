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

## Nest CLI

- `nest generate module messages`: creates a new module with the name 'messages'
- `nest generate controller messages/messages --flat`: creates a new controller called 'messages' inside of the messages dir. `--flat` is to not create a new folder called 'controllers'

## Dependency Injection

- used widely in Nest. Classes should not create copies of it's own dependencies

```js
// bad - service creates a copy of repo
class MessagesService {
  messagesRepo: MessagesRepository;
  constructor() {
    this.messagesRepo = new MessagesRepository();
  }
}

// better - service receives its dependency. Downside is that we need to create this with specifically the MessagesRepository
class MessagesService {
  messagesRepo: MessagesRepository;
  constructor(repo: MessagesRepository) {
    this.messagesRepo = repo;
  }
}

// best - service receives dependency and doesn't require MessagesRepository specifically
interface Repository {
  findOne(id: string);
  findAll();
  create(content: string);
}
class MessagesRepository {
  messagesRepo: Repository;
  constructor(repo: Repository) {
    this.messagesRepo = repo;
  }
}
// this is good because we can replace MessagesRepository with a mock repo that doesn't write to the file system for faster testing
```

## SQLite

- add SQLite vscode extension for help with debugging

## NotFoundExceptions

Throwing a NotFoundException from the service has a limitation in that it will not be compatible with controller that don't user HTTP (eg WebSockets or GRPC). This course throws NotFoundExceptions from the service but it would be something to look out for if the service needs to support multiple protocols.

## Limitations with using @Exclude to remove properties

- if we exclude something using the decorator, we must exclude it at the entity level
- it's not possible to then show the excluded property to an admin user if needed
- alternative is to create multiple DTOs for different use cases and use a custom interceptor to decide which DTO to send.
- robust solution is the interceptor between the controller and the response, rather than excluding at the entity level

## Rainbow Table Attack

- malicious actor stores a table of hashed versions of common passwords
- if they get access to the app's db table, they compare the user's hashed passwords against their existing table
- if they find a match, they know what the user's password must be
- solution to this is to salt the hashed passwords

## Middlewares, Interceptors, Guards

Order:

1. Middleware
2. Guards
3. Interceptors (if available)
4. Request Handler
5. Interceptors (if available)
6. Response

Interceptors execute after any middlewares and any guards.
