import React from 'react'
import s from './SetProjectNameModal.module.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useModalStore, useProjectStore, useStoreGlobal } from '@/stores/blocks';
import { MOCK_ADDRESS } from '@/constant/mock-data';
import { useAppSelector } from '@/stores/hooks';
import { accountSelector } from '@/stores/states/wallet/selector';

export const SET_PROJECT_NAME_MODAL_ID = 'SET_PROJECT_NAME_MODAL_ID'
interface MyFormValues {
  modelName: string;
}

type Props = {
  type: 'save' | 'save-as'
}

const SetProjectNameModal = ({ type }: Props) => {
  const { blockCurrent } = useStoreGlobal()
  const { projectId, saveProject, projectName } = useProjectStore()
  const { closeModal } = useModalStore()
  const account = useAppSelector(accountSelector)



  const initialValues: MyFormValues = { modelName: '' };

  const handleSubmit = async (values: MyFormValues, actions: any) => {
    console.log({ values, actions });
    actions.setSubmitting(false);

    const payload: {
      jsonFile: any
      projectName?: string
      ownerAddress: string
    } = {
      projectName: values.modelName,
      jsonFile: blockCurrent,
      ownerAddress: MOCK_ADDRESS, //account?.address,
    }


    const res = await saveProject(payload)
    if (res === 'success') {
      closeModal(SET_PROJECT_NAME_MODAL_ID)
    }


  }

  return (
    <div className={s.wrapper}>
      <h4 className={s.title}>Save Model {type === 'save-as' && 'as'}</h4>
      <Formik
        initialValues={initialValues}
        validate={
          values => {
            const errors: Partial<MyFormValues> = {};
            if (!values.modelName) {
              errors.modelName = 'Please enter model name';
            }
            return errors;
          }

        }
        onSubmit={(values, actions) => {
          handleSubmit(values, actions)
        }}
      >
        {({ isSubmitting }) => (
          <Form className={`${s.form} formik-form`}>
            <Field id="modelName" name="modelName" placeholder="Enter model name" className={s.input} />
            <ErrorMessage name="modelName" component="div" className='text-red-500' />
            <div className='mb-6'></div>
            <button type="submit" disabled={isSubmitting} className={'btn_submit'}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SetProjectNameModal