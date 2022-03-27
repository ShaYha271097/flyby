import { createStore, createHook } from 'react-sweet-state';
import { EN } from '../locales/en-US';

const Store = createStore({
  initialState: {
    transactionPending: false,
    datas: {
      live: undefined,
      upcoming: undefined,
      completed: undefined
    },
    auctionContract: '',
    language: EN,
    showPopupSuccessCreateAuction: false,
    transactionAddress: '',
    updatingDocs: false
  },
  actions: {
    updateTransactionPending: (value:boolean) => ({ setState }) => {
      setState({
          transactionPending: value 
      })
    },
    updateDatas: (datas) => ({setState}) => {
      setState({
        datas: datas
      })
    },
    updateAuctionContract: (contract) => ({setState}) => {
      setState({
        auctionContract: contract
      })
    },
    updateLanguage: (lang) => ({setState}) => {
      setState({
        language: lang
      })
    },
    updateShowPopupSuccessCreateAuction: (value: boolean) => ({ setState }) => {
      setState({
        showPopupSuccessCreateAuction: value
      })
    },
    updateTransactionAddress: (value: any) => ({ setState }) => {
      setState({
        transactionAddress: value
      })
    },
    uploadingButtonUpdateDocs: (value: any) => ({ setState }) => {
      setState({
        updatingDocs: value
      })
    }
  },
  name: 'auction state',
});


export const useAuctionState = createHook(Store);