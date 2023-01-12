import Head from 'next/head'
import ArticleList from '../components/ArticleList'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, selectValue } from '../slices/counterSlice'

export default function Home({ articles }) {

  const count = useSelector(selectValue)
  const dispatch = useDispatch()
  // console.table(articles)
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

      <div style={{ display: 'flex', width: '500px', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => dispatch(decrement())} style={{ padding: '10px', fontSize: '30px', backgroundColor: 'red', color: 'white' }}>-</button>
        <button onClick={() => dispatch(increment())} style={{ padding: '10px', fontSize: '30px', backgroundColor: 'green', color: 'white' }}>+</button>
      </div>

      <h1>Counter is {count}</h1>
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