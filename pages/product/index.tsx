import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Product.module.css'

export const getStaticProps: GetStaticProps = async () => {

  const res = await fetch(`https://dummyjson.com/products`)
  const products = (await res.json()).products
  
  console.log('products', products)

  return {
    props: {
        products
    }
  }
}

const ProductPage: NextPage = ({ products }: any) => {


  console.log(styles);

  return (
    <div className={styles.container}>
        <h1>Products page</h1>
        <Link href="/">
            ⬅ Get back to home
        </Link>
        <div className={styles.productContainer}>
            {products.map(product => {

                const { id, thumbnail, title, price } = product

                return (
                    <Link href={`/product/${id}`} >
                        <a className={styles.card}>
                            <Image src={thumbnail} width={300} height={200} alt={`${title}`}/>
                            <div className={styles.details}>
                            <h2>{title}</h2>
                            <p>${price}</p>
                            </div>
                        </a>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default ProductPage