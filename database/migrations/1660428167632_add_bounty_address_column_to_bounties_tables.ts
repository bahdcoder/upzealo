import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bounties'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('bounty_address')
      table.string('signature')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('bounty_address')
      table.dropColumn('signature')
    })
  }
}
