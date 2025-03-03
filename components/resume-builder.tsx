"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetailsForm from "@/components/personal-details-form";
import ExperienceForm from "@/components/experience-form";
import EducationForm from "@/components/education-form";
import SkillsForm from "@/components/skills-form";
import ResumePreview from "@/components/resume-preview";
import { Download } from "lucide-react";
import { generatePDF } from "@/lib/pdf-generator";
import type { ResumeData } from "@/hooks/use-resume-data";

interface ResumeBuilderProps {
  resumeData: ResumeData;
  setResumeData: (
    key: keyof ResumeData,
    value: ResumeData[keyof ResumeData]
  ) => void;
  disabled?: boolean;
}

export default function ResumeBuilder({
  resumeData,
  setResumeData,
  disabled,
}: ResumeBuilderProps) {
  const [activeTab, setActiveTab] = useState("personal");

  const updatePersonalDetails = (
    personalDetails: ResumeData["personalDetails"]
  ) => {
    setResumeData("personalDetails", personalDetails);
  };

  const updateExperience = (experience: ResumeData["experience"]) => {
    setResumeData("experience", experience);
  };

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData("education", education);
  };

  const updateSkills = (skills: ResumeData["skills"]) => {
    setResumeData("skills", skills);
  };

  const updateCertificates = (certificates: ResumeData["certificates"]) => {
    setResumeData("certificates", certificates);
  };

  const updateHighlights = (highlights: ResumeData["highlights"]) => {
    setResumeData("highlights", highlights);
  };

  const handleDownload = () => {
    generatePDF(resumeData);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2">
        <Tabs
          defaultValue="personal"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <PersonalDetailsForm
              personalDetails={resumeData.personalDetails}
              updatePersonalDetails={updatePersonalDetails}
              onNext={() => setActiveTab("experience")}
              disabled={disabled}
            />
          </TabsContent>
          <TabsContent value="experience">
            <ExperienceForm
              experience={resumeData.experience}
              updateExperience={updateExperience}
              onNext={() => setActiveTab("education")}
              onPrevious={() => setActiveTab("personal")}
              disabled={disabled}
            />
          </TabsContent>
          <TabsContent value="education">
            <EducationForm
              education={resumeData.education}
              updateEducation={updateEducation}
              onNext={() => setActiveTab("skills")}
              onPrevious={() => setActiveTab("experience")}
              disabled={disabled}
            />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsForm
              highlights={resumeData.highlights}
              skills={resumeData.skills}
              certificates={resumeData.certificates}
              updateSkills={updateSkills}
              updateHighlights={updateHighlights}
              updateCertificates={updateCertificates}
              onPrevious={() => setActiveTab("education")}
              disabled={disabled}
            />
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Resume Preview</h2>
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
        <div className="bg-white p-6 rounded shadow overflow-hidden">
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
