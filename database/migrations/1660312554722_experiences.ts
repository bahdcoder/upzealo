import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'experiences'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('title')
      table
        .string('organisation_id')
        .nullable()
        .references('id')
        .inTable('organisations')
        .onDelete('CASCADE')

      table.string('user_id').nullable().references('id').inTable('users').onDelete('CASCADE')

      table.date('started_at')
      table.date('ended_at').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
