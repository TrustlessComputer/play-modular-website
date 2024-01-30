import { Metadata, ResolvingMetadata } from 'next'
import ViewMap from '@/modules/viewMap'
import { getProjectDetail } from '@/services/api/generative'
import { API_URL } from '@/constant/constant'
import ShareTwitterBtn from '@/components/ShareTwitterBtn'

const fetchModelData = async (id: string) => {
  try {
    const res: any = await fetch(`${API_URL}/modular-workshop/detail?id=${id}`)

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

  const desc = data.data?.name || ''

  const thumbnail = data.data?.thumbnail

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `Modular | ${data?.name}`,
    description: desc,
    openGraph: {
      images: [thumbnail, ...previousImages],
    },
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const data = await fetchModelData(params.id)
  console.log("🚀 ~ Page ~ data:", data)

  if (!data) {
    return null
  }

  return (
    <div>
      <ShareTwitterBtn data={data} />
      <ViewMap brickData={JSON.parse(data.data.meta_data)} id={params.id} />
    </div>
  )
}

export default Page
