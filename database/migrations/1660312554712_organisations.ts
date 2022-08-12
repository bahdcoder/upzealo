import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'organisations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('name')
      table.string('user_id').nullable().references('id').inTable('users').onDelete('CASCADE')
      table
        .string('community_id')
        .nullable()
        .references('id')
        .inTable('communities')
        .onDelete('CASCADE')
      table.string('image_url').nullable()

      table.timestamp('verified_at').nullable()

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
