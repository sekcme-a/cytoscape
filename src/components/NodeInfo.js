import React, {useEffect, useState} from "react"
import style from "../styles/nodeInfo.module.css"

const NodeInfo = (props) => {
  //selected node
  const [selectedNodeInfo, setSelectedNodeInfo] = useState()
  //selected node interaction datas
  const [interaction, setInteraction] = useState()
  //whether show description
  const [showDescription, setShowDescription] = useState(true)
  //if loading don't return
  const [isLoading, setIsLoading] = useState(true)
  //find node display_name + shared_name from node id
  const getDisplayName = (id) => {
    let name = ""
    props.data.nodes.forEach((node) => {
      if (node.data.id === id)
        name =  `${node.data.display_name}\n[${node.data.shared_name.substring(5)}]`
    })
    return name
  }

  useEffect(() => {
    const data = props.data
    const id = props.id
    let nodes = []
    let scores = []
    let interactionData = []
    setIsLoading(true)
    setShowDescription(true)
    //set selected node data
    data.nodes.forEach((node) => {
      if (node.data.id === id) {
        setSelectedNodeInfo(node)
        setIsLoading(false)
      }
    })
    //set interaction data
    data.edges.forEach((edge) => {
      if (edge.data.source === id) {
        interactionData.push(`${getDisplayName(edge.data.target)}\n(combined score : ${edge.data.stringdb_score})`)
      } else if (edge.data.target === id) {
        interactionData.push(`${getDisplayName(edge.data.source)}\n(combined score : ${edge.data.stringdb_score})`)
      }
    })
    setInteraction(interactionData)
  }, [props])
  
  const onDescriptionClick = () => {
    setShowDescription(!showDescription)
  }
  if (isLoading) return <div className={style.container}>Loading...</div>
  return (
    <div className={style.container}>
      <h3>Selected Protein</h3>
      <h5 className={style.display_name}>{selectedNodeInfo.data.display_name}</h5><h5 className={style.shared_name}>{`[${selectedNodeInfo.data.shared_name}]`}</h5>
      <h6 onClick={onDescriptionClick}>{showDescription ? "Hide description" : "Show description"}</h6>
      {showDescription && <p className={style.description}>{selectedNodeInfo.data.stringdb_description}</p>}
      <h4>Interaction</h4>
      { interaction.map((data, index) => {
        const text=data.split(`\n`)
        return (
          <div key={index}>
            <p className={style.display_name}>{text[0]}</p><p className={style.shared_name}>{text[1]}</p>
            <p>{text[2]}</p>
          </div>
        )
      })}
    </div>
  )
}
export default NodeInfo