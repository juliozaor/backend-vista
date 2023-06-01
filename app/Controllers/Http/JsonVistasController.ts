 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Database from '@ioc:Adonis/Lucid/Database'
import path from 'path';
import fs from 'fs';

export default class JsonVistasController {
  public async index(ctx: HttpContextContract) {
    
  //  const vista = await Database.rawQuery('select * from vigia.VW_INFORMACION_VIGILADO');
   // const vista = new Vista();
    
  //  return await Vista.obtenerVista()
  const filePath = path.join(__dirname, '../../', 'Servicios', 'vista.json');
  console.log(filePath);
  
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(jsonData);

      return ctx.response.json(data);
  } 
}
