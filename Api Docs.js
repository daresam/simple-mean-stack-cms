    User Model
Login
https://meanauth-daresam.c9users.io/users/authenticate 
Request
{
	username: string,
	password: string
}
Response
{
    "success": true,
    "message": "Login successful",
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlzQWRtaW4iOjEsIl9pZCI6IjVhODZhZmJmNGJjMzg3MTIyODdkMWE5YyIsIm5hbWUiOiJWaWN0b3IiLCJlbWFpbCI6InZpY2tndWxhckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InZpY2tndWxhciIsInBhc3N3b3JkIjoiJDJhJDEwJDBvWUh6L0xJbGo1b1Q4dThCN2lOQ09CVG04ZGJnUnVVQnp2NzZxdlNvRWdJa1NncXFNTU1LIiwiX192IjowfSwiaWF0IjoxNTE5NDA1NTk5LCJleHAiOjE1MjAwMTAzOTl9.zHkjHDhVjMORFgtYvA6UyTwsKorWrYjJ-v046DQFcoM",
    "user": {
        "id": "5a86afbf4bc38712287d1a9c",
        "name": "Victor",
        "username": "vickgular",
        "email": "vickgular@gmail.com",
        "isAdmin": 1
    }
}

Register
https://meanauth-daresam.c9users.io/users/register
Request
{
	name: string,
    username: string,
    email: string,
	password: string
}
Response
{
    "success": true,
    "message": "User Registration was Successful",
    "user": {
        "id": "5a904eec5473682254b4392a",
        "name": "Test",
        "username": "test2",
        "email": "test@gmail.com",
        "isAdmin": 0
    }
}

Edit User
https://meanauth-daresam.c9users.io/users/id
Request
{
	name: string,
    username: string
    email: string,
	password: string
}

Response
{
    "success": true,
    "message": "User was updated successfully",
    "user": {
        "id": "5a904eec5473682254b4392a",
        "name": "Test",
        "email": "test@gmail.com",
        "username": "test23",
        "isAdmin": null
    }
}

Delete User
https://meanauth-daresam.c9users.io/users/id
Request empty

Response
{
    "success": true,
    "message": "User was deleted successfully"
}

    Post Model
Get Post  https://meanauth-daresam.c9users.io/posts
Request empty

Response
{
    "success": true,
    "posts": [
        {
            "id": "5a8ee62ffc87f0244ca1b8dc",
            "title": "Adonisjs",
            "body": "Adonisjs is Laravel Javascript Ninja",
            "excerpt": "Adonisjs is Laravel...",
            "createdAt": "2018-02-22T15:47:59.593Z",
            "author": {
                "id": "5a8578ec6c89e91914b7dd4f",
                "name": "Dare Samuel",
                "email": "daresam@gmail.com",
                "username": "daresam"
            }
        },
    ]
}

Create Post
https://meanauth-daresam.c9users.io/posts

Request 
{
	"author": "5a8efbffea30c51cec078205",
	"title": "Joel Post 3",
	"body": "Post Body Post Body Body 3 ",
	"excerpt": "Post Excerp 3t"
}

Response
{
    "success": true,
    "message": "Post added successfully",
   
}