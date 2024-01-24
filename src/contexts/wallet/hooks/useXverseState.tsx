import { BitcoinNetworkType, Capability, getCapabilities, GetCapabilitiesOptions } from 'sats-connect'
import React from 'react'

export type TypeCapabilityState = 'loading' | 'loaded' | 'missing' | 'cancelled'

export interface IXverseState {
  capabilityMessage: string | undefined
  network: string
  capabilities: Set<Capability>
}

const useXverseState = (): IXverseState => {
  const network = React.useMemo(() => BitcoinNetworkType?.Mainnet || 'Mainnet', [])

  const [capabilityState, setCapabilityState] = React.useState<TypeCapabilityState>('loading')
  const [capabilities, setCapabilities] = React.useState<Set<Capability>>()

  const capabilityMessage = React.useMemo(() => {
    return capabilityState === 'loading'
      ? 'Checking capabilities...'
      : capabilityState === 'cancelled'
        ? 'Capability check cancelled by wallet. Please refresh the page and try again.'
        : capabilityState === 'missing'
          ? 'Could not find an installed Sats Connect capable wallet. Please install a wallet and try again.'
          : !capabilities
            ? 'Something went wrong with getting capabilities'
            : undefined
  }, [capabilityState, capabilities])

  const runCapabilityCheck = async () => {
    let runs = 0
    const MAX_RUNS = 20
    setCapabilityState('loading')

    // the wallet's in-page script may not be loaded yet, so we'll try a few times
    while (runs < MAX_RUNS) {
      try {
        await getCapabilities({
          onFinish(response) {
            setCapabilities(new Set(response))
            setCapabilityState('loaded')
          },
          onCancel() {
            setCapabilityState('cancelled')
          },
          payload: {
            network: {
              type: network,
            },
          },
        } as GetCapabilitiesOptions)
      } catch (e) {
        runs++
        if (runs === MAX_RUNS) {
          setCapabilityState('missing')
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  React.useEffect(() => {
    runCapabilityCheck().then()
  }, [network])

  return {
    capabilityMessage,
    network,
    capabilities,
  }
}

export default useXverseState
