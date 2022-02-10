import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "antd"
import { Link } from "react-router-dom"
import axios from "axios"
import { PlusCircleOutlined } from "@ant-design/icons"
import DetailList from "./DetailList"
import "./Step.css"

const CreateListDiv = styled.div`
  padding: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`


const CreateList = () => {
  const [countList, setCountList] = useState([0])
  

  const onAddDetailDiv = () => {
    let countArr = [...countList]
    let counter = countArr.slice(-1)[0]
    counter += 1
    countArr.push(counter)   // index 사용 X
    // countArr[counter] = counter   // index 사용 시 윗줄 대신 사용   
    setCountList(countArr)
  }

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (file) {
      const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        console.log(data)
        // newPost.photo = filename;
        try {
            await axios.post("http://localhost:5000/upload", data);
        } catch (err) {
            console.log(err)
        }
    }
    
};




  return (
    <CreateListDiv>
      <DetailList countList={countList} />            
      <Button onClick={onAddDetailDiv}>
        <PlusCircleOutlined />추가
      </Button>
    </CreateListDiv>
  )
}
export default CreateList