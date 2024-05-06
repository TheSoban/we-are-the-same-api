import { All, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @All()
  getWorking(): string {
    return 'API is working!';
  }
}
