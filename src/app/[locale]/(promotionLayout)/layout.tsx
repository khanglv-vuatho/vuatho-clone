import { PromotionsFooter, PromotionsHeader } from './promotion'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromotionsHeader />
      {children}
      <PromotionsFooter />
    </>
  )
}
