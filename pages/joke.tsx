
import React from 'react'
import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps  = async () => {
  
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
    <p>Joke {joke}</p>
    <Link href="/">Back to home</Link>
    </>
  )
}

export default Joke
