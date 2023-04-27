import "../styles/Header.css";
const DetailBox = (props) => {
  const { data, show, onClose } = props;

  return (
    <div className={`modal ${props.show ? "show-modal" : ""}`}>
      <div className="main-modal">
        <center>
          <div className="mod-header">
            <h2>{data.name}</h2>
            <span className="close-button" onClick={props.onClose}>
              &times;
            </span>
          </div>
        </center>
        <div className="mod-body">
          <div className="mod-body-left">
            <h2>ID </h2>
            <span>{data.id}</span>
            <h2>Exam_Grade </h2>
            <span>{data.examGrade}</span>

          </div>
          <div className="mod-body-center">
          <h2>Ticket_No </h2>
            <span>{data.ticketNo}</span>
            <h2>Rating_Grade </h2>
            <span>{data.ratingGrade}</span>
          </div>
          <div className="mod-body-right">
          <h2>Ticket_Topic </h2>
            <span>{data.ticketTopic}</span>


            <h2>Final_Grade </h2>
            <span>{data.finalGrade}</span>
          </div>
        </div>
        <div className="comments">
        <h2>Status </h2>
            {data.status=="Pass" ? <span style={{color: '#1e8449'}}>{data.status}</span> : <span style={{color: 'red'}}>{data.status}</span>}  
            <hr />
          <h2>Comment </h2>
            <h3>{data.comment}</h3>
          </div>
      </div>
    </div>
  );
};

export default DetailBox;
