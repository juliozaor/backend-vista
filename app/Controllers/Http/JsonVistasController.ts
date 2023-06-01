import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import path from 'path';
import fs from 'fs';

export default class JsonVistasController {
  public async index(ctx: HttpContextContract) {

    const { prueba, documento } = ctx.request.all()

    if (prueba && prueba === 'true') {
      const vista = await Database.rawQuery('select * from vigia.VW_INFORMACION_VIGILADO');
      return vista
    }

    const filePath = path.join(__dirname, '../../', 'Servicios', 'vista.json');

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    
    if(documento){
      /* const arr = data.map(elemento => Object.entries(elemento));
      console.log(arr); */
      
      const columna = data.items.find(campo => campo.numero_documento == documento)
      return ctx.response.json(columna);

    }



    return ctx.response.json(data);
  }
}
