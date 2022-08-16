import { SecondaryButton, PrimaryButton, ActionButton } from "../../components/button";
import Head from "next/head";
import { Modal } from "../../components/modal";
import Link from "next/link";
import Input from "../../components/input";
import ReactTextareaAutosize from "react-textarea-autosize";
import { PropsWithChildren, useState } from "react";
import { Select } from "../../components/select";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { Badge, Community } from "../../store/auth";
import { getApiInstance, useApiAxiosInstance } from "../../helpers/axios-client";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import classNames from "classnames";
import { withGetServerSideProps } from "../../helpers/session";
import { Tag } from "../../components/onboarding/pick-web3-experience";

export function JoinCommunity({ isOpen, setIsOpen, community }: PropsWithChildren<{
    isOpen?: boolean
    community: Community
    setIsOpen?: (open: boolean) => void
}>) {
    const { push } = useRouter()
    const instance = useApiAxiosInstance()
    const { isLoading: isJoining, mutate: joinCommunity } = useMutation(async () => {
        const response = await instance.post(`/communities/${community.id}/memberships`)

        push(`/communities/${community.id}`)
    }, {
        onSuccess() {
            toast.success(`You joined the community successfully.`)
        },
        onError() {
            toast.error(`You are not eligible to join this community.`)
        }
    })

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={`Join ${community?.name}`} positionClasses="fixed inset-x-0 overflow-y-auto top-0 lg:mt-24" size='medium'>
            <div className="w-full flex justify-center items-center mt-8 pb-6">
                <img
                    className="w-[2.25rem] h-[2.25rem] rounded-full mr-3"
                    src={community.logoImage}
                    alt="cets on crecks"
                />
                <img
                    className="w-[4.125rem] h-[4.125rem] rounded-full"
                    src={community.logoImage}
                    alt="dead god"
                />
                <img
                    className="w-[2.25rem] h-[2.25rem] rounded-full ml-3"
                    src={community.logoImage}
                    alt="okay bears"
                />
            </div>

            <h3 className="text-center font-grotesk font-semibold text-xl text-primary-500">
                {community.name}
            </h3>

            <div className="mt-3 text-center text-sm max-w-[24rem] mx-auto">
                {community.description}
            </div>

            <PrimaryButton isLoading={isJoining} className="px-12 w-full mt-12 mb-4" onClick={() => joinCommunity()}>
                Join community
            </PrimaryButton>
        </Modal>
    )
}

export function CreateCommunity({ isOpen, setIsOpen }: PropsWithChildren<{
    isOpen?: boolean
    setIsOpen?: (open: boolean) => void
}>) {
    const instance = useApiAxiosInstance()
    const { push } = useRouter()
    const [form, setForm] = useState<{ [key: string]: any }>({
        badgeId: '',
        description: '',
        whitelistedTokens: '',
        name: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: any }>({})

    const { isLoading: isLoadingBadges, data: badges = [] } = useQuery<Badge[]>(['badges'], async () => {
        const response = await instance.get(`/profiles/badges`)

        return response.data
    })

    const { isLoading: isCreatingCommunity, mutate: createCommunity } = useMutation(async () => {
        const response = await instance.post(`/communities`, {
            name: form.name,
            description: form.description,
            badgeId: form.badgeId || badges?.[0]?.id,
            tokensList: form.whitelistedTokens.split(',')
        })

        setIsOpen?.(false)

        push(`/communities/${response.data.id}`)
    }, {
        onError() {
            toast.error(`Failed to create community. Please try again.`)
        },
        onSuccess() {
            toast.success(`Community created successfully.`)
        }
    })

    function publish() {
        const errors: any = {}
        if (!form.name) {
            errors.name = 'Please provide a name.'
        }

        if (!form.description) {
            errors.description = 'Please provide a description.'
        }

        if (!form.whitelistedTokens) {
            errors.whitelistedTokens = 'Please provide a description.'
        }

        if (Object.keys(errors).length === 0) {
            createCommunity()
        } else {
            setErrors(errors)
        }
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} hideHeading positionClasses="fixed inset-x-0 overflow-y-auto top-0 lg:mt-6" size='large'>
            <div className="-mx-6 h-24 lg:h-36 bg-red-500 -mt-6 cursor-pointer" role={'button'} onClick={console.log}>

            </div>


            <img src="https://res.cloudinary.com/bahdcoder/image/upload/v1660309953/avatars/Cranks-1.png" className="w-32 h-32 -mt-16 mx-auto" alt="community logo" />
            <div className="py-6">
                <Input label='Community name' placeholder="Degen Traders" onChange={(event: any) => {
                    setForm({ ...form, name: event.target.value })
                    setErrors({
                        ...errors,
                        name: undefined
                    })
                }} error={errors?.name} />
                <div className="mt-6">
                    <label htmlFor="description" className="text-sm mb-2 inline-block">Description</label>
                    <ReactTextareaAutosize
                        id="description"
                        onChange={(event: any) => {
                            setForm({ ...form, description: event.target.value })
                            setErrors({
                                ...errors,
                                description: undefined
                            })
                        }}
                        className={classNames("rounded-lg text-sm p-4 border  bg-transparent min-h-[4rem] lg:min-h-[5rem] text-white focus:outline-none w-full text-md resize-none placeholder:text-dark-300 focus:ring-1", {
                            "focus:ring-primary-500 focus:border-primary-500 border-dark-400": !errors.description,
                            "focus:ring-red-500 focus:border-red-500 border-red-500": errors.description,
                        })}
                    />
                    {errors?.description ? <small className="text-xs text-red-500">{errors.description}</small> : <small className="text-xs text-dark-300">Provide the purpose of this community.</small>}
                </div>
                <div className="mt-6">
                    <label htmlFor="tokens" className="text-sm mb-2 inline-block">
                        Whitelisted tokens
                    </label>
                    <ReactTextareaAutosize
                        id="tokens"
                        onChange={(event: any) => {
                            setForm({ ...form, whitelistedTokens: event.target.value })
                            setErrors({ ...errors, whitelistedTokens: undefined })
                        }}
                        className={classNames("rounded-lg text-sm p-4 border  bg-transparent min-h-[4rem] lg:min-h-[5rem] text-white focus:outline-none w-full text-md resize-none placeholder:text-dark-300 focus:ring-1", {
                            "focus:ring-primary-500 focus:border-primary-500 border-dark-400": !errors.whitelistedTokens,
                            "focus:ring-red-500 focus:border-red-500 border-red-500": errors.whitelistedTokens,
                        })}
                    />
                    {errors?.whitelistedTokens ? <small className="text-xs text-red-500">{errors.whitelistedTokens}</small> :
                        <small className="text-xs text-dark-300">Provide a comma separated list of all whitelisted tokens. Anyone holding any of these tokens will gain access to your community.</small>}
                </div>

                <div className="mt-6">
                    <label htmlFor="description" className="text-sm mb-2 inline-block">
                        Web3 Journeys
                    </label>

                    {isLoadingBadges ? (
                        <Skeleton
                            count={1}
                            baseColor={'#000000'}
                            highlightColor={'#1F2024'}
                            duration={1}
                            height={48}
                            borderRadius={8}
                        />
                    ) : (
                        <Select className="py-3 lg:py-4" options={badges?.map(badge => ({ name: badge.title, id: badge.id }))} onChange={(option) => {
                            setForm({ ...form, badgeId: option?.id })
                        }} />
                    )}
                    <small className="text-xs text-dark-300">Which Web3 journey best matches this community ?</small>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <PrimaryButton className="px-8 text-sm" isLoading={isCreatingCommunity} onClick={() => publish()}>
                    Publish
                </PrimaryButton>
                <ActionButton className="px-12 py-4 text-sm" onClick={() => setIsOpen?.(false)}>
                    Cancel
                </ActionButton>
            </div>
        </Modal>
    )
}

export function SingleCommunity({ community }: PropsWithChildren<{
    community: Community
}>) {
    const [showJoinModal, setShowJoinModal] = useState(false)
    return (
        <div className="rounded-2xl bg-black border border-dark-400 ">
            <JoinCommunity community={community} isOpen={showJoinModal} setIsOpen={setShowJoinModal} />
            <div className="h-28 rounded-t-2xl" style={{ backgroundImage: `url(${community.coverImage})` }}>

            </div>
            <div className="flex justify-center -mt-16">
                <img src={community.logoImage} className="w-32 h-32" alt="community logo" />
            </div>
            <div className="flex flex-col items-center px-6 pb-8 rounded-b-lg">
                <h2 className="text-xl font-grotesk font-semibold mt-4 flex items-center">
                    {community.name}

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-3 text-primary-500 fill-current"
                        enableBackground="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="current"
                    >
                        <g>
                            <rect fill="none" height={24} width={24} />
                        </g>
                        <g>
                            <g>
                                <path d="M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z" />
                                <polygon points="10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87" />
                            </g>
                        </g>
                    </svg>
                </h2>

                <div className="mt-3 text-sm text-center">
                    {community.description}
                </div>

                <div className="mt-3">
                    <div className="flex flex-wrap">
                        {community.badges.map(badge => (
                            <Tag key={badge.id} className={badge.className} title={badge.title} icon={badge.icon} />
                        ))}
                    </div>
                </div>

                <div className="w-full mt-6">
                    <SecondaryButton className="w-full text-sm" onClick={() => setShowJoinModal(true)}>
                        Join community
                    </SecondaryButton>
                </div>
            </div>
        </div>
    )
}

export function CommunitySkeleton() {
    const defaultProps = {
        count: 1,
        duration: 1,
        highlightColor: '#717E84',
        baseColor: '#1F2024',
    }

    return (
        <>
            <div className="w-full bg-black/30 p-6 rounded-2xl mb-4 border border-dark-400">
                <div className="flex items-center justify-center">
                    <Skeleton {...defaultProps} circle count={1} height={72} width={72} />
                </div>

                <div className="mt-4">
                    <div className="flex flex-col items-center">
                        <Skeleton {...defaultProps} height={12} borderRadius={8} width={175} />
                        <div className="mt-4 flex flex-col items-center">
                            <Skeleton {...defaultProps} height={12} borderRadius={8} width={300} />
                            <Skeleton {...defaultProps} height={12} borderRadius={8} width={290} />
                            <Skeleton {...defaultProps} height={12} borderRadius={8} width={130} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Communities() {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const instance = useApiAxiosInstance()

    const { data: communities, isLoading: isFetchingCommunities } = useQuery<{ data: Community[] }>(['communities'], async function () {
        const response = await instance.get('/communities')
        return response.data
    })

    return (
        <>
            <Head>
                <title>Communities - Upzealo</title>
            </Head>

            <CreateCommunity isOpen={showCreateModal} setIsOpen={setShowCreateModal} />

            <div className="w-full bg-indigo-900/20 h-96 lg:h-64 pt-28 lg:pt-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-0">
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-4xl font-bold font-grotesk text-white">
                                Web3 Communities
                            </h1>
                            <p className="mt-3 text-md">Discover communities to help you grow your career in Web3</p>
                        </div>

                        <div className="mt-5 lg:mt-0">
                            <PrimaryButton className="px-10 py-4" onClick={() => setShowCreateModal(true)}>Create community</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-64">
                    {isFetchingCommunities ? [1, 2, 3, 4, 5, 6].map(x => (
                        <CommunitySkeleton />
                    )) : null}

                    {!isFetchingCommunities ? (
                        <>
                            {communities?.data.map(community => (
                                <SingleCommunity community={community} key={community.id} />
                            ))}
                        </>
                    ) : null}
                </div>
            </div>
        </>
    )
}
