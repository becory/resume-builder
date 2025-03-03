"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { ResumeData } from "@/hooks/use-resume-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ExperienceFormProps {
  experience: ResumeData["experience"];
  updateExperience: (experience: ResumeData["experience"]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ExperienceForm({
  experience,
  updateExperience,
  onNext,
  onPrevious,
}: ExperienceFormProps) {
  const [formData, setFormData] = useState(experience);
  const [expanded, setExpanded] = useState<string | null>(
    formData.length > 0 ? formData[0].id : null
  );

  useEffect(() => {
    setFormData(experience);
  }, [experience]);

  const addExperience = () => {
    const newExperience = {
      id: uuidv4(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setFormData([...formData, newExperience]);
    setExpanded(newExperience.id);
  };

  const removeExperience = (id: string) => {
    const updatedExperience = formData.filter((exp) => exp.id !== id);
    setFormData(updatedExperience);
    if (expanded === id && updatedExperience.length > 0) {
      setExpanded(updatedExperience[0].id);
    } else if (updatedExperience.length === 0) {
      setExpanded(null);
    }
  };

  const handleChange = (id: string, field: string, value: string | boolean) => {
    setFormData((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleToggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateExperience(formData);
    onNext();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {formData.length > 0 ? (
              formData.map((exp) => (
                <div key={exp.id} className="border rounded-md p-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleToggleExpand(exp.id)}
                  >
                    <h3 className="font-medium">
                      {exp.title || exp.company
                        ? `${exp.title} at ${exp.company}`
                        : "New Experience"}
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  {expanded === exp.id && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor={`title-${exp.id}`}>Job Title</Label>
                        <Input
                          id={`title-${exp.id}`}
                          value={exp.title}
                          onChange={(e) =>
                            handleChange(exp.id, "title", e.target.value)
                          }
                          placeholder="Senior Developer"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          value={exp.company}
                          onChange={(e) =>
                            handleChange(exp.id, "company", e.target.value)
                          }
                          placeholder="Acme Inc."
                        />
                      </div>

                      <div>
                        <Label htmlFor={`location-${exp.id}`}>Location</Label>
                        <Input
                          id={`location-${exp.id}`}
                          value={exp.location}
                          onChange={(e) =>
                            handleChange(exp.id, "location", e.target.value)
                          }
                          placeholder="San Francisco, CA"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`startDate-${exp.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`startDate-${exp.id}`}
                            type="month"
                            value={exp.startDate}
                            onChange={(e) =>
                              handleChange(exp.id, "startDate", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${exp.id}`}
                            type="month"
                            value={exp.endDate}
                            onChange={(e) =>
                              handleChange(exp.id, "endDate", e.target.value)
                            }
                            disabled={exp.current}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onCheckedChange={(checked) =>
                            handleChange(exp.id, "current", Boolean(checked))
                          }
                        />
                        <label
                          htmlFor={`current-${exp.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I currently work here
                        </label>
                      </div>

                      <div>
                        <Label htmlFor={`description-${exp.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`description-${exp.id}`}
                          value={exp.description}
                          onChange={(e) =>
                            handleChange(exp.id, "description", e.target.value)
                          }
                          placeholder="Describe your responsibilities and achievements"
                          rows={4}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center p-4 border border-dashed rounded-md">
                <p className="text-muted-foreground mb-4">
                  No work experience added yet
                </p>
                <Button type="button" variant="outline" onClick={addExperience}>
                  Add Your First Job
                </Button>
              </div>
            )}

            {formData.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={addExperience}
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Another Job
              </Button>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
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
