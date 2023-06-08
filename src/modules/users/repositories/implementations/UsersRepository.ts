import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({id:user_id}, {relations: ['games']})
    return user || {} as User; 
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = 'select * from users order by first_name ';
    return await this.repository.query(query); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    first_name = first_name.toLocaleLowerCase();
    last_name = last_name.toLocaleLowerCase();
    const query = `select * from users where LOWER(first_name)='${first_name}' and LOWER(last_name)='${last_name}'`;
    return await this.repository.query(query);
  }
}
