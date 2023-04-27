import "../styles/Header.css";
import logo from '../styles/logo.png'
import { useState,useEffect } from "react";
import uni from '../styles/uni.png';
import professor from '../styles/professor.png';
import dep from '../styles/dep.png';
import group from '../styles/group.png';
import title from '../styles/title.png';
import sem from '../styles/sem.png';
import dateIcon from '../styles/calenderIcon.png'
import timeIcon from '../styles/timeIcon.png'
const Header = () => {
  const current = new Date();
  const day = `${current.getDate()}`;
  const month=`${current.getMonth()+1}`;
  const year=`${current.getFullYear()}`;
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
  <div className="MainHeader">
    <div className="Header">
          <img src={logo} alt="GradeBookLogo" />
          <div className="dateTime"> 
            <div className="date">
              <img src={dateIcon} alt="dateIcon" />
              <span>{day}/</span>
              <span>{month}/</span>
              <span>{year}</span>
            </div>
            <div className="timeIcon">
              <img src={timeIcon} alt="timeIcon" />
            </div>
            <h1>{time.toLocaleTimeString()}</h1>
          </div>
    </div>
      <div className="detailHeader">
        <div className="firstDetail">
          <p><img src={uni} alt="uniLogo" /><span>University:</span><span> Lovely Professional University</span></p>
          <p><img src={dep} alt="depLogo" /><span>Department:</span><span> CSE</span></p>
          <p><img src={title} alt="tLogo" /><span>Title:</span><span> Front End Epam</span></p>
        </div>
        <div className="secondDetail">
          <p><img src={professor} alt="pLogo" /><span>Professor's Name:</span><span> Mir Junaid Rasool</span></p>
          <p><img src={group} alt="groupLogo" /><span>Group:</span><span> K19FE</span></p>
          <p><img src={sem} alt="semLogo" /><span>Semester:</span><span> 8th</span></p>
        </div>
      </div>
  </div>
  );
};

export default Header;
