import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import styles from '../../styles/Pokemon.module.scss'

export const getStaticProps: GetStaticProps = async (context) => {

    const { params }: any = context
    const { id } = params

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()

    const {  base_experience, height, weight, name, sprites } = data

    const image = sprites.other.dream_world.front_default

    const pokemon = {
        name,
        image,
        base_experience,
        height,
        weight,
    }

    return {
        props: {
            pokemon
        }
    }
} 

export const getStaticPaths: GetStaticPaths = async (context) => {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    const data = (await res.json()).results

    const paths = data.map((_:any, index:any) => ({ params: {id: `${index+1}`} }))

    return {
        paths,
        fallback: false
    }

}


const PokemonPage: NextPage = ({ pokemon }: any) => {

  const {  base_experience, height, weight, name, image } = pokemon

  return (
    <div className={styles.wrapper}>
        <div className={styles.pokemon}>
            <Image src={image} width={200} height={200} alt={name} />
            <h2>{name}</h2>
            <ul className={styles.pokemonDetailsUl}>
                <li className={styles.pokemonDetailsLi}>
                    Base experience <b>{base_experience}</b>
                </li>
                <li className={styles.pokemonDetailsLi}>
                    Height: <b>{height}</b>
                </li>
                <li className={styles.pokemonDetailsLi}>
                    Weight: <b>{weight}</b>
                </li>
            </ul>
        </div>
        <br />
        <Link href="/pokemon">
            <a className={'link'}>
                ⬅ Back to Pokemons
            </a>
        </Link>
    </div>
  )
}

export default PokemonPage