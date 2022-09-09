import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import styles from '../../styles/Character.module.scss'

const CharacterPage = () => {

    const effectCalled = useRef(false)
    const [character, setCharacter] = useState<any>([])
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const { query } = router
    const { id } = query

    console.log('query', id)

    useEffect(() => {

        if (!router.isReady || effectCalled.current) return

        // if (!router.isReady) return

        const fetchCharacter = async () => {
            const res = await fetch(`https://breakingbadapi.com/api/characters/${id}`)
            const fetchedCharacter = await res.json()
            
            setCharacter(fetchedCharacter)
            setLoading(false)
            console.log('fetched user', fetchedCharacter);
        }

        fetchCharacter()

        effectCalled.current = true

    }, [router, id])

        return (
            <SkeletonTheme baseColor="rgb(36, 36, 36)" highlightColor="rgb(59, 59, 59)">
                <div className={styles.wrapper}>

                    <h1>
                        {loading ? <Skeleton /> : character[0]?.name}
                    </h1>

                    <Link href="/character">
                        <a className={'link'}>
                            ⬅ Back to Home
                        </a>
                    </Link>
                    
                    <div className={styles.container}>

                        <div className={`${styles.characterCard} ${styles.single}`} key={character[0]?.char_id}>
                            <div className={styles.characterImage}>
                                {loading &&  <Skeleton width={'300px'} height={'200px'} />}
                                <Image 
                                    priority 
                                    src={loading ? '' : character[0].img} 
                                    width={200} 
                                    alt={character[0]?.name || 'product image'}
                                    height={200} 
                                    objectFit={'contain'} 
                                    className={loading ? styles.loading : undefined} 
                                    // onLoadingComplete={() => onLoadCallback()}
                                    />
                            </div>

                            <h2>
                                {/* {loading ? <Skeleton /> : {character[0]?.name}} */}
                                {loading ? <Skeleton /> : <>{character[0]?.name}</>}
                            </h2>

                            <ul className={styles.characterDetailsUl}>
                            <li className={styles.characterDetailsLi}>
                                 {loading ? <Skeleton /> : <>Birthday <b>{character[0]?.birthday}</b></>}
                            </li>
                            <li className={styles.characterDetailsLi}>
                                {loading ? <Skeleton /> : <>Status <b>{character[0]?.status}</b></>}

                            </li>
                            <li className={styles.characterDetailsLi}>
                                {loading ? <Skeleton /> : <>Nickname <b>{character[0]?.nickname}</b></>}
                            </li>
                            <li className={styles.characterDetailsLi}>
                                {loading ? <Skeleton /> : <>Portrayed <b>{character[0]?.portrayed}</b></>}

                            </li>
                        </ul>

                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        )
    }

export default CharacterPage