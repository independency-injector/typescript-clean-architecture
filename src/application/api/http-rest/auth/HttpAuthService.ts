import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../../../core/domain/user/port/persistence/UserRepositoryPort';
import { Nullable, Optional } from '../../../../core/common/type/CommonTypes';
import { HttpJwtPayload, HttpLoggedInUser, HttpUserPayload } from './type/HttpAuthTypes';
import { User } from '../../../../core/domain/user/entity/User';
import { JwtService } from '@nestjs/jwt';
import { UserDITokens } from '../../../../core/domain/user/di/UserDITokens';

@Injectable()
export class HttpAuthService {
  
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly userRepository: UserRepositoryPort,
    
    private readonly jwtService: JwtService
  ) {}
  
  public async validateUser(username: string, password: string): Promise<Nullable<HttpUserPayload>> {
    const user: Optional<User> = await this.userRepository.findUser({email: username});
    
    if (user) {
      const isPasswordValid: boolean = await user.comparePassword(password);
      if (isPasswordValid) {
        return {id: user.getId(), email: user.getEmail(), role: user.getRole()};
      }
    }
    
    return null;
  }
  
  public login(user: HttpUserPayload): HttpLoggedInUser {
    const payload: HttpJwtPayload = { id: user.id };
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }
  
  public async getUser(by: {id: string}): Promise<Optional<User>> {
    return this.userRepository.findUser(by);
  }
  
}
