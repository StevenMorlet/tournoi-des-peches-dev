'use client'

import { SessionProvider } from 'next-auth/react'

type Props = {
   children: React.ReactNode
}

export function Contexts(props: Props) {
   return <SessionProvider>{props.children}</SessionProvider>
}
