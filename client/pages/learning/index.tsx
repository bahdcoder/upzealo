import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { getApiInstance, getInstance } from '../../helpers/axios-client'
import { withGetServerSideProps } from '../../helpers/session'
import { Badge } from '../../store/auth'

export default function Learning({ badges }: PropsWithChildren<{ badges: Badge[] }>) {
  return (
    <div className="w-full">
      <Head>
        <title>Learning - Upzealo</title>
        <meta name='description' content='Practical courses to build a Career in Web3' />
      </Head>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 mt-8 lg:mt-32 px-4 lg:px-0">
          <div className="pt-24">
            <h1 className="font-semibold font-grotesk text-4xl lg:text-6xl lg:leading-[4.5rem]">
              Practical courses to build a Career in Web3
            </h1>

            <p className="mt-4 text-xl max-w-lg">
              Expert curated courses to teach the best builders in Web3 and the Metaverse. Community
              managers, smart contract engineers, artists. Everyone has a place in Web3.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <img
              src="https://res.cloudinary.com/bahdcoder/image/upload/v1660440292/illustrations/10.png"
              alt=""
            />
          </div>
        </div>

        <div className="mt-16 px-6 lg:px-0">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col mt-16 lg:mt-24">
              <h2 className="text-4xl font-grotesk font-semibold">{badge.title}</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-6 lg:mt-12">
                {badge.courses.map((course) => {
                  const totalLessons = course.sections.reduce(
                    (total, section) => section.lessons.length + total,
                    0
                  )
                  return (
                    <Link
                      href={`/learning/${course.slug}/${course?.sections?.[0]?.lessons?.[0]?.slug}`}
                      key={course.id}
                    >
                      <a>
                        <div className="flex flex-col" key={course.id}>
                          <img src={course.coverImage} className="h-56" alt={course.title} />

                          <h3 className="mt-4 text-2xl font-bold">{course.title}</h3>

                          <div className="flex items-center justify-between">
                            <p className="mt-2 text-lg text-dark-300">
                              By: {course?.author?.user?.username}
                            </p>
                            <p className="mt-2 text-lg text-dark-300">{totalLessons} lessons</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full my-32"></div>
    </div>
  )
}

export const getServerSideProps = withGetServerSideProps(async function ({ req }) {
  const accessToken = req.session?.user?.accessToken
  const instance = getApiInstance(accessToken)

  const response = await instance.get(
    `/learning/courses/badges/${accessToken ? 'personalised' : ''}`
  )

  return {
    props: {
      badges: response.data.badges,
    },
  }
})
