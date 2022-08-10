import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export interface OnboardingStep {
  idx: number
  title: string
  completed: boolean
}

export default class OnboardingController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!

    await user.load((loader) => {
      loader.load('addresses').load('socialAccounts').load('badges').load('tags')
    })

    const steps: OnboardingStep[] = [
      {
        idx: 1,
        title: 'Pick username',
        completed: user.username !== null,
      },
      {
        idx: 2,
        title: 'Pick Web3 Journey',
        completed: user.badges.length > 0,
      },
      {
        idx: 3,
        title: 'Pick Web3 Experience',
        completed: user.tags.length > 0,
      },
      {
        idx: 4,
        title: 'Update Bio',
        completed: user.bio !== null,
      },
      {
        idx: 5,
        title: 'Follow Recommendations',
        completed: true,
      },
    ]

    return { steps, completedOnboarding: steps.every((step) => step.completed === true) }
  }
}
