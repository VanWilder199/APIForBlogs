import {IUser} from "../model/user";
import {getRepository, Repository} from "typeorm";
import {UserEntity} from "../data-access/entity/User.entity";
import {v4 as uuidv4} from "uuid";

export class UserService {
    private userEntityRepository: Repository<UserEntity>;

    async checkUnique(login: string): Promise<boolean> {
        this.userEntityRepository = getRepository(UserEntity);

        const user = await this.userEntityRepository.findOne({login});

        return !!user;
    }

    async getUserByLogin(login: string, password: string): Promise<IUser> {
        this.userEntityRepository = getRepository(UserEntity);

        return await this.userEntityRepository.findOne({login, password});

    }

    async create(user: IUser): Promise<any> {
        this.userEntityRepository = getRepository(UserEntity);

        const createUser: IUser = {
            id: uuidv4(),
            ...user,
            isDeleted: false,
        };

        return this.userEntityRepository.save(createUser);

    }
}
