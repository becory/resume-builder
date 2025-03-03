"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import type { ResumeData } from "@/hooks/use-resume-data";

interface EducationFormProps {
  education: ResumeData["education"];
  updateEducation: (education: ResumeData["education"]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function EducationForm({
  education,
  updateEducation,
  onNext,
  onPrevious,
}: EducationFormProps) {
  const [formData, setFormData] = useState(education);
  const [expanded, setExpanded] = useState<string | null>(
    formData.length > 0 ? formData[0].id : null
  );

  useEffect(() => {
    setFormData(education);
  }, []);

  const addEducation = () => {
    const newEducation = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setFormData([...formData, newEducation]);
    setExpanded(newEducation.id);
  };

  const removeEducation = (id: string) => {
    const updatedEducation = formData.filter((edu) => edu.id !== id);
    setFormData(updatedEducation);
    if (expanded === id && updatedEducation.length > 0) {
      setExpanded(updatedEducation[0].id);
    } else if (updatedEducation.length === 0) {
      setExpanded(null);
    }
  };

  const handleChange = (id: string, field: string, value: string | boolean) => {
    setFormData((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const handleToggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEducation(formData);
    onNext();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {formData.length > 0 ? (
              formData.map((edu) => (
                <div key={edu.id} className="border rounded-md p-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleToggleExpand(edu.id)}
                  >
                    <h3 className="font-medium">
                      {edu.degree || edu.institution
                        ? `${edu.degree} at ${edu.institution}`
                        : "New Education"}
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEducation(edu.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  {expanded === edu.id && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor={`institution-${edu.id}`}>
                          Institution
                        </Label>
                        <Input
                          id={`institution-${edu.id}`}
                          value={edu.institution}
                          onChange={(e) =>
                            handleChange(edu.id, "institution", e.target.value)
                          }
                          placeholder="University of California"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                          <Input
                            id={`degree-${edu.id}`}
                            value={edu.degree}
                            onChange={(e) =>
                              handleChange(edu.id, "degree", e.target.value)
                            }
                            placeholder="Bachelor of Science"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`field-${edu.id}`}>
                            Field of Study
                          </Label>
                          <Input
                            id={`field-${edu.id}`}
                            value={edu.field}
                            onChange={(e) =>
                              handleChange(edu.id, "field", e.target.value)
                            }
                            placeholder="Computer Science"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`startDate-${edu.id}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`startDate-${edu.id}`}
                            type="month"
                            value={edu.startDate}
                            onChange={(e) =>
                              handleChange(edu.id, "startDate", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${edu.id}`}
                            type="month"
                            value={edu.endDate}
                            onChange={(e) =>
                              handleChange(edu.id, "endDate", e.target.value)
                            }
                            disabled={edu.current}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-${edu.id}`}
                          checked={edu.current}
                          onCheckedChange={(checked) =>
                            handleChange(edu.id, "current", Boolean(checked))
                          }
                        />
                        <label
                          htmlFor={`current-${edu.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I am currently studying here
                        </label>
                      </div>

                      <div>
                        <Label htmlFor={`description-${edu.id}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`description-${edu.id}`}
                          value={edu.description}
                          onChange={(e) =>
                            handleChange(edu.id, "description", e.target.value)
                          }
                          placeholder="Notable achievements, coursework, or activities"
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
                  No education entries added yet
                </p>
                <Button type="button" variant="outline" onClick={addEducation}>
                  Add Your First Education
                </Button>
              </div>
            )}

            {formData.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={addEducation}
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Another Education
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
