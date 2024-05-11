import { Injectable, Logger } from '@nestjs/common';
import { FirebaseRepository } from '../firebase/firebase.repository';
import { PaginationDto } from './generic.validation';

@Injectable()
export class GenericService<DTO> {
  private readonly collection = this.firebaseRepository.db.collection(this.collectionName);
  private readonly logger = new Logger(`${GenericService.name} - ${this.collectionName}`);

  constructor(protected readonly firebaseRepository: FirebaseRepository, protected readonly collectionName: string) {}

  public async findAll({ page, itemsPerPage }: PaginationDto) {
    this.logger.log(`Seaching for items: { page: ${page}, itemsPerPage: ${itemsPerPage} }`);

    const itemSnapshot = this.collection
      .offset((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .get();

    const countSnapshot = this.collection.count().get();

    const [itemFields, countField] = await Promise.all([itemSnapshot, countSnapshot]);

    return {
      items: itemFields.docs.map(this.snapshotToData),
      count: countField.data().count,
    };
  }

  public async findById(id: string) {
    this.logger.log(`Searching for item: ${id}`);

    const snapshot = await this.collection.doc(id).get();

    return this.snapshotToData(snapshot);
  }

  public async create(data: DTO) {
    this.logger.log('Creating an item');

    const reference = await this.collection.add(data);

    const snapshot = await reference.get();

    return this.snapshotToData(snapshot);
  }

  public async update(id: string, data: Partial<DTO>) {
    this.logger.log(`Updating an item: ${id}`);

    await this.collection.doc(id).update(data);

    return { update: true };
  }

  public async delete(id: string) {
    this.logger.log(`Deleting an item: ${id}`);

    await this.collection.doc(id).delete();

    return { delete: true };
  }

  private snapshotToData<
    T extends FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData>
  >(snapshot: T) {
    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }
}
