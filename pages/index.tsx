import {useState} from 'react';
import Layout from '../components/Layout';
import * as url from "url";

type Props = {
    posts: [Post]
}

type Post = {
    _id: String;
    title: String;
    content: String;
    ss: string;
    image:string;
}

export async function getServerSideProps() {
    try {
        let response = await fetch('http://localhost:3000/api/getPosts');
        let posts = await response.json();
        console.log('pp'+posts)

        return {
            props: { posts: JSON.parse(JSON.stringify(posts)) },
        };
    } catch (e) {
        console.error(e);
    }
}

export default function Posts(props: Props) {
    const [posts, setPosts] = useState()
    console.log('dd'+props.posts.map((value, index) => value.title))
    // const handleDeletePost = async (postId: string) => {
    //     try {
    //         let response = await fetch(
    //             "http://localhost:3000/api/deletePost?id=" + postId,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     Accept: "application/json, text/plain, */*",
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         response = await response.json();
    //         window.location.reload();
    //     } catch (error) {
    //         console.log("An error occurred while deleting ", error);
    //     }
    // };
    return (
        <>
            <div className="posts-body">
                <h1 className="posts-body-heading">Top 20 Added Posts</h1>
                {props.posts.length > 0 ? (
                    <ul className="posts-list">
                        {props.posts.map((post, index) => {
                            return (
                                <li key={index} className="post-item">
                                    <div className="post-item-details">
                                        <h2>{post.title}</h2>

                                        <p>{post.content}</p>
                                        <p>{post.ss}</p>
                                        <img width={200} alt={post.ss} src={post.image}/>
                                    </div>
                                    <div className="post-item-actions">
                                        <a href={`/posts/${post._id}`}>Edit</a>
                                        {/*<button onClick={() => handleDeletePost(post._id as string)}>*/}
                                        {/*    Delete*/}
                                        {/*</button>*/}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <h2 className="posts-body-heading">Ooops! No posts added so far</h2>
                )}
            </div>
            <style jsx>
                {`
        .posts-body {
          width: 400px;
          margin: 10px auto;
        }
        .posts-body-heading {
          font-family: sans-serif;
        }
        .posts-list {
          list-style-type: none;
          display: block;
        }
        .post-item {
          width: 100%;
          padding: 10px;
          border: 1px solid #d5d5d5;
        }
        .post-item-actions {
          display: flex;
          justify-content: space-between;
        }
        .post-item-actions a {
          text-decoration: none;
        }
      `}
            </style>
        </>
    );
}