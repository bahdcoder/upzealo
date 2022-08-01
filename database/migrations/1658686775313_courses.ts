import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('title')
      table.string('slug').notNullable().unique()

      table.text('details').nullable()
      table.timestamp('published_at').nullable()

      table.string('cover_image').nullable()

      table.string('author_id').references('id').inTable('authors').onDelete('CASCADE')

      table.string('path_id').nullable().references('id').inTable('paths').onDelete('CASCADE')

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
