import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import HomePage from '../components/HomePage'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <HomePage></HomePage>
      </main>

    </div>
  )
}

export default Home
