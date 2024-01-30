export interface ICreateProjectResponse {
  id: string
  name?: string
}

export interface IGetProjectDetailResponse {
  id: string
  uuid: string
  deletedAt: null | string
  createdAt: string
  updatedAt: null | string
  name: string
  ownerAddr: string
  metaData: string
  thumbnail?: string
}
