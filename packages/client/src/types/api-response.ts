export interface ApiSuccessResponse<TResponseData> {
  success: boolean
  message?: string
  data?: TResponseData
}
export interface ApiErrorResponse {
  success: boolean
  message?: string
}
