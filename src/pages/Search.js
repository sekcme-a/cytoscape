import React, {useState, useEffect} from "react"
import style from "../styles/search.module.css"
import nodeListData from "../api/nodeList.json"
const Result = () => {
  const [SPText, setSPText] = useState([])
  const [MPText, setMPText] = useState([])
  const [list, setList] = useState()

  useEffect(() => {
    const temp = nodeListData.data.split(",")
    setList(temp)
  }, [])

  const onNodeClick = (node) => {
    if (MPText.includes(node))
      alert(`You already selected protein: ${node}`)
    else
      setMPText(MPText+`${node}\n`)
  }

  const onMPTextChange = (e) => {
    setMPText(e.target.value)
  }
  const onSPTextChange = (e) => {
    setSPText(e.target.value)
  }

  const onSubmitClick = (e) => {
    e.preventDefault();
    setMPText("")
    setSPText("")
    const temp = MPText.replace(/\n/g, "_");
    window.location.href=`result/${temp}`
  }
  const onSPSubmitClick = (e) => {
    e.preventDefault();
    setMPText("")
    setSPText("")
    window.location.href=`result/${SPText}`
  }

  return (
    <>
      <h3 className={style.search}>SEARCH</h3>
      <form name="single" className={style.container}>
        <div className={style.searchContainer}>
          <p>Search Single Protein By Name : </p>
          <textarea rows="1" cols="50" value={SPText} onChange={onSPTextChange}></textarea>
          <input type="submit" onClick={onSPSubmitClick} value="Search"></input>
        </div>
        <div className={style.searchContainer}>
          <p>Search Multiple Proteins By Names : {`(one per line)`}</p>
          <textarea rows="10" cols="50" value={MPText} onChange={onMPTextChange} placeholder="Example&#13;&#10;RFC4&#13;&#10;NCAPH&#13;&#10;RFC1&#13;&#10;CCNB2&#13;&#10;APEX1"></textarea>
          <input type="submit" onClick={onSubmitClick} value="Search"></input>
        </div>
      </form>
      <h3 className={style.search}>Proteins List</h3>
      <div className={style.container}>
        <div className={style.list__container}>
          <h4>Click to select</h4>
          {list!==undefined && list.map((node, index) => {
            return (
              <p key={index} className={style.nodes} onClick={()=>onNodeClick(node)}>{node}</p>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default Result