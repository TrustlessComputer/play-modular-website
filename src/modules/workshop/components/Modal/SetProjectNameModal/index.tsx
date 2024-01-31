import React, { useEffect, useState } from 'react'
import s from './SetProjectNameModal.module.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks'
import { MOCK_ADDRESS } from '@/constant/mock-data'
import { useAppSelector } from '@/stores/hooks'
import { accountSelector } from '@/stores/states/wallet/selector'
import { convertBase64ToFile } from '@/utils/file'
import { uploadFile } from '@/services/api/generative'
import { useRouter } from 'next/navigation'
import { WORKSHOP_URL } from '@/constant/route-path'
import Spinner from '@/components/Spinner'
import { DELAY_SNAPSHOT } from '@/constant/constant'
import { captureCanvasImage } from '@/utils'

export const SET_PROJECT_NAME_MODAL_ID = 'SET_PROJECT_NAME_MODAL_ID'
interface MyFormValues {
  modelName: string
}

type Props = {
  type: 'save' | 'save-as' | 'save-exit' | 'save-view'
}

const SetProjectNameModal = ({ type }: Props) => {
  const { blockCurrent, deleteAlls } = useStoreGlobal()
  const { saveProject, createProject, projectId, setLoading } = useProjectStore()
  const { closeModal } = useModalStore()
  const account = useAppSelector(accountSelector)
  const router = useRouter()

  const [processing, setProcessing] = useState(false)

  const initialValues: MyFormValues = { modelName: '' }

  // const saveToPng = async () => {

  //   // }
  // }

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    setProcessing(true)
    setLoading(true)


    const image = captureCanvasImage({})
    const file = convertBase64ToFile(image)
    const resUrl = await uploadFile({ file })

    const payload: {
      jsonFile: any
      projectName?: string
      ownerAddress: string
      thumbnail: string
    } = {
      projectName: values.modelName,
      jsonFile: blockCurrent,
      // ownerAddress: MOCK_ADDRESS, //account?.address,
      ownerAddress: account?.address,
      // ownerAddress: 'bc1pafhpvjgj5x7era4cv55zdhpl57qvj0c60z084zsl7cwlmn3gq9tq3hqdmn',
      thumbnail: resUrl.url,
    }

    const res = await saveProject(payload)
    if (res === 'success') {
      if (type === 'save-exit') {
        createProject()
        deleteAlls()
      }

      if (type === 'save-view' && projectId) {
        return;
      }

      closeModal(SET_PROJECT_NAME_MODAL_ID)
    }

    if (!!res) {
      setProcessing(false)
      setLoading(false)
    }


  }

  useEffect(() => {
    if (type === 'save-view' && projectId) {
      router.push(`${WORKSHOP_URL}/${projectId}`)
    }
  }, [projectId, type])


  return (
    <div className={s.wrapper}>
      <h4 className={s.title}>Save Model {type === 'save-as' && 'as'}</h4>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: Partial<MyFormValues> = {}
          if (!values.modelName) {
            errors.modelName = 'Please enter model name'
          }
          return errors
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
      >
        {({ isSubmitting }) => (
          <Form className={`${s.form} formik-form`}>
            <Field id='modelName' name='modelName' placeholder='Enter model name' className={s.input} />
            <ErrorMessage name='modelName' component='div' className='text-red-500' />
            <div className='mb-6'></div>
            <button type='submit' disabled={processing} className={'btn_submit w-[150px]'}>
              {processing ? (
                'Saving...'
              ) : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SetProjectNameModal
