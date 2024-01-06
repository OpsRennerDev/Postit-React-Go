export type PostProps = {
    id: number;
    title: string;
    content: string;
}

const Post: React.FC<PostProps> = ({ title, content,id }) =>{
    return (
        <div key={id}>
            <h1>{title}</h1>
            <p>{content}</p>
            <button>Editar</button>
            <button>Excluir</button>
        </div>
    )
}
export default Post