import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Fetch from 'isomorphic-unfetch';




export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const today = year + '/' + month + '/' + day
  const res = await fetch('http://api.jugemkey.jp/api/horoscope/free/' + today);

  const data = await res.json();
  // const a = JSON.parse(JSON.stringify(data))
  // data.forEach((value) => {
  //   console.log(value)
  // })
  
  const result = data.horoscope
  let color = ''
  for (const [key, valu] of Object.entries(result)) {
    for (const [k, v] of Object.entries(valu)) {
      console.log(v.sign);
      if (v.sign === '牡羊座') {
        color = v.color
      }
    }
  }
  console.log(Object.keys(result))
 
  
  return {
    props: {
      allPostsData, color
    }
  }
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }

export default function Home({ allPostsData, color }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        <div>
          本日の石橋脩ラッキー枠：{color}
        </div>
      </section>
    </Layout>
  )
  Index.getInitialProps = async function(){
    
  }
}
