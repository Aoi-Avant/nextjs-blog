import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/layout'

const YourComponent = () => (
  <Image src='/images/profile.jpeg' height={144} width={144} alt='Your Name' />
)

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <YourComponent></YourComponent>
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}
