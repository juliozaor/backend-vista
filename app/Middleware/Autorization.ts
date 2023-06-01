import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TokenValidoException from 'App/Exceptions/TokenValidoException'
import Env from '@ioc:Adonis/Core/Env';

export default class Autorization {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    const header = request.header('Authorization')
    if(!header){
      throw new TokenValidoException('Falta el token de autenticación')
    }
    let token = header.split(' ')[1]
    if (token !== Env.get('TOKEN')){
      throw new TokenValidoException('Token inválido')
    }

    //ServicioAutenticacionJWT.verificarToken(cabeceraAutenticacion) 
    await next()
  }
}
