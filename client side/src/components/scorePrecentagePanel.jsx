import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import YellowButton from "./YellowButton";
import { useNavigate } from "react-router";

export default function ScorePercentagePanel({
  percentage,
  scores,
  groupedScores,
}) {
    const navigate = useNavigate()
  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-1 lg:p-4 mx-1 my-5 lg:mr-5 md:mr-1">
      <h1 className="text-center font-bold">Your Score</h1>
      <div className="w-1/3 min-w-20 mx-auto my-5">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#000",
            pathTransitionDuration: 1,
          })}
        />
      </div>
      <hr class="h-px w-10/12 mx-auto my-5 bg-gray-300 border-0 dark:bg-gray-700"></hr>
      <div className="mt-5 mx-1 xl:mx-5 lg:mx-3 md:mx-1 ">
        {Object.keys(groupedScores).map((score) => (
          <div
            key={score}
            className="flex justify-between my-6 text-xs lg:text-base"
          >
            <p>{score}:</p>
            <p>{groupedScores[score]}%</p>
          </div>
        ))}
      </div>
      <hr class="h-px w-10/12 mx-auto my-5 bg-gray-300 border-0 dark:bg-gray-700"></hr>
      <div className="flex justify-center">
        <YellowButton onClick={()=>navigate('/tips')} className="block w-3/4 mb-2 py-2 px-1 text-xs md:text-sm animate__animated animate__pulse animate__infinite cursor-pointer">
          Learn how to make your cv better
        </YellowButton>
      </div>
      <div className="flex justify-center">
        <YellowButton onClick={()=>navigate('/upload-cv')} className="block w-3/4 mb-2 py-2 px-1 text-xs md:text-sm animate__animated animate__pulse animate__infinite cursor-pointer">
          scan another resume
        </YellowButton>
      </div>
    </div>
  );
}
