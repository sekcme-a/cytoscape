import React, {useEffect, useState} from 'react'
import Data from '../api/data.json'
import Styles from '../api/styles.json'
import style from "../styles/networkResult.module.css"
import CytoscapeComponent from 'react-cytoscapejs'
import cola from 'cytoscape-cola'
import Cytoscape from 'cytoscape'
import NodeInfo from "./NodeInfo"
import EdgeInfo from "./EdgeInfo"
import YourInput from "./YourInput"

// const style = require('src/data/styles.json')
Cytoscape.use(cola);

const NetworkResult = (props) => {
  //data
  const [sortedProteinsData, setSortedProteinsData] = useState({})

  //styles
  const width = "100%";
  const height = "500px";
  const maxZoom = 2.5;
  const minZoom = 0.5;

  //layout control
  const [edgeLength, setEdgeLength] = useState(200)
  const [nodeSpacing, setNodeSpacing] = useState(10)

  //selected node or edges
  const [selectedType, setSelectedType] = useState("")
  const [selectedId, setSelectedId] = useState()

  const layout = {
    name: "cola",
    nodeSpacing: function (node) { return nodeSpacing; },
    edgeLength: edgeLength,
    maxSimulationTime: 2000,
    // ungrabifyWhileSimulating: true,
  };

  useEffect(() => {
    setSortedProteinsData(props.sortedProteinsData)
  }, [props.sortedProteinsData])
  
  const onEdgeLengthChange = (e) => {
    setEdgeLength(parseInt(e.target.value))
  }
  const onNodeSpacingChange = (e) => {
    setNodeSpacing(parseInt(e.target.value))
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.leftContainer}>
        <div className={style.styleSetting}>
          <p>Edge Length</p>
          <input type="range" id="edgeLength" name="edgeLength" min="1" max="500" onChange={onEdgeLengthChange} value={edgeLength}/>
          <p>Node Spacing</p>
          <input type="range" id="nodeSpacing" name="nodeSpacing" min="1" max="100" onChange={onNodeSpacingChange} value={nodeSpacing}/>
        </div>
        <div className={style.cytoscape__container}>
          {props.sortedProteinsData !== {} &&
            <CytoscapeComponent elements={CytoscapeComponent.normalizeElements(sortedProteinsData)}
              style={{ width: width, height: height }}
              stylesheet={Styles}
              maxZoom={maxZoom}
              minZoom={minZoom}
              autounselectify={false}
              boxSelectionEnabled={true}
              layout={layout}
            cy={(cy) =>
            {
              cy.on('tap', 'node', function (evt) {
                setSelectedType("node"); setSelectedId(evt.target.id());
              });
              cy.on('tap', 'edge', function (evt) {
                setSelectedType("edge"); setSelectedId(evt.target.id());
              });
            }}
            />
          }
        </div>
        <YourInput data={sortedProteinsData.nodes}/>
      </div>
      <div className={style.rightContainer}>
        {selectedType === "node" && <NodeInfo id={selectedId} data={sortedProteinsData} />}
        {selectedType === "edge" && <EdgeInfo id={selectedId} data={sortedProteinsData}/>}
      </div>
    </div>
  )
}

export default React.memo(NetworkResult);