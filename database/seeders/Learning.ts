import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import PathFactory from 'Database/factories/Learning/PathFactory'

export default class extends BaseSeeder {
  public async run() {
    await PathFactory.with('courses', 4, (course) =>
      course
        .apply('published')
        .with('sections', 5, (section) =>
          section.with('lessons', 4, (lesson) => lesson.apply('published')).with('lessons', 3)
        )
    )
      .with('courses', 3)
      .create()
  }
}
