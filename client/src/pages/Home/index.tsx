import { useState, useEffect } from "react";
import Post from "../../components/Post";
import { PostProps } from "../../components/Post";
import CreatePost from "../../components/CreatePost";
import "./style.css";

export default function Home() {
  const [post, setPost] = useState<PostProps[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts");
        const data = await response.json();
        setPost(data.reverse());
        setLoading(false);

      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchData();
  }, []);

  if (!post?.length) {
    return <div className="loading">Loading...</div>; // ou qualquer indicador de carregamento desejado
  }
  return(
    <>
      <div>
        <CreatePost />
      </div>
      <div>
      
        <h1>Posts</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          post?.map((post) => (
            <Post key={post.id} id={post.id} title={post.title} content={post.content} />
          ))
        )}
      </div>
    </>
  );
}
