import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Fetch from 'isomorphic-unfetch';




// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
  
//   return {
//     props: {
//       allPostsData, color
//     }
//   }
// }

export async function getServerSideProps(context) {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day = date.getDate()
  const today = year + '/' + month + '/' + day
  const res = await fetch('http://api.jugemkey.jp/api/horoscope/free/' + today);

  const data = await res.json();
  
  const result = data.horoscope
  let fortune={};
  for (const [key, valu] of Object.entries(result)) {
    for (const [k, v] of Object.entries(valu)) {
      console.log(v);
      
      if (v.sign === '牡羊座') {
        fortune.ishibashi = 

            { 
              color : v.color,
              money : v.money,
              job   : v.job
            }
    
      }
      if (v.sign === '獅子座') {
        fortune.furukawa=
            { 
              color : v.color,
              money : v.money,
              job   : v.job
            }
      }
    }
  }
  console.log(fortune.ishibashi)
  return {
    props: {
      fortune
    }
  }
}

export default function Home({ fortune }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h1>中央競馬騎手占い</h1>
        {/* <ul className={utilStyles.list}>
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
        </ul> */}
        <div>
          <h2>本日の石橋脩騎手の運勢</h2>
          <p>仕事運：{fortune.ishibashi.job}</p>
          <p>金運：{fortune.ishibashi.money}</p>
          <p>ラッキー枠：{fortune.ishibashi.color}</p>
        </div>
        <div>
          <h2>本日の古川奈穂騎手の運勢</h2>
          <p>仕事運：{fortune.furukawa.job}</p>
          <p>金運：{fortune.furukawa.money}</p>
          <p>ラッキー枠：{fortune.furukawa.color}</p>
        </div>
      </section>
    </Layout>
  )
  Index.getInitialProps = async function(){
    
  }
}
