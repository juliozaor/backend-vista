import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import path from 'path';
import fs from 'fs';
const oracledb = require('oracledb');

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




  public async  probarconexion() {
    console.log("Result is:", process.env.ORACLE_PASSWORD);
   // oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
   let clientOpts = {};


//const mypw =process.env.ORACLE_PASSWORD;
clientOpts = { libDir: '/var/pesv/instantclient_19_19' };
oracledb.initOracleClient(clientOpts);


    const connection = await oracledb.getConnection({
        user          : "USU_CONSULTA",
        password      : "USU_CONSULTA2023",  // contains the hr schema password
        connectString : "172.16.2.55:1521/VIGIAPRO.supertransporte.local"
      
    });


    //const result = await connection.execute(`SELECT city FROM locations`);
   
    

    await connection.close();   // Always close connections
    const vista = await Database.rawQuery('select * from vigia.VW_INFORMACION_VIGILADO');
      return vista
    
    //return "conecto";
}


}
