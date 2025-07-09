import ScoreList from "./scoreList";
import ScorePercentagePanel from "./scorePrecentagePanel";
import { useState } from "react";
export default function ScorePage({cvScore}) {
  const[cvScore2, setCvScore2] = useState({
    "overall_score": 75,
    "breakdown": {
        "contact_information": 10,
        "professional_summary": 8,
        "education": 9,
        "experience": 12,
        "skills": 18,
        "projects": 8,
        "certifications": 3,
        "languages": 4,
        "formatting": 3
    },
    "sections": {
        "contact_information": {
            "exists": true,
            "score": 10,
            "feedback": {
                "strengths": [
                    "Includes phone number, email, GitHub, LinkedIn, and location."
                ],
                "weaknesses": [],
                "suggestions": []
            }
        },
        "professional_summary": {
            "exists": true,
            "score": 8,
            "feedback": {
                "strengths": [
                    "Highlights full-stack experience and key technologies.",
                    "Mentions passion for problem-solving and clean code."
                ],
                "weaknesses": [],
                "suggestions": []
            }
        },
        "education": {
            "exists": true,
            "score": 9,
            "feedback": {
                "matched_degrees": [
                    "B.Sc. in Computer Science"
                ],
                "missing_requirements": [],
                "suggestions": []
            }
        },
        "experience": {
            "exists": true,
            "score": 12,
            "feedback": {
                "years_of_experience": "Less than 1 year of directly relevant experience",
                "quantifiable_achievements": [],
                "improvement_opportunities": [
                    "Include specific metrics to demonstrate impact (e.g., \"Improved video generation speed by X%\")."
                ]
            }
        },
        "skills": {
            "exists": true,
            "score": 18,
            "matched_hard_skills": [
                "HTML",
                "CSS",
                "JavaScript",
                "Angular",
                "React",
                "Node.js",
                "Python",
                "MySQL",
                "MongoDB",
                "PHP",
                "Java"
            ],
            "missing_hard_skills": [
                ".Net",
                "Ruby"
            ],
            "matched_soft_skills": [
                "Problem-solving",
                "Teamwork",
                "Time management",
                "Adaptability",
                "Cross functional collaboration"
            ],
            "missing_soft_skills": [
                "Organizational skills",
                "Project management skills",
                "Attention to detail",
                "Verbal Communication"
            ],
            "suggestions": [
                "Explicitly mention verbal communication skills."
            ]
        },
        "projects": {
            "exists": true,
            "score": 8,
            "feedback": {
                "notable_projects": [
                    "VIDYOZA – AI-Powered Video Generation Platform",
                    "E-Commerce Web App",
                    "Social Media Platform",
                    "Chat Application",
                    "Bank Account System",
                    "Tic-Tac-Toe Game"
                ],
                "technologies_used": [
                    "Django",
                    "Angular",
                    "TypeScript",
                    "SCSS",
                    "JSON Server",
                    "React",
                    "Node.js",
                    "Express",
                    "MySQL",
                    "Java",
                    "JavaFX"
                ],
                "suggestions": [
                    "Quantify the impact of each project (e.g., number of users, performance improvements)."
                ]
            }
        },
        "certifications": {
            "exists": true,
            "score": 3,
            "feedback": {
                "matched_certs": [],
                "missing_relevant_certs": [],
                "suggestions": [
                    "List certifications related to full-stack development."
                ]
            }
        },
        "languages": {
            "exists": true,
            "score": 4,
            "feedback": {
                "matched_languages": [
                    "English",
                    "Arabic"
                ],
                "suggestions": []
            }
        },
        "formatting": {
            "score": 3,
            "issues": [
                "Inconsistent use of spacing and alignment.",
                "May not be ATS-friendly."
            ],
            "suggestions": [
                "Use a clean and consistent format with clear headings and bullet points.",
                "Consider using a professional resume template."
            ]
        }
    },
    "final_suggestions": [
        "Tailor the summary to the job title",
        "Add metrics in the experience section",
        "Improve formatting for ATS readability"
    ]
});
const sectionGroups = {
  Profile: ["contact_information", "professional_summary", "languages"],
  Education: ["education", "certifications"],
  Experience: ["experience", "projects"],
  "Skills & Format": ["skills", "formatting"]
};

const groupedScores = {
  Profile: cvScore2.breakdown.contact_information + cvScore2.breakdown.professional_summary + cvScore2.breakdown.languages,
  Education: cvScore2.breakdown.education + cvScore2.breakdown.certifications,
  Experience: cvScore2.breakdown.experience + cvScore2.breakdown.projects,
  "Skills & Format": cvScore2.breakdown.skills + cvScore2.breakdown.formatting,
};

function extractFeedback(sectionData) {
  const comments = [];

  if (sectionData.feedback) {
    const { strengths, weaknesses, suggestions, improvement_opportunities } = sectionData.feedback;
    if (Array.isArray(strengths)) comments.push(...strengths);
    if (Array.isArray(weaknesses)) comments.push(...weaknesses);
    if (Array.isArray(suggestions)) comments.push(...suggestions);
    if (Array.isArray(improvement_opportunities)) comments.push(...improvement_opportunities);
  }

  if (sectionData.issues) comments.push(...sectionData.issues);
  if (sectionData.suggestions) comments.push(...sectionData.suggestions);

  return comments;
}


  console.log(cvScore2)
  return (
    <>
    <div className="flex flex-col sm:flex-row justify-center align-middle gap-3 sm:gap-3 ">
        <div className="w-3/4 sm:w-1/4 mx-auto"> {/*left side (score side)*/}
            <ScorePercentagePanel percentage={cvScore2.overall_score} scores={cvScore2.breakdown}  groupedScores={groupedScores}/>
        </div>
        
        {/* <div className="border-2 border-gray-300 w-11/12 sm:w-2/3 bg-white mt-2 sm:mt-5 mr-5  py-3 rounded-lg"> {/*right side (comments and advices)
        }
                    <ScoreList title="Your Score" comments={["Essential sections : Contact info , Summary , Experience ,Skills, Projects.", "Score deducattion from missing sections", ]} icon="images/add_notes.svg" />
                    <ScoreList title="Your Score" comments={["Essential sections : Contact info , Summary , Experience ,Skills, Projects.", "Score deducattion from missing sections", ]} icon="images/add_notes.svg" />
                    <ScoreList title="Your Score" comments={["Essential sections : Contact info , Summary , Experience ,Skills, Projects.", "Score deducattion from missing sections", ]} icon="images/add_notes.svg" />
        </div> */}
        <div className="border-2 border-gray-300 w-11/12 sm:w-2/3 bg-white mt-2 sm:mt-5 mr-5  py-3 rounded-lg">
        {Object.entries(sectionGroups).map(([groupName, sectionKeys]) => {
  const comments = sectionKeys.flatMap((key) =>
    extractFeedback(cvScore2.sections[key] || {})
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
