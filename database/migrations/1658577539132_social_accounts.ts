import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'social_accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('user_id').nullable().references('id').inTable('users').onDelete('CASCADE')

      table
        .string('community_id')
        .nullable()
        .references('id')
        .inTable('communities')
        .onDelete('CASCADE')

      table.string('network').notNullable()
      table.string('username').notNullable()
      table.string('access_token').notNullable()
      table.string('avatar_url').nullable()
      table.string('network_id').notNullable()
      table.json('meta').nullable()

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
