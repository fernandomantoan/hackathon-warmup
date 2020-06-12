import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCarePoint from 'App/Models/HealthCarePoint';
import * as math from 'mathjs';

interface LatLng {
  lat: number;
  lng: number;
}

export default class HealthCarePointsController {
  public async index({ request, response }: HttpContextContract) {
    const { lat, lng } = request.get()
    if (lat && lng) {
      const mult = 1.1
      // 10 kilometers radius
      const radius = 10000
      // Search for lats and lngs inside the radius
      const p1 = this.calculateDerivedPosition(lat, lng, mult * radius, 0)
      const p2 = this.calculateDerivedPosition(lat, lng, mult * radius, 90)
      const p3 = this.calculateDerivedPosition(lat, lng, mult * radius, 180)
      const p4 = this.calculateDerivedPosition(lat, lng, mult * radius, 270)

      const points = await HealthCarePoint.query().where('latitude', '>', p3.lat)
        .where('latitude', '<', p1.lat)
        .where('longitude', '<', p2.lng)
        .where('longitude', '>', p4.lng)
        .preload('services')

      return points
    }
    return response.unprocessableEntity({ 'message': 'lat and lng parameters are required' })
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

  public async show({ params, response }: HttpContextContract) {
    if (params.id) {
      const point = await HealthCarePoint.find(params.id)
      if (!point) {
        return response.notFound("not found")
      }
      await point?.preload('services')
      return point
    }
    return response.unprocessableEntity('no id passed')
  }

  private calculateDerivedPosition(latCenter: number, lngCenter: number, range: number, bearing: number): LatLng {
    const earthRadius = 6371000;
    const latA = this.degreesToRadians(latCenter)
    const lngA = this.degreesToRadians(lngCenter)
    const angularDistance = range / earthRadius
    const trueCourse = this.degreesToRadians(bearing)
    var lat = math.asin(
      math.sin(latA) * math.cos(angularDistance) + math.cos(latA) * math.sin(angularDistance) * math.cos(trueCourse)
    )
    const dlng = math.atan2(
      math.sin(trueCourse) * math.sin(angularDistance) * math.cos(latA),
      math.cos(angularDistance) - math.sin(latA) * math.sin(lat)
    )
    var lng = ((lngA + dlng + Math.PI) % (Math.PI * 2)) - Math.PI
    lat = this.radiansToDegrees(lat)
    lng = this.radiansToDegrees(lng)

    return { lat, lng }
  }

  private degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  private radiansToDegrees(radians: number) {
    return radians * (180 / Math.PI)
  }
}
