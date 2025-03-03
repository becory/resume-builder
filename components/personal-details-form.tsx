"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { ResumeData } from "@/hooks/use-resume-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import UrlsForm from "./urls-form";

interface PersonalDetailsFormProps {
  personalDetails: ResumeData["personalDetails"];
  updatePersonalDetails: (
    personalDetails: ResumeData["personalDetails"]
  ) => void;
  onNext: () => void;
}

export default function PersonalDetailsForm({
  personalDetails,
  updatePersonalDetails,
  onNext,
}: PersonalDetailsFormProps) {
  const [formData, setFormData] = useState(personalDetails);

  useEffect(() => {
    setFormData(personalDetails);
  }, [personalDetails]);

  const updatedUrls = (value: ResumeData["personalDetails"]["urls"]) => {
    setFormData((prev) => ({
      ...prev,
      urls: value,
    }));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name?: string; value: string } }
  ) => {
    if (!e.target.name) {
      return;
    }

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalDetails(formData);
    onNext();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            <div>
              <UrlsForm urls={formData.urls} updateUrls={updatedUrls} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="San Francisco, CA"
              />
            </div>

            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Briefly introduce yourself and highlight your key qualifications and career objectives."
                rows={4}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
