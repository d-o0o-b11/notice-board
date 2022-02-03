import React, { useRef, useEffect, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import useInputs from '../hooks/useInputs';
import { ADD_ITEM, CHANGE_MENU } from '../reducers/boardReducer';
import './form.css';
import styled from 'styled-components'

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDay()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const Write = memo(({ id, dispatch, history }) => {
  const item = {};
  const [state, onChangeInput] = useInputs({ title: '', content: '' });
  const { title, content } = state;
  const inputTitle = useRef(null);
  const inputContent = useRef(null);

  const [ previewImg, setPreviewImg]= useState(null);
  const [img, setImg ]= useState('이미지 없음')


  useEffect(() => {
    dispatch({ type: CHANGE_MENU, menu: '글작성' });
    inputTitle.current.focus();
  }, [dispatch]);

  const onClickSubmit = () => {
    if (!title) {
      alert('Please enter a title.');
      inputTitle.current.focus();
    } else if (!content) {
      alert('Please enter the content.');
      inputContent.current.focus();
    } else {
      item.id = id;
      item.title = title;
      item.content = content;
      item.date = formatDate(new Date());
      item.views = 0;
      dispatch({ type: ADD_ITEM, item });
      history.push(`/detail/${item.id}`);
    }
  };

  /*이미지 파일 추가 me*/
  const insertImg = (e) => {
    //return console.log(e.target.files[0])
    let reader = new FileReader()

  if(e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0])
  }

  reader.onloadend = () => {
    const previewImgUrl = reader.result

    //1
  	if(previewImgUrl){
      //setPreviewImg[previewImgUrl] //전
     //setPreviewImg(previewImgUrl)   //후 이미지 한개
     setPreviewImg([...previewImg, previewImgUrl]) //이미지 여러개
     //console.log(previewImgUrl,123)
     setImg(e.target.files[0].name)
     //그림옆에 이름 나오는것
    }
    
  }
}
  
const deleteImg=(index)=>{
  const imgArr = img.filter((el,idx)=> idx!==index)
  const imgNameArr = previewImg.filter((el,idx)=>idx!==index)

  setImg([...imgArr])
  setPreviewImg([...imgNameArr])
}

const getPreviewImg=()=>{
  if(img===null || img.length===0){
    return(
      <ImgAreaContainer>
        <ImgArea>
          <Img src='http://www.billking.co.kr/index/skin/board/basic_support/img/noimage.gif' alt='noImg'/>
        </ImgArea>
        <ImgName>등록된 이미지가 없습니다.</ImgName>
      </ImgAreaContainer>
    )
  }else{
    return img.map((el,index)=>{
      const{name}=el

      return(
        <ImgAreaContainer key={index}>
          <ImgArea>
            <Img src={previewImg[index]}/>
          </ImgArea>
          <ImgName>{name}</ImgName>
          <DeletButton onClick={()=>deleteImg(index)}></DeletButton>
        </ImgAreaContainer>
      )
    })
  }
}


  return (

    
    <div className="form">

      {/*me*/}

      
      <MainContainer>
        {/*<ImgAreaContainer>
          <ImageArea>
            <Img src={previewImg ? previewImg : 'http://www.billking.co.kr/index/skin/board/basic_support/img/noimage.gif'} alt='noImg'/>
          </ImageArea>
          <ImgName>{img}</ImgName>
          <DeletButton onClick={deleteImg}>❌</DeletButton>
        </ImgAreaContainer>
      */}
      
        <form encType='multipart/form-data'>
        <label htmlFor='file'>이미지업로드: </label>
        <input type="file" id='file' accept='image/jpg, image/jpeg, image/png' onChange={(e)=>insertImg(e)} />
        </form>
      
      </MainContainer>
     
      {/*me*/}

      <div className="input-box">
        <h3>제 목: <input
          ref={inputTitle}
          placeholder="title"
          name="title"
          value={title}
          onChange={onChangeInput}
        />
        </h3>

      </div>
      <textarea  /*write가운데 글*/
        className="textarea"
        ref={inputContent}
        placeholder="content"
        name="content"
        value={content}
        onChange={onChangeInput}
      />
      <div className="btn-box">
        <button onClick={onClickSubmit}>submit</button>
        <button><Link to="/">cancel</Link></button>
      </div>
    </div>
  );
});

export default Write;

const MainContainer = styled.div`
display:flex;
justify-content: center;
flex-direction:column;
align-items: center;
margin-top:20px;

  @media(max-width:400px){
    width:100%;
    max-width: 400px;
    justify-content:start;
    flex-wrap:wrap;
  }
`


const ImgAreaContainer = styled.div`
  display: flex;
  align-items:center;
`
const ImageArea = styled.div`
width: 100px;
height: 100px;
display: flex;
align-items: center;
margin-bottom: 10px;
`

const ImgArea=styled.div`
width:100px;
height:100px;
display:flex;
align-items: center;
margin-bottom:10px;
`


const Img=styled.img`
object-fit:cover;
width:100%;
`

const FileInput = styled.input`
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
padding: 0;
margin:-1px;
overflow: hidden;
clip:rect(0,0,0,0);
border:none;
`
const Label = styled.label`
display: inline-block;
color: #fff;
padding: 10px;
background: #6a4162;
cursor: pointer;
border: 1px solid #ebebeb;
border-radius:5px;
`

{/*me*/}

const ImgName = styled.div`
width: 100px;
height: 100px;
display: flex;
align-items: center;
margin-bottom: 10px;
`

const DeletButton = styled.div`
width: 100px;
height: 100px;
display: flex;
align-items: center;
margin-bottom: 10px;
`