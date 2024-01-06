import React, { useState } from 'react'
import './style.css'

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        const post = {
            title,
            content,
        };

        try {
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });

            if (response.ok) {
                console.log("Post criado com sucesso!");
            } else {
                console.log("Erro ao criar o post!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isFormValid = title.trim() !== "" && content.trim() !== "";

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <input
                className='form-title'
                type="text"
                placeholder="Título"
                onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
                className='form-content'
                placeholder="Conteúdo"
                onChange={(event) => setContent(event.target.value)}
            />
            <div>
                <button type="submit" disabled={!isFormValid}>Criar Post</button>
            </div>
        </form>
    )
}

export default CreatePost