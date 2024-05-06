import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationDto } from '../nest/utils';
import { MovieService } from './movie.service';
import { MovieDto } from './movie.validation';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.movieService.findAll(pagination);
  }

  @Post()
  create(@Body() movie: MovieDto) {
    return this.movieService.create(movie);
  }
}
