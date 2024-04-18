import {create } from 'zustand';
import { getCryptos,fetchCurrentCryptoPrice } from './services/CryptoService';
import { CryptoPrice, Cryptocurrency, Pair } from './types';
import {devtools }from 'zustand/middleware';
type CryptoStore = {
 cryptocurrencies: Cryptocurrency[]

 result:CryptoPrice

fetchCryptos: () => Promise<void>
fetchData : (pair:Pair) => Promise<void>

}


export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
     cryptocurrencies:[],
     result:{}as CryptoPrice,
     fetchCryptos: async() =>{

         const cryptocurrencies =await  getCryptos();
         set(() =>({

          cryptocurrencies

         })
     
     )
    
    
     },
     fetchData: async(pair) =>{

      const result =  await fetchCurrentCryptoPrice(pair)
     set(() =>({
            result
        }))

        }
    })))