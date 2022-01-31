import React, { useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import useInputs from '../hooks/useInputs';
import { ADD_ITEM, CHANGE_MENU } from '../reducers/boardReducer';
import './form.css';

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

  return (
    <div className="form">
      <div className="input-box">
        <h3>제목: <input
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
