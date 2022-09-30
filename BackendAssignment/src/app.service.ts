import { Injectable, Res } from '@nestjs/common';
import { usersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AppService {
    constructor(private userservice: usersService) { }
    async Login(req, response) {
        if (!req.user) {
            return 'No user from google'
        }
        let foundUser = await this.userservice.finduser(req.user.email);
        
        //signup using Google Account
        if (!foundUser) {
            const name = req.user.firstName +' '+ req.user.lastName;
            const dto = {
                name: name,
                email: req.user.email,
                //optinaly setting password
                password: req.user.firstName + "@123",
                mobile: ''
            };
            const saltOrRounds = 12;
            const hash = await bcrypt.hash(dto.password, saltOrRounds);
            dto.password = hash;
            const user = await this.userservice.create(dto);
            const token = this.userservice.signToken(user.id, user.email);
            response.cookie('jwt', (await token).access_token, { httpOnly: true });
   
           return response.redirect('http://localhost:4000/?jwt='+(await token).access_token);
            
        }
        if (foundUser) {
            const user = foundUser;
            const token = await this.userservice.signToken(user.id, user.email);
            response.cookie('jwt', (await token).access_token, { httpOnly: true });
            return response.redirect('http://localhost:4000/?jwt='+(await token).access_token);
   

        }

    }
}