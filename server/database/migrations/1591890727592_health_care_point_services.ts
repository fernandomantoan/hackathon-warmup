import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class HealthCarePointServices extends BaseSchema {
  protected tableName = 'health_care_point_services'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('health_care_point_id').references('id').inTable('health_care_points')
      table.integer('services_id').references('id').inTable('services')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
