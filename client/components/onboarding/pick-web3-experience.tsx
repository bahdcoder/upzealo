import Input from '../input'
import { PrimaryButton } from '../button'
import { PropsWithChildren, SVGProps, useContext, useMemo, useState } from 'react'
import { OnboardingCtx, OnboardingStep } from './onboarding-ctx'
import { AuthCtx, Badge, Tag } from '../../store/auth'
import classNames from 'classnames'
import { useApiAxiosInstance } from '../../helpers/axios-client'
import { useMutation } from '@tanstack/react-query'

export function RenderExperienceIcon({
  icon,
  svgProps,
}: PropsWithChildren<{ icon: string; svgProps: SVGProps<SVGSVGElement> }>) {
  if (icon === 'Handyman') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        {...svgProps}
      >
        <g>
          <rect fill="none" height={24} width={24} />
        </g>
        <g>
          <g>
            <g>
              <path d="M21.67,18.17l-5.3-5.3h-0.99l-2.54,2.54v0.99l5.3,5.3c0.39,0.39,1.02,0.39,1.41,0l2.12-2.12 C22.06,19.2,22.06,18.56,21.67,18.17z M18.84,19.59l-4.24-4.24l0.71-0.71l4.24,4.24L18.84,19.59z" />
            </g>
            <g>
              <path d="M17.34,10.19l1.41-1.41l2.12,2.12c1.17-1.17,1.17-3.07,0-4.24l-3.54-3.54l-1.41,1.41V1.71L15.22,1l-3.54,3.54l0.71,0.71 h2.83l-1.41,1.41l1.06,1.06l-2.89,2.89L7.85,6.48V5.06L4.83,2.04L2,4.87l3.03,3.03h1.41l4.13,4.13l-0.85,0.85H7.6l-5.3,5.3 c-0.39,0.39-0.39,1.02,0,1.41l2.12,2.12c0.39,0.39,1.02,0.39,1.41,0l5.3-5.3v-2.12l5.15-5.15L17.34,10.19z M9.36,15.34 l-4.24,4.24l-0.71-0.71l4.24-4.24l0,0L9.36,15.34L9.36,15.34z" />
            </g>
          </g>
        </g>
      </svg>
    )
  }

  if (icon === 'Movie') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 6.47L5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4z" />
      </svg>
    )
  }

  if (icon === 'MarkunreadMailbox') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
      </svg>
    )
  }

  if (icon === 'Palette') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        {...svgProps}
      >
        <g>
          <rect fill="none" height={24} width={24} />
        </g>
        <g>
          <g>
            <g>
              <g>
                <path d="M12,22C6.49,22,2,17.51,2,12S6.49,2,12,2s10,4.04,10,9c0,3.31-2.69,6-6,6h-1.77c-0.28,0-0.5,0.22-0.5,0.5 c0,0.12,0.05,0.23,0.13,0.33c0.41,0.47,0.64,1.06,0.64,1.67C14.5,20.88,13.38,22,12,22z M12,4c-4.41,0-8,3.59-8,8s3.59,8,8,8 c0.28,0,0.5-0.22,0.5-0.5c0-0.16-0.08-0.28-0.14-0.35c-0.41-0.46-0.63-1.05-0.63-1.65c0-1.38,1.12-2.5,2.5-2.5H16 c2.21,0,4-1.79,4-4C20,7.14,16.41,4,12,4z" />
                <circle cx="6.5" cy="11.5" r="1.5" />
                <circle cx="9.5" cy="7.5" r="1.5" />
                <circle cx="14.5" cy="7.5" r="1.5" />
                <circle cx="17.5" cy="11.5" r="1.5" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }

  if (icon === 'AccountBalance') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z" />
      </svg>
    )
  }

  if (icon === 'ShoppingBasket') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    )
  }

  if (icon === 'Devices') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z" />
      </svg>
    )
  }

  if (icon === 'Brush') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M7 16c.55 0 1 .45 1 1 0 1.1-.9 2-2 2-.17 0-.33-.02-.5-.05.31-.55.5-1.21.5-1.95 0-.55.45-1 1-1M18.67 3c-.26 0-.51.1-.71.29L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41l-1.34-1.34c-.2-.2-.45-.29-.7-.29zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z" />
      </svg>
    )
  }

  if (icon === 'Groups') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        {...svgProps}
      >
        <rect fill="none" height={24} width={24} />
        <g>
          <path d="M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1C4.76,14.04,4.39,14,4,14 c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2 c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85C21.93,14.21,20.99,14,20,14 c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M16.24,13.65c-1.17-0.52-2.61-0.9-4.24-0.9 c-1.63,0-3.07,0.39-4.24,0.9C6.68,14.13,6,15.21,6,16.39V18h12v-1.61C18,15.21,17.32,14.13,16.24,13.65z M8.07,16 c0.09-0.23,0.13-0.39,0.91-0.69c0.97-0.38,1.99-0.56,3.02-0.56s2.05,0.18,3.02,0.56c0.77,0.3,0.81,0.46,0.91,0.69H8.07z M12,8 c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,8,12,8 M12,6c-1.66,0-3,1.34-3,3c0,1.66,1.34,3,3,3s3-1.34,3-3 C15,7.34,13.66,6,12,6L12,6z" />
        </g>
      </svg>
    )
  }

  if (icon === 'SupervisorAccount') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z" />
      </svg>
    )
  }

  if (icon === 'Language') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...svgProps}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
      </svg>
    )
  }

  if (icon === 'MilitaryTech') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        {...svgProps}
      >
        <g>
          <rect fill="none" height={24} width={24} />
        </g>
        <g>
          <g>
            <path d="M17,10.43V2H7v8.43c0,0.35,0.18,0.68,0.49,0.86l4.18,2.51l-0.99,2.34l-3.41,0.29l2.59,2.24L9.07,22L12,20.23L14.93,22 l-0.78-3.33l2.59-2.24l-3.41-0.29l-0.99-2.34l4.18-2.51C16.82,11.11,17,10.79,17,10.43z M11,11.07l-2-1.2V4h2V11.07z M15,9.87 l-2,1.2V4h2V9.87z" />
          </g>
        </g>
      </svg>
    )
  }

  return null
}

export function PickWeb3Experience() {
  const { profile } = useContext(AuthCtx)
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const { step, setStep, selectedBadges, setOnboardingSteps } = useContext(OnboardingCtx)
  const instance = useApiAxiosInstance()

  const tags = useMemo(() => {
    let badges = selectedBadges.length > 0 ? selectedBadges : profile.badges

    badges = badges.map((badge) => ({
      ...badge,
      tags: badge.tags.map((tag) => ({ ...tag, icon: badge.icon, className: badge.className })),
    }))

    return badges.reduce((tags, badge) => [...tags, ...badge.tags], [] as Badge['tags'])
  }, [selectedBadges, profile.badges])

  const { mutate: updateTags, isLoading: isUpdatingTags } = useMutation(
    async () => {
      await instance.post(`/profiles/tags`, {
        tags: selectedTags.map((tag) => tag.id),
      })
    },
    {
      onSuccess() {
        setStep(OnboardingStep.USER_BIO)

        setOnboardingSteps((currentSteps) =>
          currentSteps.map((step) => {
            if (step.idx === OnboardingStep.PICK_WEB3_EXPERIENCE) {
              return { ...step, completed: true }
            }

            return step
          })
        )
      },
    }
  )

  function onSelect(tag: Tag, isSelected: boolean) {
    if (isSelected) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  function onNext() {
    updateTags()
  }

  return (
    <div className="flex flex-col mt-6 mb-6">
      <h2 className="font-bold text-lg text-center text-primary-500">Pick your Web3 Experience</h2>

      <p className="mt-4 text-center text-sm">
        What have you done so far in the Web3 Space? Select as many experiences as you like. These
        will help others discover and collaborate with you. Think of them as tags for your profile.
      </p>

      <div className="flex flex-wrap max-h-[24rem] overflow-y-auto mt-6">
        {tags.map((tag) => {
          const isSelected = selectedTags.some((selectedTag) => selectedTag.id === tag.id)

          return (
            <button
              key={tag.id}
              onClick={() => onSelect(tag, isSelected)}
              className={classNames(
                'rounded-md flex items-center border transition ease-linear px-3 py-1.5 text-xs ml-2 mb-2 font-semibold',
                `badge-${tag.className}-tag`,
                {
                  [`badge-${tag.className}-tag-selected`]: isSelected,
                }
              )}
            >
              <RenderExperienceIcon
                svgProps={{
                  height: 16,
                  width: 16,
                  fill: 'currentColor',
                  className: 'mr-2',
                }}
                icon={tag.icon}
              />
              {tag.title}
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        <PrimaryButton
          className="w-full"
          onClick={() => onNext()}
          isDisabled={selectedTags.length === 0}
          isLoading={isUpdatingTags}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  )
}
