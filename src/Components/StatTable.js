import { useEffect, useState } from "react";
import Statics from "./Statics";
import BarGraph from "./BarGraph";

const StatTable=(props)=>{
    const {data}=props;
    console.log(data);
    let tempData={
        "AllStudent":"",
        "avgOfAll":"",
        "MaxOfAll":"",
        "MinOfAll":"",
        "FinalGrade0to5":"",
        "FinalGrade5to6":"",
        "FinalGrade6to7":"",
        "FinalGrade7to8":"",
        "FinalGradeMore8":"",
    }

    const [statValue,setStatValue]=useState(tempData);
    const [graphValue,setGraphValue]=useState([]);
    const [barValue,setbarValue]=useState([]);
    

    function calStat(){
        let allStudent=data.length;
        tempData.AllStudent=allStudent;

        let sum = data.reduce(function(previousVal, currentVal) {
            return previousVal + parseFloat(currentVal.finalGrade);
        }, 0);
        let avgAll=(sum/data.length);
        tempData.avgOfAll=avgAll.toPrecision(3);

        let maxAll = Math.max(...data.map(obj => obj.finalGrade));
        tempData.MaxOfAll=maxAll;

        let minAll = Math.min(...data.map(obj => obj.finalGrade));
        tempData.MinOfAll=minAll;

        let fG0to5 = data.filter(element => {

            if (element.finalGrade >= 46.2 && element.finalGrade <= 50.1) {
                return true;
            }
            return false;
            }).length;
        tempData.FinalGrade0to5=fG0to5;

        let fG5to6 = data.filter(element => {

            if (element.finalGrade >= 50.8 && element.finalGrade <= 52.0) {
                return true;
             }
            return false;
            }).length;
        tempData.FinalGrade5to6=fG5to6;

        let fG6to7 = data.filter(element => {

            if (element.finalGrade >= 52.6 && element.finalGrade <= 52.6) {
                return true;
            }
            return false;
            }).length;
        tempData.FinalGrade6to7=fG6to7;

        let fG7to8 = data.filter(element => {

            if (element.finalGrade >= 53.2 && element.finalGrade <= 54.6) {
                return true;
            }
            return false;
            }).length;
        tempData.FinalGrade7to8=fG7to8;

        let fGMore8 = data.filter(element => {

            if (element.finalGrade >= 55.1 && element.finalGrade <= 58.9) {
                return true;
            }
            return false;
            }).length;
        tempData.FinalGradeMore8=fGMore8;

        return tempData;
    }

    useEffect(()=>{
        let StatData=calStat();
        setStatValue(StatData);
    },[data])

    
    function setdonutGraph(){
        let arr=[
            statValue.FinalGrade0to5,
            statValue.FinalGrade5to6,
            statValue.FinalGrade6to7,
            statValue.FinalGrade7to8,
            statValue.FinalGradeMore8
        ];

        return arr;
    }

    useEffect(()=>{
        let graphField=setdonutGraph();
        setGraphValue(graphField);
        let barField=setbarGraph();
        setbarValue(barField);
        
    },[statValue])

    function setbarGraph(){
        let arr=[
            statValue.avgOfAll,
            statValue.MaxOfAll,
            statValue.MinOfAll
        ];

        return arr;
    }
    return(
        <div className="wrapper">
            <div className="statTable">
            <table>
            <thead>
                <tr>
                <th>Staus</th>
                <th>Count</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>All Students</td>
                    <td>{statValue.AllStudent}</td>
                </tr>
                <tr>
                    <td>Average of All</td>
                    <td>{statValue.avgOfAll}</td>
                </tr>
                <tr>
                    <td>Max of All</td>
                    <td>{statValue.MaxOfAll}</td>
                </tr>
                <tr>
                    <td>Min of All</td>
                    <td>{statValue.MinOfAll}</td>
                </tr>
                <tr>
                    <td>Final Grade 46.2 - 50.1</td>
                    <td>{statValue.FinalGrade0to5}</td>
                </tr>
                <tr>
                    <td>Final Grade 50.8 - 52.0</td>
                    <td>{statValue.FinalGrade5to6}</td>
                </tr>
                <tr>
                    <td>Final Grade 52.6 - 52.6</td>
                    <td>{statValue.FinalGrade6to7}</td>
                </tr>
                <tr>
                    <td>Final Grade 53.2 - 54.6</td>
                    <td>{statValue.FinalGrade7to8}</td>
                </tr>
                <tr>
                    <td>Final Grade More than 8</td>
                    <td>{statValue.FinalGradeMore8}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="statGraph">
            <Statics graphData={graphValue}/>
        </div>
        <div className="barGraph">
            <BarGraph barData={barValue}/>
        </div>
      </div>
    )
}

export default StatTable;