import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bounties'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('post_id').references('id').inTable('posts').onDelete('CASCADE')
      table.string('winner_id').nullable().references('id').inTable('users').onDelete('CASCADE')

      table
        .string('address_id')
        .nullable()
        .references('id')
        .inTable('addresses')
        .onDelete('CASCADE')
      table.bigInteger('amount').nullable()
      table.string('currency_mint').nullable()

      table.boolean('published').defaultTo(false)

      // table.string('bounty_winner_id')
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
