import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'skills'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('section_id').nullable().references('id').inTable('sections').onDelete('CASCADE')
      table
        .string('certifier_id')
        .nullable()
        .references('id')
        .inTable('certifiers')
        .onDelete('CASCADE')

      table.string('certifier_course').nullable()

      table.integer('index')

      table.string('name')
      table.text('description').nullable()

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
