// Multichain Explorer
import { ChainId } from '../constants'

const builders = {
    fantom: (chainName: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => {
        const prefix = 'https://ftmscan.com'
        switch (type) {
            case 'transaction':
                return `${prefix}/tx/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },
}

interface ChainObject {
    [chainId: number]: {
        chainName: string
        builder: (chainName: string, data: string, type: 'transaction' | 'token' | 'address' | 'block') => string
    }
}

const chains: ChainObject = {
    [ChainId.MAINNET]: {
        chainName: '',
        builder: builders.fantom,
    },
}

export function getExplorerLink(
    chainId: ChainId,
    data: string,
    type: 'transaction' | 'token' | 'address' | 'block'
): string {
    const chain = chains[chainId]
    return chain.builder(chain.chainName, data, type)
}
