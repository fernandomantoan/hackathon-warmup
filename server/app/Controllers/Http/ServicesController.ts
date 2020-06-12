// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Service from "App/Models/Service";

export default class ServicesController {
  public async index() {
    const services = await Service.query().orderBy('name')
    return services
  }

  public async seed() {
    const serviceCreated = await Service.createMany([
      { name: 'Test', description: 'Test' },
      { name: 'Test 2', description: 'Test 2' },
    ])

    return serviceCreated
  }
}
