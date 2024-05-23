import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DecodedAuthBlockingMfaInfo } from 'firebase-admin/lib/auth/token-verifier';
import { ZodPipe } from '../zod';
import { PreferenceService } from './preference.service';
import {
  PreferenceWithoutUserIdDto,
  RoomIdDto,
  preferenceWithoutUserIdSchema,
  roomIdSchema,
} from './preference.validation';

@Controller('preference')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @UseGuards(AuthGuard())
  @Get('report/:roomId')
  findById(@Param(new ZodPipe(roomIdSchema)) params: RoomIdDto) {
    return this.preferenceService.generateReport(params.roomId);
  }

  @UseGuards(AuthGuard())
  @Post()
  create(
    @Body(new ZodPipe(preferenceWithoutUserIdSchema)) preference: PreferenceWithoutUserIdDto,
    @Req() request: Request & { user: DecodedAuthBlockingMfaInfo }
  ) {
    const userId = request.user.uid;

    return this.preferenceService.create({
      ...preference,
      userId,
    });
  }
}
