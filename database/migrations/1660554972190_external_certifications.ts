import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'external_certifications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table
        .string('certifier_id')
        .nullable()
        .references('id')
        .inTable('certifiers')
        .onDelete('CASCADE')

      table.string('user_id').nullable().references('id').inTable('users').onDelete('CASCADE')

      table.string('certifier_course')

      table.unique(['certifier_course', 'certifier_id', 'user_id'], {
        indexName: 'unique_course_user',
      })

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
