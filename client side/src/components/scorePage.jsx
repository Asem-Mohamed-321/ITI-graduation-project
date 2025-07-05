import ScoreList from "./scoreList";
import ScorePercentagePanel from "./scorePrecentagePanel";
export default function ScorePage() {
  return (
    <>
    <div className="flex flex-col sm:flex-row justify-center align-middle gap-3 sm:gap-3 ">
        <div className="w-3/4 sm:w-1/4 mx-auto"> {/*left side (score side)*/}
            <ScorePercentagePanel percentage={65}/>
        </div>
        <div className="border-2 border-gray-300 w-11/12 sm:w-2/3 bg-white mt-2 sm:mt-5 mr-5  py-3 rounded-lg"> {/*right side (comments and advices)*/}
                    <ScoreList title="Your Score" comments={["Essential sections : Contact info , Summary , Experience ,Skills, Projects.", "Score deducattion from missing sections", ]} icon="images/add_notes.svg" />
                    <ScoreList title="Your Score" comments={["Essential sections : Contact info , Summary , Experience ,Skills, Projects.", "Score deducattion from missing sections", ]} icon="images/add_notes.svg" />
                    <ScoreList title="Your Score" comments={["Essential sections : Contact info , Summary , Experience ,Skills, Projects.", "Score deducattion from missing sections", ]} icon="images/add_notes.svg" />
        </div>

    </div>
    </>
  );
}
