import React from 'react'
import Modal from '../../../../_components/modal/page';
import UserPage from '../../../../_components/pages/UserPage';

type Props = {}

const Page = (props: Props) => {
  return (
    <Modal>
        <UserPage />
    </Modal>
  )
}

export default Page;