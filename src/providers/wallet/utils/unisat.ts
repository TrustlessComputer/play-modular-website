import { IAccount, RequestAccountResponse, WalletType } from "@/providers/wallet/types";

const getProvider = () => (window as any)?.unisat;

const checkInstalled = () => {
  const installed = !!getProvider();
  if (!installed) {
    window.open('https://unisat.io/download', '_blank');
  }
  return installed;
};

const getBasicInfo = async (): Promise<RequestAccountResponse> => {
  const unisat = getProvider();
  const [address] = await unisat.getAccounts();
  const publicKey = await unisat.getPublicKey();

  return {
    address,
    publicKey,
  };
};

const requestAccount = async (): Promise<IAccount> => {
  checkInstalled();
  const unisat = getProvider();
  if (!unisat) {
    throw new Error('Kindly set up your wallet.')
  }
  await unisat.requestAccounts();
  const { address, publicKey } = await getBasicInfo();

  return {
    address,
    publicKey,
    type: WalletType.Unisat
  }
}


const unisatHelper = {
  checkInstalled,
  getBasicInfo,
  requestAccount,
}

export default unisatHelper
