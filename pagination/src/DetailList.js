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
  
  const [img, setImg] = useState([])
  const [previewImg, setPreviewImg]= useState([])
  const [file, setFile] = useState(null);
  //file대신 previewImg, setFile대신 setPreviewImg 넣는다면?

  const insertImg =(e)=>{
    let reader = new FileReader()

    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])

      setImg(...img, e.target.files[0].name)
    }

    reader.onloadend=()=>{
      const previewImgUrl = reader.result

      if(previewImgUrl){
        setPreviewImg([...previewImg,previewImgUrl])
      }
    }

  }

  const getPreviewImg=()=>{
    if(img===null || img.length===0){
      return(
        <div className="touch">
        <img src="http://www.billking.co.kr/index/skin/board/basic_support/img/noimage.gif" alt="이미지 없음"/>
        </div>
      )
    }else{
      return img.map((el, index)=>{
        const{name}=el

        return(
          <div key={index} className="touch">
          <img src={previewImg[index]}/>
          </div> 
        )
      })
    }
  }


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

              {getPreviewImg()}

              <input 
                type="file" 
                id='fileInput' 
                
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