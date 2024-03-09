import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

// Function to generate a unique ID for posts
function generateUniqueId() {
  return Date.now().toString(); // Convert the generated ID to string
}

// Set up middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Render the index page with posts
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

// Render the about page
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Render the contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

// Render the form to create a new post with specific post id
app.get("/posts/new/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts.find((post) => post.id === postId);
  res.render("create-post.ejs", { post: post, posts: posts });
});

// Render the form to create a new post
app.get("/posts/new", (req, res) => {
  res.render("create-post.ejs", { posts: posts });
});

// Render a specific blog post
app.get("/blog/:id", (req, res) => {
  const postId = req.params.id;
  console.log("Requested post ID:", postId);
  const post = posts.find(post => post.id === postId); // Ensure comparison is done as strings
  console.log("Found post:", post);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("blog-post.ejs", { post: post });
});

app.get("/read-more", (req, res) => {
  res.render("read-more.ejs");
});

app.get("/book", (req, res) => {
  res.render("book.ejs");
});
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Create a new post
app.post("/create-post", (req, res) => {
  const { title, content } = req.body;
  const postId = generateUniqueId(); // Generate a unique ID for the post
  const newPost = { id: postId, title, content };
  posts.push(newPost); // Add the new post to the posts array
  res.redirect(`/posts/new/${postId}`); // Redirect to the newly created post page
});

// Render the edit form for a specific post
app.get("/edit/:id", (req, res) => {
  const itemId = req.params.id;
  const item = posts.find((post) => post.id === parseInt(itemId));

  if (!item) {
    return res.status(404).send("Post not found");
  }

  res.render("edit-form.ejs", { item });
});

// Update a specific post
app.post("/update/:id", (req, res) => {
  const itemId = req.params.id;
  const { title, content } = req.body;

  const index = posts.findIndex((post) => post.id === itemId); 
  if (index !== -1) {
    posts[index].title = title;
    posts[index].content = content;
  }

  res.redirect("/posts/new");
});


// Delete a specific post
app.post("/posts/:id/delete", (req, res) => {
  const postId = req.params.id; // Keep the ID as a string
  const index = posts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
    res.redirect("/posts/new"); 
  } else {
    res.status(404).send("Post not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
