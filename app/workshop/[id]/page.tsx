import { Metadata, ResolvingMetadata } from 'next'
import ViewMap from '@/modules/viewMap'
import { getProjectDetail } from '@/services/api/generative'
import { API_URL } from '@/constant/constant'
import ShareTwitterBtn from '@/components/ShareTwitterBtn'
import ExportImageBtn from '@/modules/workshop/components/ExportImageBtn'

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
    <div className={'relative'} id='view-3d'>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto flex gap-5 items-center">
        <ExportImageBtn imageSrc={data?.data?.thumbnail} name={data?.data?.name} ownerAddress={data?.data?.owner_addr} />
        <ShareTwitterBtn data={data} />
      </div>
      <ViewMap brickData={JSON.parse(data.data.meta_data)} id={params.id} />
    </div >
  )
}

export default Page
