import { Service } from "alliage-service-loader/decorators";
import { AbstractController } from "alliage-webserver/controller";
import { AbstractRequest } from "alliage-webserver/http/request";
import { AbstractResponse } from "alliage-webserver/http/response";
import { Get } from "alliage-webserver/controller/decorations";

@Service("main_controller")
export default class MainController extends AbstractController {
  @Get("/")
  main(request: AbstractRequest, response: AbstractResponse) {
    response.setBody(`
      <h1>Welcome on Alliage Web</h1>
      <p>Your ip is: ${request.getIP()}</p>
    `);
  }
}
