import React, {useEffect, useState} from "react"
import style from "../styles/edgeInfo.module.css"

const NodeInfo = (props) => {
  //selected edge
  const [selectedEdgeInfo, setSelectedEdgeInfo] = useState()
  //selected edge target
  const [targetNode, setTargetNode] = useState()
  //selected edge source
  const [sourceNode, setSourceNode] = useState()
  //whether show description
  const [showSourceDescription, setShowSourceDescription] = useState(true)
  const [showTargetDescription, setShowTargetDescription] = useState(true)
  //if loading don't return
  const [isLoading, setIsLoading] = useState(true)
  //get node data from node id
  const getNodeData = (id) => {
    let data
    props.data.nodes.forEach((node) => {
      if (node.data.id === id)
        data = node
    })
    return data
  }

  useEffect(() => {
    setIsLoading(true)
    const data = props.data
    const id = props.id
    setShowTargetDescription(true)
    setShowSourceDescription(true)
    data.edges.forEach((edge) => {
      if (edge.data.id === id) {
        setSelectedEdgeInfo(edge)
        setTargetNode(getNodeData(edge.data.target))
        setSourceNode(getNodeData(edge.data.source))
        setIsLoading(false)
      }
    })
  }, [props])
  
  const onSourceDescriptionClick = () => {
    setShowSourceDescription(!showSourceDescription)
  }
  const onTargetDescriptionClick = () => {
    setShowTargetDescription(!showTargetDescription)
  }
  if(isLoading) return <div className={style.container}>loading..</div>
  return (
    <div className={style.container}>
      <h2>Selected Interaction</h2>
      {console.log(selectedEdgeInfo)}
      <h3>{selectedEdgeInfo.data.name}</h3>
      <h4>Combined score : {selectedEdgeInfo.data.stringdb_score}</h4>
      <h5>{`Coexpression observed in your query organism: ${selectedEdgeInfo.data.stringdb_coexpression}`}</h5>

      <p className={style.display_name}>{sourceNode.data.display_name}</p><p className={style.shared_name}>{`[${sourceNode.data.shared_name.substring(5)}]`}</p>
      <h6 onClick={onSourceDescriptionClick}>{showSourceDescription ? "Hide description" : "Show description"}</h6>
      {showSourceDescription && <p className={style.description}>{sourceNode.data.stringdb_description}</p>}

      <p className={style.display_name}>{targetNode.data.display_name}</p><p className={style.shared_name}>{`[${targetNode.data.shared_name.substring(5)}]`}</p>
      <h6 onClick={onTargetDescriptionClick}>{showTargetDescription ? "Hide description" : "Show description"}</h6>
      {showTargetDescription && <p className={style.description}>{targetNode.data.stringdb_description}</p>}
      {/* <h6 onClick={onDescriptionClick}>{showDescription ? "Hide description" : "Show description"}</h6>
      {showDescription && <p className={style.description}>{selectedNodeInfo && selectedNodeInfo.data.stringdb_description}</p>}
      <h4>Interaction</h4>
      {interaction && interaction.map((data, index) => {
        return (
          <p key={index} className={style.interaction}>{data}</p>
        )
      })} */}
    </div>
  )
}
export default NodeInfo