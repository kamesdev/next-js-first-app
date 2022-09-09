import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Product.module.css'

export const getServerSideProps: GetServerSideProps = async () => {

  const res = await fetch(`https://dummyjson.com/products`)
  const products = (await res.json()).products
  
  return {
    props: {
        products
    }
  }
}

const ProductPage: NextPage = ({ products }: any) => {

  return (
    <div className={styles.container}>
        <h1>Products</h1>
        <Link href="/">
          <a className="link">
            ⬅ Get back to home
          </a>  
        </Link>
        <div className={styles.productContainer}>
            {products.map((product: any) => {

                const { id, thumbnail, title, price } = product

                return (
                    <Link href={`/product/${id}`} key={id}>
                        <a className={styles.card}>
                            <div className={styles.productImage}>
                              <Image src={thumbnail} layout={'fill'} objectFit='contain' alt={title}/>
                            </div>
                            <div className={styles.details}>
                            <h2>{title}</h2>
                            <h3>${price}</h3>
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