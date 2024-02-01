import * as RadixTooltip from '@radix-ui/react-tooltip'
import { PropsWithChildren, useState } from 'react'

type Props = {
  triggerEl: React.ReactNode
  className?: string
}

const Tooltip = ({ triggerEl, className, children }: PropsWithChildren<Props>) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={0}>
        <RadixTooltip.Trigger asChild>{triggerEl}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content sideOffset={18} className={`${className} z-1 relative`}>
            {children}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

export default Tooltip
