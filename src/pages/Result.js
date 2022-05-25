import React, {useEffect, useState} from "react"
import { useParams } from 'react-router-dom';
import NetworkResult from '../components/NetworkResult'
import Data from '../api/data.json'

const Search = () => {
  const selectedProteins = useParams().selectedProteins;
  const [sortedProteinsData, setSortedProteinsData] = useState({})

  useEffect(() => {
    const temp = selectedProteins.split("_");
    let splitedText = []
    let nodes = []
    let edges = []
    let id = [];
    if (temp.length === 1) {
      //Single Protein
      const selectedNode = temp[0]
      let selectedNodeId = "";
      Data.nodes.forEach((node) => {
        if (node.data.display_name === selectedNode){
          selectedNodeId = node.data.id
          nodes.push(node)
        }
      })
      Data.edges.forEach((edge) => {
        if (selectedNodeId === edge.data.source) {
          edges.push(edge)
          id.push(edge.data.target)
        } else if (selectedNodeId === edge.data.target) {
          edges.push(edge)
          id.push(edge.data.source)
        }
      })
      Data.nodes.forEach((node) => {
        for (let i = 0; i < id.length; i++){
          if (id[i] === node.data.id)
            nodes.push(node)
        }
      })
      setSortedProteinsData({ "nodes": nodes, "edges": edges })
    }
    else {
      //Multiple Proteins
      temp.forEach((data) => {
        if (data !== "")
          splitedText.push(data)
      })

      //get sorted nodes & edges
      const proteinsProp = splitedText;
      if (proteinsProp !== "") {
        Data.nodes.forEach((node) => {
          proteinsProp.forEach((p) => {
            if (p === node.data.display_name) {
              nodes.push(node)
              id.push(node.data.id)
            }
          })
        })
        Data.edges.forEach((edge) => {
          let found = 0;
          for (let i = 0; i < id.length; i++) {
            if (edge.data.source === id[i])
              found++;
            if (edge.data.target === id[i])
              found++;
            if (found === 2) {
              edges.push(edge)
              break;
            }
          }
        })
        setSortedProteinsData({ "nodes": nodes, "edges": edges })
      }
    }
  },[selectedProteins])
  return (
    <NetworkResult sortedProteinsData={sortedProteinsData} />
  )
}
export default Search
