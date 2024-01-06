package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"fmt"
	"net/http"
)

type Post struct {
	ID      uint   `json:"id" gorm:"primary_key"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

var posts = []Post{
	Post{ID: 1, Title: "Título 1", Content: "Conteúdo 1"},
	Post{ID: 2, Title: "Título 2", Content: "Conteúdo 2"},
	Post{ID: 3, Title: "Título 3", Content: "Conteúdo 3"},
}

func SetupRouter() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "DELETE"}
	config.AllowHeaders = []string{"Origin", "Content-Type"}
	config.ExposeHeaders = []string{"Content-Length"}

	r.Use(cors.New(config))

	r.GET("/api/posts", func(c *gin.Context) {
		c.JSON(http.StatusOK, posts)
	})

	r.POST("/api/posts", func(c *gin.Context) {
		var newPost Post
		if err := c.BindJSON(&newPost); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Dados inválidos"})
			return
		}

		newPost.ID = uint(len(posts) + 1)
		posts = append(posts, newPost)

		c.JSON(http.StatusCreated, newPost)
	})

	r.DELETE("/api/posts/:id", func(c *gin.Context) {
		id := c.Param("id")
		for i, post := range posts {
			if id == fmt.Sprint(post.ID) {
				posts = append(posts[:i], posts[i+1:]...)
				c.JSON(http.StatusOK, gin.H{"message": "Post excluído com sucesso"})
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Post não encontrado"})
	})

	return r
}

func main() {
	r := SetupRouter()
	r.Run(":8080")
}
