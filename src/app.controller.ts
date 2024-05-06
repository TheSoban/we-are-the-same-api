import { All, Controller, UseGuards } from '@nestjs/common';

@Controller()
export class AppController {
  @All()
  getWorking(): string {
    return 'API is working!';
  }

  @All('test')
  @UseGuards()
  test(): string {
    return 'Auth test';
  }
}
