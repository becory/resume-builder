import type { ResumeData } from "@/hooks/use-resume-data";
import { formatDate } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faLink,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { RegexHighlight } from "./ui/regex-highlight";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const {
    personalDetails,
    experience,
    education,
    skills,
    certificates,
    highlights,
  } = resumeData;

  return (
    <div className="resume-preview text-sm space-y-6 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="font-[Bitter] space-y-1">
        <h1 className="text-4xl font-black">
          {personalDetails.fullName || "Your Name"}
        </h1>
        {personalDetails.title && (
          <p className="text-xl font-bold text-gray-500">
            {personalDetails.title}
          </p>
        )}

        <div className="flex font-sans flex-wrap gap-x-4 text-sm text-gray-600">
          {personalDetails.email && (
            <span className="space-x-1">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>{personalDetails.email}</span>
            </span>
          )}
          {personalDetails.phone && (
            <span className="space-x-1">
              <FontAwesomeIcon icon={faPhone} />
              <span>{personalDetails.phone}</span>
            </span>
          )}
          {personalDetails.urls &&
            personalDetails.urls.map((url) => (
              <span className="space-x-1" key={url.url}>
                <FontAwesomeIcon
                  icon={
                    url.type === "github"
                      ? faGithub
                      : url.type === "linkedin"
                      ? faLinkedin
                      : faLink
                  }
                />
                <a href={url.url} target="_blank" rel="noreferrer">
                  {url.url}
                </a>
              </span>
            ))}
          {personalDetails.location && (
            <span className="space-x-1">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{personalDetails.location}</span>
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row w-full space-x-8">
        <div className="w-3/4 flex-auto space-y-6">
          {/* Summary */}
          {personalDetails.summary && (
            <div>
              <h2 className="text-2xl font-[Bitter] font-bold uppercase border-b-4 border-b-black mb-2">
                Summary
              </h2>
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: RegexHighlight(highlights, personalDetails.summary),
                }}
              />
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-2xl font-[Bitter] font-bold uppercase border-b-4 border-b-black mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="font-[Bitter] flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p>
                          <span className="text-gray-400 font-sans font-semibold">
                            {exp.company}
                          </span>
                          {exp.location ? `, ${exp.location}` : ""}
                        </p>
                      </div>
                      <div className="text-right text-gray-600 whitespace-nowrap">
                        {exp.startDate && (
                          <p>
                            {formatDate(exp.startDate)} -{" "}
                            {exp.current ? "Present" : formatDate(exp.endDate)}
                          </p>
                        )}
                      </div>
                    </div>
                    {exp.description && (
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: RegexHighlight(highlights, exp.description),
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-1/4 flex-none space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-[Bitter] font-bold uppercase border-b-4 border-b-black mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Certificate */}
          {certificates.length > 0 && (
            <div>
              <h2 className="text-2xl font-[Bitter] font-bold uppercase border-b-4 border-b-black mb-3">
                Certificate
              </h2>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{cert.name}</h3>
                        <p>{cert.organization}</p>
                      </div>
                    </div>
                    <div className="text-gray-600 whitespace-nowrap">
                      {cert.issueDate && (
                        <p>
                          Issued: {formatDate(cert.issueDate)}
                          <br />
                          Expires: {formatDate(cert.expireDate)}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="space-x-1" key={cert.url}>
                          <FontAwesomeIcon icon={faLink} />
                          <a href={cert.url} target="_blank" rel="noreferrer">
                            {cert.url}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-2xl font-[Bitter] font-bold uppercase border-b-4 border-b-black mb-3">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="text-gray-600 whitespace-nowrap">
                      {edu.startDate && (
                        <p>
                          {formatDate(edu.startDate)} -{" "}
                          {edu.current ? "Present" : formatDate(edu.endDate)}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">
                          {edu.degree}
                          {edu.field ? `, ${edu.field}` : ""}
                        </h3>
                        <p>{edu.institution}</p>
                      </div>
                    </div>
                    {edu.description && (
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: RegexHighlight(highlights, edu.description),
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
