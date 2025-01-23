import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
@Injectable()
export class TenantService {

    constructor(
        @InjectModel('tenant' ) private tenantModel,
        @InjectModel('usuario' ) private usuarioModel,
        @InjectModel('rol' ) private rolModel,
        @InjectModel('funcionalidad' ) private funcionalidadModel
        


    ){}

    async createTenant(data) {
        try {
            const tenantE = await this.tenantModel.findOne({ nombreTienda: data.nombreTienda });
            console.log(tenantE);
            if (tenantE) {
                return { data: undefined, message: 'El nombre del tenant ya está en uso' };
            }
    
            const tenant = await this.tenantModel.create({
                nombreTienda: data.nombreTienda,
                tipo: data.tipo
            });
    
            const funcionalidades = [];
            let funcionalidad;
    
            if (data.tipo == 1) {
                funcionalidad = await this.funcionalidadModel.find({ tipo:1 });
            } else {
                funcionalidad = await this.funcionalidadModel.find({ tipo:1 });
                funcionalidad = [...funcionalidad, ...await this.funcionalidadModel.find({ tipo:2 })];
            }
    
            for (let i = 0; i < funcionalidad.length; i++) {
                funcionalidades.push(funcionalidad[i]._id);
            }
    
            let rolE = await this.rolModel.findOne({ nombre: 'administrador', tenant: tenant._id });
            if (!rolE) {
                rolE = await this.rolModel.create({
                    tenant: tenant._id,
                    nombre: 'administrador',
                    funcionalidades: funcionalidades
                });
            }
    
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password , salt);
    
            const tenantUser = await this.usuarioModel.create({
                tenant: tenant._id,
                email: data.email,
                nombres: data.nombres,
                apellidos: data.apellidos,
                estado: true,
                rol: rolE._id,
                password: hash,
                fullname: `${data.nombres} ${data.apellidos}`
            });
    
            console.log(tenant);
            console.log(tenantUser);
            console.log(rolE);
    
            return { data: tenant, tenantUser: tenantUser, rol: rolE };
        } catch (error) {
            console.log(error);
            return { data: undefined, message: 'No se pudo crear el tenant' };
        }
    }

    async getTenants(){
        try {
            const tenants= await this.tenantModel.find()
            return {data:tenants}
        } catch (error) {
            console.log(error)
            return{data:undefined, message:'no se pudo obtener los tenants'}  
        }
    }

    getTenantPorNombre(nombre){
        try {
            const tenant= this.tenantModel.findOne({nombreTienda:nombre})
            if(!tenant){
                return {data:undefined, message:'no se encontro el tenant'}
            }
            return {data:tenant}        
        } catch (error) {
            return{data:undefined, message:'no se pudo obtener el tenant'}
        }
    }



}

