import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import "react-loading-skeleton/dist/skeleton.css";
import styles from '../../styles/Character.module.scss'


const Characters = () => {

    const [characters, setCharacters] = useState<any>([])
    const [loading, setLoading] = useState(true)

    const [loadingImages, setLoadingImages] = useState<any>([])

    const effectCalled = useRef(false)

    useEffect(() => {

        if (effectCalled.current) return

        setLoading(true)


        const fetchCharacters = async () => {
            console.log('%cFETCHING DATA', 'background: black; color: yellow; font-weight: bold;');
            const response = await fetch('https://breakingbadapi.com/api/characters?limit=12')
            const data = await response.json()

            const newLoadingImages = data.map((_:any, index:any) => ({ loading: true }))
            setLoadingImages(newLoadingImages)
            console.log(newLoadingImages)

            setCharacters(data)

            setLoading(false)
        }

        fetchCharacters()

        effectCalled.current = true

        return () => {}
    }, [])


    if (loading) {
        return (
            <SkeletonTheme baseColor="rgb(36, 36, 36)" highlightColor="rgb(59, 59, 59)">

                <div className={styles.wrapper}>

                  <h1>Characters</h1>

                    <Link href="/">
                        <a className={'link'}>
                            ⬅ Back to Home
                        </a>
                    </Link>

                    <div className={styles.container}>
                    {
                        Array(9).fill('').map((character: any, index: any) => {
                            return (

                                <div className={styles.characterCard} key={index}>
                                    <div className={styles.characterImage}>
                                        <Skeleton width={'300px'} height={'200px'} />
                                    </div>

                                    <h2>
                                        <Skeleton />
                                    </h2>

                                </div>
                            )
                        })
                    }
                    </div>

                </div>

            </SkeletonTheme>
        )
    }

    const onLoadCallback = (char_id: any) => {
        // const newArr = loadingImages.map((_, index) => index === (char_id - 1) ? ({ loading: false }) : _)
        setLoadingImages((prevloadingImages: any) => prevloadingImages.map((_:any, index:any) => index === (char_id - 1) ? ({ loading: false }) : _))
        console.log('image with id ' + (char_id - 1) + ' loaded!', loadingImages)
    }

    return (
        <SkeletonTheme baseColor="rgb(36, 36, 36)" highlightColor="rgb(59, 59, 59)">


            <div className={styles.wrapper}>
                <h1>Characters</h1>
                <Link href="/">
                    <a className={'link'}>
                        ⬅ Back to Home
                    </a>
                </Link>

                <div className={styles.container}>
                    {characters.map((character: any, index: any) => {

                        const { name, img, char_id } = character

                        const isImageLoading = loadingImages[index].loading

                        return (
                            <>
                                <Link href={`/character/${char_id}`}>
                                    <div className={styles.characterCard} key={char_id}>
                                        <div className={styles.characterImage}>
                                            {loadingImages[index].loading &&  <Skeleton width={'300px'} height={'200px'} />}
                                            <Image 
                                                priority 
                                                src={img} 
                                                alt={name}
                                                width={200} 
                                                height={200} 
                                                objectFit={'contain'} 
                                                className={isImageLoading ? styles.loading : undefined} 
                                                onLoadingComplete={() => onLoadCallback(char_id)}/>
                                        </div>

                                        <h2>
                                            {name}
                                        </h2>

                                    </div>
                                </Link>
                            </>
                            
                        )

                    }
                    )}
                </div>
            </div>

        </SkeletonTheme>
    )
}

export default Characters