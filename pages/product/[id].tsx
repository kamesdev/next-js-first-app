import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Product.module.css'

export const getStaticProps: GetStaticProps = async (context) => {

  const { params } = context
  const { id } = params

  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const product = await res.json()
  
  console.log('product', product)

  return {
    props: {
      product
    }
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {

  const res = await fetch(`https://dummyjson.com/products`)
  const products = (await res.json()).products

  const paths = products.map(product => ({ params: { id: product.id.toString() } }))

  console.log('paths', paths)


  return {
    paths,
    fallback: true
  }
}

const ProductPage: NextPage = ({ product }: any) => {

  const { title, thumbnail, price } = product

  console.log(styles);

  return (
    <div className={styles.singleProductContainer}>
    <div className={styles.card}>
      <Image src={thumbnail} width={300} height={200} alt={`${title}`} />
      <div className={styles.details}>
        <h2>{title}</h2>
        <p>${price}</p>
      </div>
    </div>
    <br />
    <Link href="/">
      <a>
        ⬅ Go back home
      </a>
    </Link>
    </div>
  )
}

export default ProductPage