import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class HealthCarePoint extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public email: string

  @column()
  public whatsapp: string

  @column()
  public latitude: number

  @column()
  public longitude: number

  @manyToMany(() => Service, {
    pivotTable: 'health_care_point_services',
    localKey: 'id',
    pivotForeignKey: 'health_care_point_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'services_id'
  })
  public services: ManyToMany<typeof Service>
}
