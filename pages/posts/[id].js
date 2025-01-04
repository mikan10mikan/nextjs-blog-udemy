import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
    const paths = getAllPostIds();// サーバーサイドでパスを生成

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);// サーバーサイドで投稿データを取得

    return {
        props: {
            postData,
        },
    };
}

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
            <div cclassName={utilStyles.lightText}>{postData.data}</div>
            <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML }}/>
            <br />
            {postData.data}
            <br />
            
            </article>
        </Layout>
    );
}