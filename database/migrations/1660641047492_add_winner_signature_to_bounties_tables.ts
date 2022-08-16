import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bounties'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('winner_signature').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('winner_signature')
    })
  }
}
