import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCarePoint from 'App/Models/HealthCarePoint';

export default class HealthCarePointsController {
  public async index() {

  }

  public async store({ request }: HttpContextContract) {
    const data = request.all()
    const { name, description, email, whatsapp, latitude, longitude, services } = data;
    const point = await HealthCarePoint.create({
      name,
      description,
      email,
      whatsapp,
      latitude,
      longitude
    })

    if (point) {
      point.related('services').attach(services);
    }

    return point
  }
}
