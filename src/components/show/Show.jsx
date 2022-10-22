import React, { useRef, useState } from 'react'
import axios from 'axios'
import './show.css'

const Show = () => {

  const [data, setDate] = useState({
      id: "",
      colors: "",
      type: "",
      pattern: "",
      size: "",
      gender: ""
  })

  const [text, setText] = useState('');
  const [path, setPath] = useState('');
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const formRef = useRef()

  const onSubmit1 = async e => {
    console.log(selectedFile);
    console.log('submitted')
    e.preventDefault();

    axios.post("/getLables", { path: path, title: title, text: text }).then(res => {
        console.log(path)
        console.log(title)
        console.log(res)

        setDate({
          colors: res.colors,
          type: res.type,
          pattern: res.pattern,
          size: res.size,
          gender: res.gender
      })
      }).catch(err => {
        console.log(err)
      })
  }

  const onSubmit = async (e) => {
    console.log(selectedFile);
    console.log('submitted')
    e.preventDefault();

    const data = new FormData(formRef.current);

    // fetch("/test").then((res) => 
    //   res.json().then((data) => {
    //     setDate({
    //       id: data.id,
    //       colorList: data.colorList,
    //       gender: data.gender,
    //       type: data.type,
    //       size: data.size
    //     })
    //   })
    // )

    // axios.post("/test", { path, title, text }).then(result => {
    //   console.log(path)
    //   console.log(title)
    //   console.log(result)
    // })

    await fetch("/getLables", {
      method: "POST",
      body: data
    }).then(res => {
      const received = res.json();
      return received
    }).then(result => {
      console.log(result)

      setDate({
        colors: result.colors,
        type: result.type,
        pattern: result.pattern,
        size: result.size,
        gender: result.gender
    })
    }).catch(err => {
      console.log(err)
    });

    // const res = await axios.post("/test", {
    //   method: "POST",
    //   body: data
    // });

  }

  const clear = () => {
    setDate({
      colors: "",
      type: "",
      pattern: "",
      size: "",
      gender: ""
    })
  }

    // l.colorList=["red", "black", "white"]
    // l.gender="Male"
    // l.type="Shirt"
    // l.size="L"

  return (
    <div className='container'>
      <h1>Prediction result of the Item </h1>
      {
        selectedFile && (
          <>
            <img alt='not found' width={"250px"} src={URL.createObjectURL(selectedFile)} />
            <br />
            <button onClick={() => setSelectedFile(null)}>Remove</button>
          </>
        )
      }
      <form ref={formRef} onSubmit={onSubmit}>
      <>
        {/* <input
          type="file"
          name="path"
          onChange={e => setSelectedFile(e.target.files[0])}
        /> */}
        <input 
          className='field'
          type="text"
          placeholder='input path'
          name='path'
          value={path}
          onChange={e => setPath(e.target.value)}
        />
        <br />
        <br />

        <textarea
            className='field'
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br />
          <br />

        <textarea
            className='field'
            type="text"
            placeholder="Description"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          {/* <button className='get_btn' onClick={onClick}>
            Get the item
          </button> */}
          <input className='get_btn' type='submit' />
        </>
      </form>
      <br />
      
      <button className='clear' onClick={clear}>clear</button>
      <br />
      {/* <p className='p1'>prediction_color: {data.colorList.join(",")}</p> */}
      <p className='p1'><strong>colors: </strong>{data.colors}</p>
      <p className='p1'><strong>type: </strong>{data.type}</p>
      <p className='p1'><strong>pattern: </strong>{data.pattern}</p>
      <p className='p1'><strong>size: </strong>{data.size}</p>
      <p className='p1'><strong>gender: </strong>{data.gender}</p>
    </div>
  )
}

export default Show;