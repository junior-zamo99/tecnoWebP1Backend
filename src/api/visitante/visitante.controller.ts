import { Controller, Get, Req, Res,Param } from '@nestjs/common';
import { VisitanteService } from './visitante.service';
import * as path from 'path';  
@Controller('')
export class VisitanteController {
        constructor(
            private readonly vistanteService: VisitanteService
        ){}

        @Get('getProductosTienda')
        async getProductosTienda(@Req() req, @Res() res ){
            const productos = await this.vistanteService.getProductosTienda();
            res.status(200).send(productos);
        }

        @Get('getProductoImagenes/:file')
        async getProductoImagenes(@Req() req, @Res() res, @Param('file') file){
            const file_ =path.join(__dirname, '../../../uploads/productos/',file)
            res.status(200).sendFile(file_);
        }

        @Get('getCategoriasTienda/:clasificacion')
        async getCategoriasTienda(@Req() req, @Res() res , @Param('clasificacion') clasificacion){
            const categorias = await this.vistanteService.getCategoriasTienda(clasificacion);
            res.status(200).send(categorias);
        }

        @Get('getProductoTienda/:slug')
        async getProductoTienda(@Req() req, @Res() res , @Param('slug') slug){
            const producto = await this.vistanteService.getProductoTienda(slug);
            res.status(200).send(producto);
        }
        
}
