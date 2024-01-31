import { useModalStore } from '@/stores/blocks'
import ConnectWalletModal, { CONNECT_WALLET_MODAL_ID } from '@/modules/connect-wallet/ConnectWalletModal'

const useConnectWalletModal = () => {
  const { openModal, closeModal } = useModalStore()

  const openConnectWalletModal = () => {
    openModal({
      id: CONNECT_WALLET_MODAL_ID,
      component: <ConnectWalletModal />,
    })
  }

  const closeConnectWalletModal = () => {
    closeModal(CONNECT_WALLET_MODAL_ID)
  }

  return {
    openConnectWalletModal,
    closeConnectWalletModal,
  }
}

export default useConnectWalletModal
