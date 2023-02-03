import photo from "./hehe.png";
import "./main.css";
import React from "react";

// function App() {
//   return (
//     <div className="main-wrap">
//       <span className="obich">
//         Obicham te krisi!
//       </span>
//       <div className="img">
//         <img src={photo} alt="us"></img>
//       </div>
//     </div>
//   );
// }

// export default App;

function calculateTimeLeft() {
    const year = new Date().getFullYear();
    const difference = +new Date(`${year}-12-31`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
}

export default function App() {
    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    React.useEffect(() => {
        const id = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        return (
            <React.Fragment>
                <span>
                    {timeLeft[interval]} {interval}{" "}
                </span>
            </React.Fragment>
        );
    });

    return (
        <div>
            <div className="main-wrap">
                <span className="obich">Obicham te krisi!</span>
                <div className="img">
                    <img src={photo} alt="us"></img>
                </div>
                <div className="wrap">
                    <div className="dokato">
                        Ostavashto vreme do godishninata ni:
                    </div>
                    <div className="vreme">
                        {timerComponents.length ? (
                            timerComponents
                        ) : (
                            <span>Time's up!</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
