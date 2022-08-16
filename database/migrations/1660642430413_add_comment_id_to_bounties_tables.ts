import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bounties'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('comment_id').nullable().references('id').inTable('comments').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('comment_id')
    })
  }
}
