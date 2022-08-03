import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import PathFactory from 'Database/factories/Learning/PathFactory'
import CompletedLessonFactory from 'Database/factories/Learning/CompletedLessonFactory'
import AddressFactory from 'Database/factories/Profile/AddressFactory'

export default class extends BaseSeeder {
  public async run() {
    const path = await PathFactory.with('courses', 1, (course) =>
      course
        .apply('published')
        .with('sections', 5, (section) =>
          section.apply('published').with('lessons', 5, (lesson) => lesson.apply('published'))
        )
    ).create()

    const lessonIds = path.courses[0].sections[0].lessons.map((lesson) => lesson.id)

    const address = await AddressFactory.with('user').create()

    console.log(`Learning user PublicKey: ${address.publicKey}`)

    await CompletedLessonFactory.merge(
      lessonIds.map((lessonId) => ({
        lessonId,
        userId: address.user.id,
        courseId: path.courses[0].id,
      }))
    ).createMany(5)
  }
}
