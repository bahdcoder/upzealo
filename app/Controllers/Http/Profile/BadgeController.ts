import Badge from 'App/Models/Profile/Badge'

export default class BadgeController {
  public async index() {
    const badges = await Badge.query()
      .select(['id', 'title', 'description', 'icon', 'color'])
      .preload('tags', (tagsQuery) => tagsQuery.select(['id', 'title']))

    return badges
  }
}
