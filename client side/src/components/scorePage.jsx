import ScoreList from "./scoreList";
import ScorePercentagePanel from "./scorePrecentagePanel";
export default function ScorePage({ cvScore }) {
  const sectionGroups = {
    Profile: ["contact_information", "professional_summary", "languages"],
    Education: ["education", "certifications"],
    Experience: ["experience", "projects"],
    "Skills & Format": ["skills", "formatting"],
  };

  const groupedScores = {
    Profile:
      cvScore.breakdown?.contact_information +
      cvScore.breakdown?.professional_summary +
      cvScore.breakdown?.languages,
    Education: cvScore.breakdown?.education + cvScore.breakdown?.certifications,
    Experience: cvScore.breakdown?.experience + cvScore.breakdown?.projects,
    "Skills & Format":
      cvScore.breakdown?.skills + cvScore.breakdown?.formatting,
  };

  function extractFeedback(sectionData) {
    const comments = [];

    if (sectionData.feedback) {
      const { strengths, weaknesses, suggestions, improvement_opportunities } =
        sectionData.feedback;
      if (Array.isArray(strengths)) comments.push(...strengths);
      if (Array.isArray(weaknesses)) comments.push(...weaknesses);
      if (Array.isArray(suggestions)) comments.push(...suggestions);
      if (Array.isArray(improvement_opportunities))
        comments.push(...improvement_opportunities);
    }

    if (sectionData.issues) comments.push(...sectionData.issues);
    if (sectionData.suggestions) comments.push(...sectionData.suggestions);

    return comments;
  }

  console.log(cvScore);
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center align-middle gap-3 sm:gap-3 ">
        <div className="w-3/4 sm:w-1/4 mx-auto">
          {" "}
          {/*left side (score side)*/}
          <ScorePercentagePanel
            percentage={cvScore.overall_score}
            scores={cvScore.breakdown}
            groupedScores={groupedScores}
          />
        </div>
        <div className="border-2 border-gray-300 w-11/12 sm:w-2/3 bg-white mt-2 sm:mt-5 mr-5  py-3 rounded-lg">
          {Object.entries(sectionGroups).map(([groupName, sectionKeys]) => {
            const comments = sectionKeys.flatMap((key) =>
              extractFeedback(cvScore.sections[key] || {})
            );

            return (
              <ScoreList
                key={groupName}
                icon={"images/add_notes.svg"}
                title={groupName}
                comments={comments}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
