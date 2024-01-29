'use client'

import mockData from './mockData.json'
import ViewMap from '@/modules/viewMap'

export default function FecthJson({ params }: { params: { id: string } }) {
  const data = JSON.parse(JSON.stringify(mockData))
  return <ViewMap brickData={data} id={params.id} />
}
