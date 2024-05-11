import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IdDto, PaginationDto, idSchema, paginationSchema } from '../nest';
import { ZodPipe } from '../zod';
import { MovieService } from './movie.service';
import { MovieDto, movieSchema } from './movie.validation';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query(new ZodPipe(paginationSchema)) pagination: PaginationDto) {
    return this.movieService.findAll(pagination);
  }

  @Get(':id')
  findById(@Param(new ZodPipe(idSchema)) params: IdDto) {
    return this.movieService.findById(params.id);
  }

  @Post()
  create(@Body(new ZodPipe(movieSchema)) movie: MovieDto) {
    return this.movieService.create(movie);
  }

  @Patch(':id')
  update(@Param(new ZodPipe(idSchema)) params: IdDto, @Body(new ZodPipe(movieSchema)) movie: MovieDto) {
    return this.movieService.update(params.id, movie);
  }

  @Delete(':id')
  delete(@Param(new ZodPipe(idSchema)) params: IdDto) {
    return this.movieService.delete(params.id);
  }
}
