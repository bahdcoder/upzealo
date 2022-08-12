import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('resume_url').nullable()
      table.string('username').unique().nullable()
      table.string('avatar_url').nullable()
      table.string('solana_address').nullable().unique()
      table.timestamp('completed_onboarding_at').nullable()
      table.text('bio').nullable()

      table.timestamp('verified_at').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
