import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return "hello";
  }

  @Get("/bye")
  getBye() {
    return "bye";
  }
}
