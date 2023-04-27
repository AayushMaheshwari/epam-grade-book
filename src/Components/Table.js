import { useState } from 'react';
import '../styles/Header.css'
import DetailBox from './DetailBox';
const Table = (props) => {

  const {data} = props;

  let studentObject={
    "id":"",
    "name":"",
    "ticketNo":"",
    "ticketTopic":"",
    "examGrade":"",
    "ratingGrade":"",
    "finalGrade":"",
    "status":"",
    "comment":""
  }

  const [model,setModel]=useState(studentObject);
  const [isOpen,setIsOpen]=useState(false);

  function modelDetail(studentId){
    data.forEach(student => {
      if(student.id===studentId){
        studentObject.id=student.id;
        studentObject.name=student.name;
        studentObject.ticketNo=student.ticketNumber;
        studentObject.ticketTopic=student.ticketTopic;
        studentObject.examGrade=student.examGrade;
        studentObject.ratingGrade=student.ratingGrade;
        studentObject.finalGrade=student.finalGrade;
        studentObject.status=student.status;
        studentObject.comment=student.comments;

        setModel(studentObject);
        setIsOpen(true);
      }
    });
  }

  function closeDetails(){
    setIsOpen(!isOpen);
  }

  return (
      <div className="studentTable">
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Ticket's No.</th>
              <th>Rating Grade</th>
              <th>Exam Grade</th>
              <th>Final Grade</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.ticketNumber}</td>
                  <td>{student.ratingGrade}</td>
                  <td>{student.examGrade}</td>
                  <td>{student.finalGrade}</td>
                  <td>{student.status}</td>
                  <td>
                    <button className='detailButton' onClick={()=>{modelDetail(student.id)}}>Details</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {
          isOpen && (
            <DetailBox data={model} show={isOpen} onClose={closeDetails}/>
          )
        }
      </div>
  );
};
export default Table;
