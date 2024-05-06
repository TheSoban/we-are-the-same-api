import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { PaginationDto } from '../nest';

@Injectable()
export class GenericService<DTO> {
  private readonly collection = this.firebaseRepository.db.collection(this.collectionName);

  constructor(
    protected readonly firebaseRepository: FirebaseRepository,
    protected readonly collectionName: string,
    protected readonly validationSchema: DTO
  ) {}

  public async findAll({ page, itemsPerPage }: PaginationDto) {
    const itemSnapshot = this.collection
      .offset((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .get();

    const countSnapshot = this.collection.count().get();

    const [itemFields, countField] = await Promise.all([itemSnapshot, countSnapshot]);

    return {
      items: itemFields.docs.map((doc) => doc.data()),
      count: countField.data().count,
    };
  }

  public create(movie: DTO) {
    this.collection.add(movie);
  }
}
