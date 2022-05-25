import React from "react"
import style from "../styles/yourInput.module.css"
const YourInput = (props) => {
  return (
    <>
      <h1 className={style.title}>Your Input : </h1>
      <div className={style.container}>
        {props.data!==undefined && props.data.map((node, index) => {
          return (
            <div key={index} className={style.itemContainer}>
              <h2>{node.data.display_name}</h2>
              <h3>{node.data.stringdb_description}</h3>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default YourInput;