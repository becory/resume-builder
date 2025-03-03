"use client";

import ResumeBuilder from "@/components/resume-builder";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ResumeData } from "@/hooks/use-resume-data";
import { useRouter } from "next/navigation";

export default function Me() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/");
  };

  const resumeData: ResumeData = {
    certificates: [
      {
        id: "8924dfea-a5c4-45b9-893a-b36378144681",
        name: "AWS Certified Solutions Architect – Associate",
        organization: "Amazon Web Services (AWS)",
        issueDate: "2024-12",
        expireDate: "2027-12",
        url: "https://www.credly.com/badges/6d5e70df-1d29-495b-8015-d6d040b97eb4/linked_in_profile",
      },
    ],
    personalDetails: {
      fullName: "Wayne Huang",
      title: "Fullstack Engineer",
      email: "ssuyuan.huang@gmail.com",
      urls: [
        { type: "github", url: "https://github.com/becory" },
        { type: "linkedin", url: "https://www.linkedin.com/in/ssuyuan-huang/" },
      ],
      phone: "0422312388",
      location: "Sydney, NSW",
      summary:
        "<p>A versatile Software Engineer specializing in full-stack development, cloud optimization, and automation. Proficient in TypeScript, JavaScript, React, Vue.js, Python (Django), and DevOps, with expertise in enterprise automation, predictive modeling, and chatbot development. Passionate about building scalable, high-performance solutions that enhance efficiency and user experience.</p>",
    },
    experience: [
      {
        id: "34f1a00e-9df4-4b78-89ef-5ab8eb3122f3",
        title: "Freelance Software Engineer",
        company: "Trend Education Foundation",
        location: "",
        startDate: "2024-04",
        endDate: "",
        current: true,
        description:
          "<ul><li><p>Managed and expanded an online video streaming platform built with React and Python Django, serving 9,000+ users and generating monthly transactions exceeding NT$30,000, ensuring consistent growth and operational stability.</p></li><li><p>Developed a shopping cart feature enabling users to purchase multiple course access rights in a single transaction, streamlining the checkout process and improving user experience.</p></li><li><p>Implemented a flexible discount system, allowing backend administrators to customize promotions, enhancing business adaptability and boosting promotional efficiency.</p></li><li><p>Integrated payment processing and e-invoicing in compliance with Taiwan's tax regulations, automating legal compliance and improving transaction accuracy.</p></li><li><p>Enhanced platform scalability and performance by leveraging AWS ECS for container orchestration, reducing downtime and optimizing resource utilization.</p></li></ul>",
      },
      {
        id: "2ea5a0ac-d8f0-4733-bfb6-2c4f6dccb767",
        title: "Fullstack Engineer",
        company: "Trend Micro",
        location: "",
        startDate: "2021-12",
        endDate: "2024-02",
        current: false,
        description:
          "<ul><li><p>Engineered a React-based monorepo frontend with reusable components, integrating Cypress for E2E testing and optimizing GitHub Actions, resulting in a 40% reduction in CI/CD build times.</p></li><li><p>Developed an advanced React form builder, enhancing user experience and improving data collection efficiency.</p></li><li><p>Played a key role in designing and developing an internal Help Desk system using React for the frontend and Python Django for the backend, featuring an internal search chatbot, case management, and automation, set to replace an existing system that handles 4000+ monthly cases, significantly improving support operations.</p></li><li><p>Created a React frontend for an MS Teams-based expense management system, processing 1000+ monthly cases and streamlining financial operations across Trend Europe’s 21 business units. The system was built using Flask for the backend.</p></li><li><p>Managed and expanded an online video streaming platform built with React and Python Django, serving 9000+ users and handling monthly transactions exceeding NT$30,000, ensuring stable growth and performance.</p></li><li><p>Developed an Atlassian Confluence Macro using React and Node.js Express, enabling efficient file linking and previewing from internal cloud drives, reducing wiki storage costs and enhancing information security.</p></li><li><p>Designed and implemented a CI/CD GitHub Actions workflow for iOS app deployment on a self-hosted virtual machine runner.</p></li></ul>",
      },
      {
        id: "17848330-d712-4d1d-8b10-4c17dd217720",
        title: "Frontend Engineer",
        company: "ESSENCES INFORMATION",
        location: "",
        startDate: "2020-11",
        endDate: "2021-11",
        current: false,
        description:
          "<p>Vue.js Front-End Engineer</p><ol><li><p>iServCloud (Multi-Cloud Management Platform):</p><ul><li><p>Billing Dynamic Dashboard: Created an interactive dashboard with dynamic charts for visualizing usage and billing data.</p></li><li><p>Approval Interaction Redesign: Revamped the approval process for improved user experience.</p></li><li><p>Dynamic Table Filter: Implemented advanced filtering options for enhanced data navigation.</p></li></ul></li><li><p>III DevOps (Open Source DevOps Integration Platform):</p><ul><li><p>Dashboard Development: Built a dashboard with a focus on personal issue tracking.</p></li><li><p>Issue Kanban Board: Developed a Kanban board for issues with dimensions switching, and drag-and-drop functionality for quick issue management.</p></li><li><p>WBS Board: Created a Work Breakdown Structure board for real-time issue addition and inline editing, facilitating rapid task decomposition.</p></li><li><p>Issue Relation and Traceability Matrix Charts: Developed charts to clearly trace issue processes and relationships.</p></li></ul></li></ol>",
      },
      {
        id: "6b8bfcfe-f760-4344-b654-2e612d04992f",
        title: " Fullstack Engineer",
        company: "Uwin Investment Data",
        location: "",
        startDate: "2018-09",
        endDate: "2019-10",
        current: false,
        description:
          "<p>Python Django, Vue.js</p><ul><li><p>Stock Historical Database Construction: Built a comprehensive database to store and manage historical stock data, facilitating efficient data retrieval and analysis.</p></li><li><p>Predictive Modeling: Developed predictive models to forecast stock market trends, leveraging advanced analytical techniques to enhance investment decision-making.</p></li><li><p>Investment Information System Development: Engineered a robust investment information system using Python Django and Vue.js, providing users with critical insights and analytics for informed investment strategies.</p></li><li><p>Frontend and Backend System Development: Created and integrated both frontend and backend systems, ensuring seamless operation and user interaction within the investment platform.</p></li></ul>",
      },
    ],
    education: [
      {
        id: "990a3be3-3045-4d65-8a35-60d0862d84db",
        institution: "Fu Jen Catholic University",
        degree: "Master of Science in Information Management",
        field: "Department of Information Management",
        startDate: "2017-09",
        endDate: "2019-06",
        current: false,
        description:
          "<ul><li><p>Grade: 3.9/4, 92.05/100</p></li><li><p>Thesis: Data Science for Patient Inflow Predictions in Emergency Department</p></li></ul>",
      },
      {
        id: "fc1914c7-172e-4af0-9ac4-b4a290144994",
        institution: "National Dong Hwa University",
        degree: "Bachelor of Arts",
        field: "Department of Indigenous Language and Communication",
        startDate: "2014-09",
        endDate: "2017-06",
        current: false,
        description:
          "<ul><li><p>Grade: 3.87/ 4.5</p></li><li><p>Minor Major: Department of Information Management</p></li></ul>",
      },
    ],
    skills: [
      "AWS",
      "React.js",
      "Python",
      "Django",
      "TypeScript",
      "JavaScript",
      "PostgreSQL",
      "DevOps",
      "Github action",
    ],
    highlights:
      "TypeScript|JavaScript|React|Vue.js|Python|Django|DevOps|React|GitHub|E2E testing",
  };

  const setResumeData = (
    key: keyof ResumeData,
    value: ResumeData[keyof ResumeData]
  ) => {
    return false;
  };
  return (
    <main className="container mx-auto py-6 px-4">
      <div className="font-[Bitter] flex flex-row justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-8">Resume Builder</h1>
        </div>
        <div className="text-right flex text-gray-600 flex-nowrap space-x-2">
          <Button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400"
            onClick={handleCreate}
          >
            <PlusCircle className="w-4 h-4" />
            Create your own resume
          </Button>
        </div>
      </div>
      <ResumeBuilder
        resumeData={resumeData}
        setResumeData={setResumeData}
        disabled
      />
    </main>
  );
}
