const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
    }

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    if (authenticatedUser(username,password)) {
        let accessToken = jwt.sign({
            username: username
        }, 'access', { expiresIn: 60 * 60 });
        req.session.authorization = {
            accessToken,username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});  
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    // Get the ISBN from the parameters
    const isbn = req.params.isbn;
  
    // Get the review from the query parameters
    const review = req.query.review;
  
    // Get the username from the user object
    const username = req.user.username;
  
    // Check if the book exists
    if (!books[isbn]) {
      return res.status(404).json({message: "Book not found"});
    }
  
    // Add the review to the book's reviews
    books[isbn].reviews[username] = review;
  
    // Send a success response
    return res.status(200).json({message: "Review added successfully"});
  });

  // Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    // Get the ISBN from the parameters
    const isbn = req.params.isbn;
  
    // Get the username from the user object
    const username = req.user.username;
  
    // Check if the book exists
    if (!books[isbn]) {
      return res.status(404).json({message: "Book not found"});
    }
  
    // Check if the user has a review for this book
    if (!books[isbn].reviews[username]) {
      return res.status(404).json({message: "No review found for this user and book"});
    }
  
    // Delete the review
    delete books[isbn].reviews[username];
  
    // Send a success response
    return res.status(200).json({message: `Review for the ISBN ${isbn} posted by ${username} is deleted `});
  });
  
  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
