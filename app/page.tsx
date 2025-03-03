"use client";

import ResumeBuilder from "@/components/resume-builder";
import { Button } from "@/components/ui/button";
import { Folder, BookOpen } from "lucide-react";
import { useResumeData } from "@/hooks/use-resume-data";
import { useRouter } from "next/navigation";

export default function Home() {
  const { resumeData, setResumeData } = useResumeData();
  const router = useRouter();

  const handleAbout = () => {
    router.push("/me");
  };

  return (
    <main className="container mx-auto py-6 px-4">
      <div className="font-[Bitter] flex flex-row justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-8">Resume Builder</h1>
        </div>
        <div className="text-right flex text-gray-600 flex-nowrap space-x-2">
          <Button className="flex items-center gap-2">
            <Folder className="w-4 h-4" />
            Import/Export
          </Button>
          <Button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400"
            onClick={handleAbout}
          >
            <BookOpen className="w-4 h-4" />
            About Me
          </Button>
        </div>
      </div>
      <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} />
    </main>
  );
}
