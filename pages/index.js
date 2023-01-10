import Head from 'next/head'
import ArticleList from '../components/ArticleList'
// import { Inter } from '@next/font/google'
// import styles from "../styles/Layout.module.css";

// const inter = Inter({ subsets: ['latin'] })

export default function Home({ articles }) {
  console.table(articles)
  return (
    <>
      <Head>
        <title>NextJS practice</title>
        <meta name="keywords" content="web development, programming, practice" />
        <meta name="description" content="Just a website to practice NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ArticleList articles={articles} />
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
  const articles = await res.json();

  return {
    props: {
      articles
    }
  }
}