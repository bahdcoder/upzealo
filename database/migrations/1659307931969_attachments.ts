import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'attachments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('post_id').nullable().references('id').inTable('posts').onDelete('CASCADE')
      table.string('comment_id').nullable().references('id').inTable('posts').onDelete('CASCADE')
      table.string('user_id').nullable().references('id').inTable('users').onDelete('CASCADE')

      table.string('url').notNullable()
      table.string('mime_type')
      table.string('driver')
      table.timestamp('deleted_at').nullable()

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
