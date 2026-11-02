import HomePage from './[locale]/page'

export default function RootPage() {
  return <HomePage params={Promise.resolve({ locale: 'en' })} />
}
