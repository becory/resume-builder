import ResumeBuilder from "@/components/resume-builder";

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4">
      <div className="">
        <h1 className="text-3xl font-bold mb-8">Resume Builder</h1>
      </div>
      <ResumeBuilder />
    </main>
  );
}
