import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { BcryptService } from './bcrypt.service';
import { UserDocument, UserEntity } from '../../../package/schema/user.schema';
import { NotFoundService } from '../../../package/service/not-found.service';
import { UserDto } from '../../../package/dto/user.dto';
import { TokenDto } from '../../../package/dto/token.dto';
import { LoginDto } from '../../../package/dto/login.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly bcryptService: BcryptService,
    private readonly notFoundService: NotFoundService,
  ) {}

  register = async (userInput: UserDto): Promise<UserDocument> => {
    // encrypting password
    userInput.password = await this.bcryptService.hashPassword(
      userInput.password,
    );

    // saving and returning the saved user in mongo db
    try {
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

  validatePassword = async (
    givenPassword: string,
    hashPassword: string,
  ): Promise<void> => {
    const isPasswordMatched = await this.bcryptService.comparePassword(
      givenPassword,
      hashPassword,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('User password is not valid');
    }
  };

  generateToken = (isRemembered: number, user: UserDocument): TokenDto => {
    const privateKEY = fs.readFileSync(
      __dirname + '/../../../../env/jwtRS256.key',
    );

    // set only email from user in jwt access token payload
    const payload = {
      email: user.email,
    };

    const token = new TokenDto();

    // remember for 1h or 1d
    if (Number(isRemembered) === 1) {
      token.accessToken = jwt.sign({ ...payload }, privateKEY, {
        expiresIn: '1d',
        algorithm: 'RS256',
      });
      token.timeout = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    } else {
      token.accessToken = jwt.sign({ ...payload }, privateKEY, {
        expiresIn: '1h',
        algorithm: 'RS256',
      });
      // in utc
      token.timeout = new Date(new Date().getTime() + 60 * 60 * 1000);
    }

    this.logger.log('access token: ' + token.accessToken);

    return token;
  };
}
