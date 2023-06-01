import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Autorization {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    const cabeceraAutenticacion = request.header('Authorization')
    if(!cabeceraAutenticacion){
     // throw new JwtInvalidoException('Falta el token de autenticación')
    }
    //ServicioAutenticacionJWT.verificarToken(cabeceraAutenticacion)
    await next()
  }
}
