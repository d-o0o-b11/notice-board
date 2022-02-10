import React, { useState }  from "react"
import { Input } from "antd"
import styled from "styled-components"
import "./Step.css"


const DetailDiv = styled.div`
  div {
    margin-bottom: 2rem;
    width: 320px;
  }
`


const { TextArea } = Input



const DetailList = (props) => {
  
  const [file, setFile] = useState(null);

  


  return (
    <DetailDiv>
      {props.countList && props.countList.map((item, i) => (
        
        <div key={i}>
            <label className='lalabel'>step{i}</label>
            <div>
              <TextArea
              type="text"
              placeholder="예) 소고기는 기름기를 떼어내고 적당한 크기로 썰어주세요."
              className='step'
                autoSize={{ minRows: 6, maxRows: 6 }}
              />

              <label htmlFor="fileInput" className="touch"></label>
               {
                  file ? <img htmlFor="fileInput" className="writeImg" src={URL.createObjectURL(file)} alt="" /> :
                    <img htmlFor="fileInput" className="writeImg" src="http://www.billking.co.kr/index/skin/board/basic_support/img/noimage.gif" alt="" />
                }

              <input 
                type="file" 
                id='fileInput' 
                style={{ display: "none" }}
                accept='image/jpg, image/jpeg, image/png' 
                /*onChange={(e)=>insertImg(e)} */ 
                onChange={(e) => {
                  setFile(e.target.files[0])
                  }
                }
              />
      
            </div>
        </div>
        
      ))}
      
    </DetailDiv>
  )
}

export default DetailList