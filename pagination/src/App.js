import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Post from './Post';
import Paginaion from './Pagination';

const App=()=>{
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postPerPage] = useState(15); //페이지당 포스트 개수

  useEffect(()=>{
    const fetchPosts = async () =>{
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data);
      setLoading(false);
  }

  fetchPosts();
}, []);


const indexOfLastPost = currentPage * postPerPage; //1*10 = 10번 포스트
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNum => setCurrentPage(pageNum);

return(
  <div className="container">
    <h2>My Blog Title</h2>
    <Post posts={currentPosts}/>
    <Paginaion
      postPerPage={postPerPage}
      totalPosts={posts.length}
      paginate={paginate} />
  </div>
  );
}

export default App;

