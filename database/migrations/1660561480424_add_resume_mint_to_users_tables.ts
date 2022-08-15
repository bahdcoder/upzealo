import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('resume_mint').nullable()
      table.string('resume_pdf').nullable()
      table.string('resume_nft_url').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('resume_mint')
      table.dropColumn('resume_pdf')
      table.dropColumn('resume_nft_url')
    })
  }
}
