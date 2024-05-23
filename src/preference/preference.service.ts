import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from '../firebase';
import { MovieService } from '../movie';
import { GenericService } from '../nest';
import { PreferenceDto, RoomIdDto, UserOpinion, preferenceSchema } from './preference.validation';

@Injectable()
export class PreferenceService extends GenericService<PreferenceDto> {
  constructor(private readonly movieService: MovieService, firebaseRepository: FirebaseRepository) {
    super(firebaseRepository, 'preferences');
  }

  async generateReport(roomId: RoomIdDto['roomId']) {
    const preferenceSnapshot = await this.collection.where('roomId', '==', roomId).get();
    const preferenceDocs = preferenceSnapshot.docs.map(this.snapshotToData);
    const validatedPreferenceDocs = preferenceDocs.map((doc) => preferenceSchema.parse(doc));

    const groups = Object.groupBy(validatedPreferenceDocs, ({ movieId }) => movieId);
    const movies = await this.movieService.findByIds(Object.keys(groups));

    return movies.toSorted((movie1, movie2) => {
      const likes1 = groups[movie1.id].filter(({ opinion }) => opinion === UserOpinion.Like).length;
      const likes2 = groups[movie2.id].filter(({ opinion }) => opinion === UserOpinion.Like).length;

      return likes2 - likes1;
    });
  }

  override async create(preference: PreferenceDto) {
    const countSnapshot = await this.collection
      .where('userId', '==', preference.userId)
      .where('roomId', '==', preference.roomId)
      .where('movieId', '==', preference.movieId)
      .get();

    await Promise.all(countSnapshot.docs.map((snapshot) => snapshot.ref.delete()));

    return super.create(preference);
  }
}
