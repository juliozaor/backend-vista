import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import path from 'path';
import fs from 'fs';
const oracledb = require('oracledb');

export default class JsonVistasController {
  
  public async index1(ctx: HttpContextContract) {

    const { prueba, documento } = ctx.request.all()

    if (prueba && prueba === 'true') {
      const vista = await Database.rawQuery('select * from vigia.VW_INFORMACION_VIGILADO');
      return vista
    }
  

    const filePath = path.join(__dirname, '../../', 'Servicios', 'vista.json');

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    if (documento) {
      /* const arr = data.map(elemento => Object.entries(elemento));
      console.log(arr); */
      let columna: any;

      data.items.forEach(campo => {
        if (campo.numero_documento == documento) {
          columna = {
            tipoDoc: 'NIT',
            numeroDocumento: campo.numero_documento,
            razonSocial: campo.razon_social,
            telefono:'',
            correoElectronico: campo.correo_electronico,
            correoPrincipalNotificacion: campo.correo_principal_notificacion,
            correoOpcionalNotificacion: campo.correo_opcional_notificacion,
            vigilado: campo.vigilado,
            direccion: campo.direccion,
            idMunicipio: campo.id_municipio,
            nombreMunicipio: campo.nombre_municipio,
            idDepartamento: campo.id_departamento,
            nombreDepto: campo.nombre_depto,
            tipoDocRepLegal: campo.tipo_doc_rep_legal,
            numeroDocuRepresentante: campo.numero_docu_representante,
            nombreRepresentante: campo.nombre_representante,
            apellidoRepresentante: campo.apellido_representante,
            correoElectronicoRepres: campo.correo_electronico_repres
          }
        }
      });


      return ctx.response.json(columna);

    }



    return ctx.response.json(data);
  }




  public async  index(ctx: HttpContextContract) {
    console.log("Result is:", process.env.ORACLE_PASSWORD);
   // oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
   const { prueba, documento } = ctx.request.all()


//const mypw =process.env.ORACLE_PASSWORD;

oracledb.initOracleClient();

console.log("Result is2:", prueba);

    const connection = await oracledb.getConnection({
        user          : "USU_CONSULTA",
        password      : "USU_CONSULTA2023",  // contains the hr schema password
        connectString : "172.16.2.55:1521/VIGIAPRO.supertransporte.local",
        encoding : 'UTF-8'
      
    });

    console.log("Result is3:", process.env.ORACLE_PASSWORD);
    let consulta="select * from vigia.VW_INFORMACION_VIGILADO where NUMERO_DOCUMENTO='"+documento+"'";
    const vista = await connection.execute(consulta,
      [], // no binds
      {
          outFormat: oracledb.OBJECT
      });
   
    console.log("Result is4:", process.env.ORACLE_PASSWORD);

  // Always close connections
 
  await connection.close();   
    return vista.rows[0]
    
    //return "conecto";
}


}
