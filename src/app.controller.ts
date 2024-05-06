import { All, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @All()
  getWorking(): string {
    return 'API is working!';
  }

  @UseGuards(AuthGuard())
  @All('test')
  test(): string {
    return 'Auth test';
  }
}
