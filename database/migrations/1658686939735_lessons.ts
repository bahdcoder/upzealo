import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lessons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('section_id').unsigned().references('id').inTable('lessons').onDelete('CASCADE')

      table.string('title').notNullable()
      table.string('slug').notNullable().unique()

      table.string('type').notNullable()
      table.text('details').nullable()
      table.string('video_url').nullable()

      table.text('content').nullable()

      table.timestamp('published_at').nullable()

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
