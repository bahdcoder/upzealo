import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Plyr, { APITypes } from 'plyr-react'
import { PropsWithChildren, useRef, useState } from 'react'
import { Modal } from '../../../components/modal'
import { ActionButton, PrimaryButton } from '../../../components/button'
import { getApiInstance, useApiAxiosInstance } from '../../../helpers/axios-client'
import { withGetServerSideProps } from '../../../helpers/session'
import { CompletedLesson, Course, Lesson as LessonInterface, Section } from '../../../store/auth'

const videoId = 'yWtFb9LJs3o'
const provider = 'youtube'

const PlyrComponent = () => {
  const ref = useRef<APITypes>(null)

  const plyrVideo =
    videoId && provider ? (
      <Plyr
        ref={ref}
        source={{
          type: 'video',
          sources: [
            {
              src: videoId,
              provider: provider,
            },
          ],
        }}
      />
    ) : null

  return <>{plyrVideo}</>
}

export function LessonTitle({
  lesson,
  nextLesson,
  hasCompletedLesson,
  course,
  isCurrentLesson,
  onCourseCompleted,
}: PropsWithChildren<{
  course: Course
  isCurrentLesson: boolean
  lesson: LessonInterface
  hasCompletedLesson: boolean
  nextLesson: LessonInterface | null
  onCourseCompleted: () => void
}>) {
  const instance = useApiAxiosInstance()
  const { push } = useRouter()
  const [completed, setCompleted] = useState(hasCompletedLesson)
  const { mutate: completeLesson } = useMutation(async () => {
    if (hasCompletedLesson) {
      return
    }

    const response = await instance.post(`/learning/courses/${course.id}/lessons/${lesson.id}`)

    if (response.data.completedCourse) {
      onCourseCompleted()
    }

    if (nextLesson) {
      push(`/learning/${course.slug}/${nextLesson.slug}`)
    }

    setCompleted(true)
  })

  return (
    <Link key={lesson.id} href={`/learning/${course.slug}/${lesson.slug}`}>
      <a className="px-4 py-4 border-b border-dark-400 flex justify-between focus:outline-none w-full relative">
        {isCurrentLesson ? (
          <div className="absolute w-[3px] h-full left-0 bg-primary-500 -mt-4"></div>
        ) : null}
        <h4 className="text-sm">{lesson.title}</h4>
        <button onClick={() => completeLesson()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={classNames('w-5 h-5 ', {
              'text-dark-300': !completed,
              'text-primary-500': completed,
            })}
            fill="currentColor"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
          </svg>
        </button>
      </a>
    </Link>
  )
}

export function Section({
  section,
  course,
  currentLesson,
  completedLessons,
  nextLesson,
  onCourseCompleted,
}: PropsWithChildren<{
  section: Section
  course: Course
  currentLesson: LessonInterface
  nextLesson: LessonInterface | null
  completedLessons: CompletedLesson[]
  onCourseCompleted: () => void
}>) {
  const [open, setOpen] = useState(true)

  return (
    <div className="w-full flex flex-col">
      <button
        className="px-4 py-4 border-b border-dark-400 flex justify-between focus:outline-none w-full"
        onClick={() => setOpen(!open)}
      >
        <h4 className="text-sm">{section.title}</h4>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classNames('transform w-4 h-4 transition ease-linear', {
            'rotate-[270deg]': open,
            'rotate-[90deg]': !open,
          })}
          enableBackground="new 0 0 24 24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
          </g>
          <g>
            <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
          </g>
        </svg>
      </button>

      {open
        ? section.lessons.map((lesson) => {
            const hasCompletedLesson =
              completedLessons.find((completeLesson) => completeLesson.lessonId === lesson.id) !==
              undefined

            return (
              <LessonTitle
                key={lesson.id}
                course={course}
                hasCompletedLesson={hasCompletedLesson}
                isCurrentLesson={currentLesson.id === lesson.id}
                nextLesson={nextLesson}
                lesson={lesson}
                onCourseCompleted={onCourseCompleted}
              />
            )
          })
        : null}
    </div>
  )
}

export default function Lesson({
  course,
  progress,
  lesson,
  nextLesson,
  previousLesson,
}: PropsWithChildren<{
  course: Course
  progress: CompletedLesson[]
  lesson: LessonInterface
  nextLesson: LessonInterface | null
  previousLesson: LessonInterface | null
}>) {
  const instance = useApiAxiosInstance()
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<CompletedLesson[]>(progress)

  const { isLoading: isGoingToNextLesson } = useMutation(async () => {
    const response = await instance.post(`/learning/courses/${course.id}/lessons/${lesson.id}`)

    setCompletedLessons([...completedLessons, response.data.completedLesson])
  })

  return (
    <div className="w-full h-screen pt-20">
      <Head>
        <title>
          {lesson.title} - ({course.title}) - Learning
        </title>
      </Head>
      <Modal
        hideHeading
        size="large"
        isOpen={courseCompleted}
        positionClasses="fixed inset-x-0 overflow-y-auto top-0 lg:mt-24"
      >
        <div className="flex flex-col">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-500 h-14 w-14"
              enableBackground="new 0 0 24 24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g>
                <rect fill="none" height={24} width={24} y={0} />
              </g>
              <g>
                <g>
                  <g>
                    <path d="M2,22l14-5L7,8L2,22z M12.35,16.18L5.3,18.7l2.52-7.05L12.35,16.18z" />
                    <path d="M14.53,12.53l5.59-5.59c0.49-0.49,1.28-0.49,1.77,0l0.59,0.59l1.06-1.06l-0.59-0.59c-1.07-1.07-2.82-1.07-3.89,0 l-5.59,5.59L14.53,12.53z" />
                    <path d="M10.06,6.88L9.47,7.47l1.06,1.06l0.59-0.59c1.07-1.07,1.07-2.82,0-3.89l-0.59-0.59L9.47,4.53l0.59,0.59 C10.54,5.6,10.54,6.4,10.06,6.88z" />
                    <path d="M17.06,11.88l-1.59,1.59l1.06,1.06l1.59-1.59c0.49-0.49,1.28-0.49,1.77,0l1.61,1.61l1.06-1.06l-1.61-1.61 C19.87,10.81,18.13,10.81,17.06,11.88z" />
                    <path d="M15.06,5.88l-3.59,3.59l1.06,1.06l3.59-3.59c1.07-1.07,1.07-2.82,0-3.89l-1.59-1.59l-1.06,1.06l1.59,1.59 C15.54,4.6,15.54,5.4,15.06,5.88z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>

          <div className="max-w-md mx-auto pb-8">
            <h2 className="font-bold text-lg text-center text-primary-500">Congratulations</h2>

            <p className="mt-4 text-center text-sm">
              You just completed all lessons and assignments in this course. Your Soulbound NFT
              Resume will be updated with all the skills you have mastered. Communities and DAOS
              will now be able to find your profile based on these skills.
            </p>

            <div className="w-full flex justify-center mt-12">
              <Link href="/learning">
                <PrimaryButton className="px-12">Explore Courses</PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      <div className="h-full flex flex-col-reverse lg:flex-row border-t border-dark-400">
        <div className="w-full lg:w-[20%] h-full text-white bg-black border-l border-b-2 border-r border-dark-400 overflow-y-auto relative">
          <div className="h-16 flex items-center px-4 border-b border-dark-400 absolute top-0 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
              <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z" />
            </svg>
            <h2 className="text-lg text-white font-grotesk">Contents</h2>
          </div>

          <div className="flex flex-col pt-16">
            {course.sections.map((section) => (
              <Section
                course={course}
                key={section.id}
                section={section}
                currentLesson={lesson}
                nextLesson={nextLesson}
                completedLessons={completedLessons}
                onCourseCompleted={() => setCourseCompleted(true)}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[80%] h-full text-white p-4 lg:p-12">
          <div className="flex items-center justify-between mb-6">
            {previousLesson ? (
              <Link href={`/learning/${course.slug}/${previousLesson.slug}`}>
                <ActionButton className="text-xs lg:text-base lg:py-4 lg:px-5 px-2 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames(
                      'transform w-4 h-4 transition ease-linear mr-4 rotate-180'
                    )}
                    enableBackground="new 0 0 24 24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <g>
                      <path d="M0,0h24v24H0V0z" fill="none" />
                    </g>
                    <g>
                      <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
                    </g>
                  </svg>
                  Previous Lesson
                </ActionButton>
              </Link>
            ) : (
              <span> </span>
            )}
            <h3 className="hidden lg:block lg:text-xl font-semibold font-grotesk">
              {lesson.title}
            </h3>
            {nextLesson ? (
              <Link href={`/learning/${course.slug}/${nextLesson.slug}`}>
                <ActionButton
                  className="text-xs lg:text-base lg:py-4 lg:px-5 px-2 py-2"
                  isLoading={isGoingToNextLesson}
                >
                  Next Lesson
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={classNames('transform w-4 h-4 transition ease-linear ml-4')}
                    enableBackground="new 0 0 24 24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <g>
                      <path d="M0,0h24v24H0V0z" fill="none" />
                    </g>
                    <g>
                      <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
                    </g>
                  </svg>
                </ActionButton>
              </Link>
            ) : (
              <span></span>
            )}
          </div>
          <h3 className="lg:hidden text-center mb-4 lg:text-xl font-semibold font-grotesk">
            {lesson.title}
          </h3>
          <PlyrComponent />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = withGetServerSideProps(async function ({ req, params }) {
  const accessToken = req.session.user?.accessToken

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        statusCode: 301,
      },
    }
  }

  const instance = getApiInstance(accessToken)

  try {
    const [courseResponse, progressResponse] = await Promise.all([
      instance.get(`/learning/courses/${params?.slug}`),
      instance.get(`/learning/courses/${params?.slug}/progress`),
    ])

    const course: Course = courseResponse.data.course

    const lessons = course.sections.reduce(
      (lessons, section) => [...lessons, ...section.lessons],
      [] as LessonInterface[]
    )

    const lessonIdx = lessons.findIndex((lesson) => lesson.slug === params?.lesson)

    const lesson = lessons[lessonIdx]

    if (!lesson) throw Error(`Lesson not found.`)

    const nextLesson = lessons[lessonIdx + 1] || null
    const previousLesson = lessons[lessonIdx - 1] || null

    return {
      props: {
        course,
        lesson,
        nextLesson,
        previousLesson,
        progress: progressResponse.data.completedLessons,
      },
    }
  } catch (error) {
    console.error({ error })
    return {
      notFound: true,
    }
  }
})
