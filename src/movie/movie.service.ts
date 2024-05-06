import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from '../firebase';
import { GenericService } from '../nest';
import { MovieDto } from './movie.validation';

@Injectable()
export class MovieService extends GenericService<MovieDto> {
  constructor(firebaseRepository: FirebaseRepository) {
    super(firebaseRepository, 'movies', MovieDto.prototype);
  }
}
