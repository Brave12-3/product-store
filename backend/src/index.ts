import express from "express"
const app = express();
app.get("/", (req, res) =>{
    res.json({
         message: "Welcome to product store API - Powered by postgreSQL,Drizzle ORM & clerk Auth",
        endpoints: {
            users: "/api/user",
            products: "/api/comments",
            comments:"/api/comments",
        },
        });

});

app.listen(3000, ()=> console.log("Server is up and running on port:3000"));
