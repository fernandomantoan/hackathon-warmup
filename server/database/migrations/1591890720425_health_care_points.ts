import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class HealthCarePoints extends BaseSchema {
  protected tableName = 'health_care_points'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
