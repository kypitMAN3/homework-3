import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Token) private tokenRepository: typeof Token,
                                    private jwtService: JwtService) {}

    generateTokens(user: User) {
        const payload = {email: user.email, id: user.id}                         

        const accessToken = this.jwtService.sign(payload, {secret: process.env.JWT_ACCESS_SECRET, expiresIn: '1h'})
        const refreshToken =  this.jwtService.sign(payload, {secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenRepository.findOne()

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        
        const token = await this.tokenRepository.create({userId, refreshToken})
        return token;
    }
}
