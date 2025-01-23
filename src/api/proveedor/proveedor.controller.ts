import { Controller,UseGuards,Post,Get,Res,Req } from '@nestjs/common';


import { AuthGuard } from 'src/guards/auth/auth.guard';
import { ProveedorService } from './proveedor.service';

@Controller('')
export class ProveedorController {
    constructor(
        private readonly proveedorService: ProveedorService,
        
    ){}


    @Post('createProveedor')
    @UseGuards(AuthGuard)
    async createProveedor(@Res()res, @Req() req){
        const data=req.body
        const proveedor=await this.proveedorService.createProveedor(data)
        res.status(200).send(proveedor)
    }

    @Get('getProveedores')
    @UseGuards(AuthGuard)
    async getProveedores(@Res()res){
        const proveedores=await this.proveedorService.getProveedores()
        res.status(200).send(proveedores)
    }
}
