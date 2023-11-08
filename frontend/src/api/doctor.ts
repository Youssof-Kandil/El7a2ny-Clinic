import {
  GetApprovedDoctorResponse,
  GetApprovedDoctorsResponse,
  GetDoctorResponse,
  GetPendingDoctorsResponse,
  GetWalletMoneyResponse,
  UpdateDoctorRequest,
  UpdateDoctorResponse,
} from 'clinic-common/types/doctor.types'
import { api } from '.'

export async function updateDoctor(
  username: string,
  req: UpdateDoctorRequest
): Promise<UpdateDoctorResponse> {
  return await api
    .patch<UpdateDoctorResponse>(`/doctors/${username}`, req)
    .then((res) => res.data)
}

export async function getDoctor(username: string): Promise<GetDoctorResponse> {
  return await api
    .get<GetDoctorResponse>(`/doctors/${username}`)
    .then((res) => res.data)
}

export async function getPendingDoctors(): Promise<GetPendingDoctorsResponse> {
  return await api
    .get<GetPendingDoctorsResponse>(`/doctors/pending`)
    .then((res) => res.data)
}

// export async function getUsers

export async function getApprovedDoctors(): Promise<
  GetApprovedDoctorsResponse['doctors']
> {
  return await api
    .get<GetApprovedDoctorsResponse>(`/doctors/approved`)
    .then((res) => res.data.doctors)
}

export async function getApprovedDoctor(
  id: string
): Promise<GetApprovedDoctorResponse> {
  return await api
    .get<GetApprovedDoctorResponse>(`/doctors/approved/${id}`)
    .then((res) => res.data)
}

export async function acceptDoctorRequest(
  id: string
): Promise<UpdateDoctorResponse> {
  return await api
    .patch<UpdateDoctorResponse>(`/doctors/acceptDoctorRequest/${id}`)
    .then((res) => res.data)
}

export async function rejectDoctorRequest(
  id: string
): Promise<UpdateDoctorResponse> {
  return await api
    .patch<UpdateDoctorResponse>(`/doctors/rejectDoctorRequest/${id}`)
    .then((res) => res.data)
}

export async function getWalletMoney(
  username: string
): Promise<GetWalletMoneyResponse> {
  return await api
    .get<GetWalletMoneyResponse>('/doctors/wallet/' + username)
    .then((res) => {
      console.log(res.data + 'getWalletMoney' + username)

      return res.data
    })
}
