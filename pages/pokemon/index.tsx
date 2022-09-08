import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from '../../styles/Pokemon.module.scss'

export const getStaticProps: GetStaticProps = async (context) => {

    const res = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = (await res.json()).results
    const pokemons = data.map((_: any, index: any) => ({ ..._, id: index + 1 }))

    return {
        props: {
            pokemons
        }
    }

}

const PokemonsPage: NextPage = ({ pokemons }: any) => {
  return (
    <div className={styles.wrapper}>

        <h1 className={styles.title}>Pokemons</h1>

        <Link href="/">
            <a className={'link'}>
                ⬅ Back to Home
            </a>
        </Link>

        <div className={styles.container}>

            {pokemons.map((pokemon: any) => {

                const { id, name } = pokemon

                return (
                    <>
                        <Link href={`/pokemon/${id}`} key={id}>
                            <div className={styles.pokemonCard}>
                                    <Image src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`} width={200} height={200} />
                                    <h2>{name}</h2>
                            </div>
                        </Link>
                    </>
                )

            })}
        </div>

        
    </div>
  )
}

export default PokemonsPage