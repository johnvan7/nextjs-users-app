import React from 'react'
import LoginPage from '../../login/page';
import Modal from '../../../_components/modal/page';

type Props = {}

function page({}: Props) {
  return (
    <Modal>
        <LoginPage />
    </Modal>
  )
}

export default page;