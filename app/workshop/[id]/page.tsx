import { Metadata, ResolvingMetadata } from 'next'
import ViewMap from '@/modules/viewMap'
import { getProjectDetail } from '@/services/api/generative'
import { API_URL } from '@/constant/constant'
import ShareTwitterBtn from '@/components/ShareTwitterBtn'
import ExportImageBtn from '@/modules/workshop/components/ExportImageBtn'
import IcPublish from '@/icons/workshop/ic-publish.svg'
import BVMBanner from '@/components/BVMBanner'
import s from './style.module.scss'
import WorkshopViewPage from '@/modules/workshop/ViewPage'

// export const revalidate = 0

const fetchModelData = async (id: string) => {
  try {
    const res: any = await fetch(`${API_URL}/modular-workshop/detail?id=${id}`, { next: { revalidate: 0 } })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (e: any) {
    console.log(e)
    return null
  }
}

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const data = await fetchModelData(id)

  const thumbnail = data?.data?.thumbnail


  return {
    title: `Modular | ${data?.data?.name}`,
    openGraph: {
      images: [thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.data?.name,
      images: [thumbnail],
    }
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await fetchModelData(params.id)

  if (!data) {
    return null
  }


  return (
    <WorkshopViewPage data={data} />
  )
}

export default Page
