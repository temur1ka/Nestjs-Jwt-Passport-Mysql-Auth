import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User';



@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>
        
        ){}

    async validateUser({username, password}: AuthLoginDto){
        const findUser = await this.userRepository.findOneBy({username})
        if(!findUser) return null;

        if(password === findUser.password) {
            const {password, ...user} = findUser;
            return this.jwtService.sign(user)

        }
    }
    createUser(createDto: AuthLoginDto){
        const newUser = this.userRepository.create(createDto);
        const savedUser = this.userRepository.save(newUser);
        
    }
    
}
