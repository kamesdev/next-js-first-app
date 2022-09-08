import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          I Learn <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          This is my first next.js website ever{' '}
          <code className={styles.code}>Hello World</code>
        </p>

        <div className={styles.grid}>

          <Link href="/joke" >
            <a className={styles.card}>
              <h2>ISR {`(Incremental Static Regeneration)`} &rarr;</h2>
              <p>Go to this website to see random Chuck Noris joke and On-demand revalidate it using <code>{`/revalidate?secret=<revalidation_token> &route=<route>`}</code></p>
            </a>
          </Link>

          <Link href="/pokemon"> 
            <a className={styles.card}>
              <h2>{`(SSG)`} Pokemons page example &rarr;</h2>
              <p>The pokemon page itself and all of the subpages of the products are generated at <b>build time</b>. Go to <code>{`/pokemon/<id-of-pokemon>`}</code> to see a single pokemon</p>
            </a>
          </Link>

          <Link href="/product" >
            <a className={styles.card}>
              <h2>{`(SSR)`} Products page example &rarr;</h2>
              <p>The products page itself and all of the subpages of the products are generated at <b>every request</b>. Go to <code>{`/product/<id-of-product>`}</code> to see a single pokemon</p>
            </a>
          </Link>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
