import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './api/usuario/usuario.module';

import { ProductoModule } from './api/producto/producto.module';

import { LogModule } from './api/log/log.module';
import { RolModule } from './api/rol/rol.module';
import { FuncionalidadModule } from './api/funcionalidad/funcionalidad.module';
import { IngresoModule } from './api/ingreso/ingreso.module';
import { InventarioModule } from './api/inventario/inventario.module';
import { TenantModule } from './api/tenant/tenant.module';
import { TclienteModule } from './api/tcliente/tcliente.module';


import { EmailsModule } from './api/emails/emails.module';

import { VisitanteModule } from './api/visitante/visitante.module';

import { VentaModule } from './api/venta/venta.module';

import { ProveedorModule } from './api/proveedor/proveedor.module';

import { AlmacenModule } from './api/almacen/almacen.module';






@Module({
  
  imports: [
 
    MongooseModule.forRoot('mongodb://localhost:27017/tecnoWeb'),
    MongooseModule.forRoot('mongodb://localhost:27017/tecnoWeb', { connectionName: 'logsConnection' }),
    UsuarioModule,
    ProductoModule,
    LogModule,
    RolModule,
    FuncionalidadModule,
    IngresoModule,
    InventarioModule,
    TenantModule,
    TclienteModule,
    EmailsModule,
    VisitanteModule,
    VentaModule,
    ProveedorModule,
    AlmacenModule
   
  ],
  controllers: [AppController, ],
  providers: [AppService, 
  ],
})
export class AppModule {
  
}
