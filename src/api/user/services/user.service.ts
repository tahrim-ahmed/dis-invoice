import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import {BcryptService} from './bcrypt.service';
import {UserDocument, UserEntity} from '../../../package/schema/user.schema';
import {NotFoundService} from '../../../package/service/not-found.service';
import {UserDto} from '../../../package/dto/user.dto';
import {TokenDto} from '../../../package/dto/token.dto';
import {LoginDto} from '../../../package/dto/login.dto';
import {CreatedByAppendService} from '../../../package/service/created-by-append.service';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(UserEntity.name)
        private readonly userModel: Model<UserDocument>,
        private readonly bcryptService: BcryptService,
        private readonly notFoundService: NotFoundService,
        private readonly createdByAppendService: CreatedByAppendService,
    ) {}

    register = async (userInput: UserDto): Promise<UserDocument> => {
        // saving and returning the saved user in mongo db
        try {
            userInput.password = await this.bcryptService.hashPassword(userInput.password);
            userInput = this.createdByAppendService.createdBy<UserDto>(userInput);
            return await this.userModel.create(userInput);
        } catch (e) {
            return e;
        }
    };

    login = async (loginInput: LoginDto): Promise<TokenDto> => {
        const user = await this.validateUser(loginInput);
        try {
            return this.generateToken(loginInput.isRemembered, user);
        } catch (e) {
            return e;
        }
    };

    refresh = async (): Promise<number> => {
        return this.createdByAppendService.returnRequestToken();
    };

    async pagination(page: number, limit?: number): Promise<UserDocument[]> {
        const query = this.userModel.find().where({ isActive: true });
        if (page && limit) {
            query.skip((page - 1) * limit).limit(limit);
        }
        query.populate('createdBy', 'email').populate('permission').populate('group', 'name description');

        return await query.exec();
    }

    /*************** custom () **********/
    validateUser = async (loginInput: LoginDto): Promise<UserDocument> => {
        const users: UserDocument[] = await this.userModel
            .aggregate([
                {
                    $match: {
                        email: loginInput.email,
                    },
                },
            ])
            .exec();

        this.notFoundService.notFound(users, 'No such user found!!');

        await this.validatePassword(loginInput.password, users[0].password);

        return users[0];
    };

    validatePassword = async (givenPassword: string, hashPassword: string): Promise<void> => {
        const isPasswordMatched = await this.bcryptService.comparePassword(givenPassword, hashPassword);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('User password is not valid');
        }
    };

    generateToken = async (isRemembered: number, user: UserDocument): Promise<TokenDto> => {
        const privateKEY = fs.readFileSync('env/jwtRS256.key');

        const token = new TokenDto();

        token.accessToken = jwt.sign({ ...user }, privateKEY, {
            expiresIn: Number(isRemembered) === 1 ? '1d' : '1h',
            algorithm: 'RS256',
        });
        const timeOut = Number(isRemembered) === 1 ? 24 : 1;
        token.timeout = new Date(new Date().getTime() + timeOut * 60 * 60 * 1000);

        const findByEmail = await this.getUserByEmail(user._id);

        token.firstName = findByEmail.firstName;
        token.lastName = findByEmail.lastName;
        token.email = findByEmail.email;
        token.group = findByEmail.group;
        token.permission = findByEmail.permission;

        return token;
    };

    getUserByEmail = async (_id: string): Promise<UserDocument> => {
        return this.userModel
            .findById({ _id: _id })
            .populate('group', 'name')
            .populate('permission', 'name client group invoice product stock users');
    };
}
