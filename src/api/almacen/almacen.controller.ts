import { Controller,UseGuards,Post,Get,Res,Req } from '@nestjs/common';


import { AuthGuard } from 'src/guards/auth/auth.guard';

import { AlmacenService } from './almacen.service';

@Controller('')
export class AlmacenController {
    constructor(
        private readonly almacenService: AlmacenService ,
        
    ){}


    @Post('createAlmacen')
    @UseGuards(AuthGuard)
    async createAlmacen(@Res()res, @Req() req){
        const data=req.body
        const almacen=await this.almacenService.createAlmacen(data)
        res.status(200).send(almacen)
    }

    @Get('getAlmacenes')
    @UseGuards(AuthGuard)
    async getAlmacenes(@Res()res ){
        const almacenes=await this.almacenService.getAlmacenes()
        res.status(200).send(almacenes)
    }
}
