
import React from 'react'
import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import styles from '../styles/Joke.module.scss'


export const getStaticProps: GetStaticProps  = async (context) => {

  const { params } = context

  console.log(params)
  
  const req = await fetch('https://api.chucknorris.io/jokes/random')
  const res = await req.json()

  const joke = res.value

  return {
    props: {
      joke
    }
  }

}

const Joke: NextPage = ({ joke }: any) => {

  return (
    <>
    <Head>
      <title>Some random joke</title>
    </Head>

    <div className={styles.container}>
      <p className={styles.joke}>{joke}</p>
      <Link href="/">
          <a className="link">
            ⬅ Get back to home
          </a>  
        </Link>
    </div>
    </>
  )
}

export default Joke
