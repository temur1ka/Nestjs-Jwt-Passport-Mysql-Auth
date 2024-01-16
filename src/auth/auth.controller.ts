import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guards';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req:Request){
        return req.user;
        
    }  
    
    
    @Get('status')
    @UseGuards(JwtGuard)
    status(@Req() req:Request){
        console.log('Inside AuthController status method');
        console.log(req.user)
        return req.user
        
    }

    @Post('create')
    createUser(@Body() createDto: AuthLoginDto) {
        return this.authService.createUser(createDto)

    }
}
