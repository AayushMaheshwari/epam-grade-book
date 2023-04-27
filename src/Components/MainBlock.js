import Data from "../Data/student.json";
import { useState, useEffect, useRef } from "react";
import Table from "./Table";
import '../styles/Header.css'
import download from '../styles/download.png';
import StatTable from "./StatTable";
import BarChart from "./BarChart";
const XLSX = require('xlsx');

const MainBlock = () => {
  const [stuList, setstuList] = useState(Data); /*Initial student list*/
  const [selected, setSelected] = useState([]); /*Student list that changes and renders*/
  const [flag, setFlag] = useState("asc"); /*Set flag true/false that chages A-Z Sorting*/
  const [gradeFlag, setGradeFlag] = useState("asc"); /*Set flag true/false that chages 1-9 Sorting*/
  const [inputValue, setInputValue] = useState(""); /*State to handle search input*/
  const [searchList, setsearchList] = useState([]); /*State that contatins  student list to search from*/
  const [buttonData,setButtonData] = useState([]);
  const [isShown,setIsShown]=useState(false);

  // Function to calculate grade
  function calGrade(item) {
    const grade = 0.6 * item.examGrade + 0.4 * item.ratingGrade;
    item.finalGrade = grade.toPrecision(3);
    if (item.finalGrade > 50) {
      item.status = "Pass";
    } else {
      item.status = "Fail";
    }
  }

  // Call grade function and set in stulist
  useEffect(() => {
    let tempData = [];
    tempData = Data;
    tempData.forEach(calGrade);
    setstuList(tempData);
  }, []);

  // Set selected when grade is updated in stulist
  useEffect(() => {
    setSelected(stuList);
    setsearchList(stuList);
    setButtonData(stuList);
  }, [stuList]);


  //  Handle all button
  function all() {
    setSelected(stuList);
    setsearchList(stuList);
    setButtonData(stuList);
  }

  // Handle pass button
  function pass() {
    let temp = [];
    stuList.forEach((el) => {
      if (el.status === "Pass") {
        temp.push(el);
      }
    });
    setSelected(temp);
    setsearchList(temp);
    setButtonData(temp);
  }

  // Handle fail button
  function fail() {
    if (flag === "asc") {
      let temp = [];
      stuList.forEach((el) => {
        if (el.status === "Fail") {
          temp.push(el);
        }
      });
      setSelected(temp);
      setsearchList(temp);
      setButtonData(temp);
    }
  }

  // Handle A-Z (Alphabetical by name) sorting button
  function sortAlpha() {
    if (flag === "asc") {
      const strAscending = [...selected].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      setFlag("desc");
      setSelected(strAscending);
    } else {
      const strDescending = [...selected].sort((a, b) =>
        a.name < b.name ? 1 : -1
      );
      setFlag("asc");
      setSelected(strDescending);
    }
  }

  // Handle 1-9 (grade) sorting button
  function sortNumeric() {
    if (gradeFlag === "asc") {
      const numAscending = [...selected].sort(
        (a, b) => a.finalGrade - b.finalGrade
      );
      setGradeFlag("desc");
      setSelected(numAscending);
    } else {
      const numDescending = [...selected].sort(
        (a, b) => b.finalGrade - a.finalGrade
      );
      setGradeFlag("asc");
      setSelected(numDescending);
    }
  }

  // Handle search input
  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  // Call search function only on search input change
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
        initialRender.current = false;
      } else {
        handleSearch(inputValue);
      }
  }, [inputValue]);

  // Search function 
  const handleSearch = (SearchKey) => {
    var keys = ["name"]; // fields we have to search in
    var lowSearchKey = SearchKey.toLowerCase();
    var result = searchList.filter((obj) =>
      keys.some((key) => String(obj[key]).toLowerCase().includes(lowSearchKey))
    );
    setSelected(result);
  };

  //BarChart Data
  let passCount = 0;
  let failCount=0;
  function Count() {
    stuList.forEach((el) => {
      if (el.status === "Pass") {
        passCount++;
      }
      else{
        failCount++;
      }
    });
  }

  Count();

  function jsonToExcel(data){
    const worksheet=XLSX.utils.json_to_sheet(data);
    const workbook=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1');
    const excelBuffer=XLSX.write(workbook, {bookType:'xlsx', type:'array'});
    return excelBuffer;
  }

  function handleDownload(data){
    const excelBuffer=jsonToExcel(data);
    const blob=new Blob([excelBuffer], {type:'application/octet-stream'});
    const fileName="student.xlsx";
    const link=document.createElement('a');
    link.href=window.URL.createObjectURL(blob);
    link.download=fileName;
    link.click();
  }


  function handleStatDisplay(){
    setIsShown(!isShown);
  }

  return (
    <div className="MainBlock">
      <div className="sortSearch">
      <div className="sortMenu">
            <button onClick={all}>All</button>
            <button onClick={pass}>Passed</button>
            <button onClick={fail}>Failed</button>
            {
              // Conditional rendering
              flag=='asc'? <button id="sort" onClick={sortAlpha}>A-Z</button> : <button id="sort" onClick={sortAlpha}>Z-A</button>
            }
            {
              gradeFlag=='asc'? <button id="sortByNum" onClick={sortNumeric}>1-9</button> : <button id="sortByNum" onClick={sortNumeric}>9-1</button>
            }
            </div>
            <div className="search">
                <input type="text" name="searchByName" id="search" value={inputValue} placeholder="Search by Name" onChange={handleInput}/>
            </div>
            <div className="downloadFile">
                <button onClick={()=>handleDownload(selected)}>Download</button>
                <img src={download} alt="download icon" height="20" width="20"/>
            </div>
      </div>
      <Table data={selected}/>
      <div className="StatWrapper">
        <button className="StaticsBtn" onClick={handleStatDisplay}>
          {isShown ? 'Hide Statics' : 'Show Statics'}
        </button>
      </div>
      {isShown && (
        <div className="StaticsContainer">
          <div className="TableDiv">
            <StatTable data={buttonData}/>
          </div>
          <div className="BarChartDiv">
            <BarChart barData1={stuList.length} barData2={passCount} barData3={failCount}/>
          </div>

        </div>
      )}
    </div>
  );
};
export default MainBlock;
