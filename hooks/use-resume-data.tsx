import { useEffect, useRef, useSyncExternalStore } from "react";

export type ResumeData = {
  personalDetails: {
    fullName: string;
    title: string;
    email: string;
    urls: {
      type: string;
      url: string;
    }[];
    phone: string;
    location: string;
    summary: string;
  };
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: string[];
  certificates: {
    id: string;
    organization: string;
    name: string;
    issueDate: string;
    expireDate: string;
    url: string;
  }[];
  highlights: string;
};

const defaultResumeData: ResumeData = {
  personalDetails: {
    fullName: "",
    title: "",
    email: "",
    urls: [],
    phone: "",
    location: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  certificates: [],
  highlights: "",
};

function subscribe(callback: () => void) {
  window.addEventListener("resume-storage-event", callback);
  return () => {
    window.removeEventListener("resume-storage-event", callback);
  };
}

//Return the current value from the browser API
function getSnapshot() {
  return localStorage.getItem("resume-data");
}

export const useResumeData = () => {
  const item = useSyncExternalStore(subscribe, getSnapshot, () => undefined);
  // Parse the json string
  // You should probably further narrow down the JSON.parse type because JSON.parse returns any
  const value: ResumeData =
    typeof item === "string" ? JSON.parse(item) : defaultResumeData;
  const prevItemRef = useRef(value);

  useEffect(() => {
    prevItemRef.current = value;
  }, [value]);

  const setResumeData = (
    key: keyof ResumeData,
    newValue: ResumeData[keyof ResumeData]
  ) => {
    localStorage.setItem(
      "resume-data",
      JSON.stringify({ ...value, ...{ [key]: newValue } })
    );
  };

  return {
    resumeData: value,
    setResumeData,
    prevResumeData: prevItemRef.current,
  };
};
