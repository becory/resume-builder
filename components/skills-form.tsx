"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { ResumeData } from "@/hooks/use-resume-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface SkillsFormProps {
  skills: ResumeData["skills"];
  certificates: ResumeData["certificates"];
  highlights: ResumeData["highlights"];
  updateSkills: (skills: ResumeData["skills"]) => void;
  updateCertificates: (certificates: ResumeData["certificates"]) => void;
  updateHighlights: (highlights: ResumeData["highlights"]) => void;
  onPrevious: () => void;
}

export default function SkillsForm({
  skills,
  certificates,
  highlights,
  updateSkills,
  updateCertificates,
  updateHighlights,
  onPrevious,
}: SkillsFormProps) {
  const [formData, setFormData] = useState(skills);
  const [newSkill, setNewSkill] = useState("");
  const [highlightData, setHighlightData] = useState<string>(highlights);
  const [newHighlights, setNewHighlights] = useState(highlights);
  const [certData, setCertData] = useState(certificates);
  const [expanded, setExpanded] = useState<string | null>(
    certData.length > 0 ? certData[0].id : null
  );

  useEffect(() => {
    setFormData(skills);
  }, [skills]);

  useEffect(() => {
    setHighlightData(highlights);
  }, [highlights]);

  useEffect(() => {
    setCertData(certificates);
  }, [certificates]);

  const addCertificates = () => {
    const newCertificates = {
      id: uuidv4(),
      organization: "",
      name: "",
      issueDate: "",
      expireDate: "",
      url: "",
    };
    setCertData([...certData, newCertificates]);
    setExpanded(newCertificates.id);
  };

  const removeCertificates = (id: string) => {
    const updatedCertificates = certData.filter((cert) => cert.id !== id);
    setCertData(updatedCertificates);
    if (expanded === id && updatedCertificates.length > 0) {
      setExpanded(updatedCertificates[0].id);
    } else if (updatedCertificates.length === 0) {
      setExpanded(null);
    }
  };

  const handleChange = (id: string, field: string, value: string | boolean) => {
    setCertData((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };

  const handleToggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const addHighlight = () => {
    if (newHighlights.trim()) {
      setHighlightData(newHighlights);
      updateHighlights(newHighlights);
    }
  };

  const handleKeyDownHighlight = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHighlight();
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.includes(newSkill.trim())) {
      const updatedSkills = [...formData, newSkill.trim()];
      setFormData(updatedSkills);
      updateSkills(updatedSkills);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    const updatedSkills = formData.filter((s) => s !== skill);
    setFormData(updatedSkills);
    updateSkills(updatedSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill();
    }
    if (newHighlights.trim()) {
      addHighlight();
    }
    updateSkills(formData);
    updateCertificates(certData);
    updateHighlights(newHighlights);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="skill">Add Skills</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., JavaScript, Project Management, Customer Service"
                />
                <Button type="button" onClick={addSkill}>
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to add each skill
              </p>
            </div>

            <div className="min-h-[100px]">
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.length > 0 ? (
                  formData.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="py-1.5">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 -mr-1 text-muted-foreground hover:text-foreground"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))
                ) : (
                  <div className="text-center w-full p-4 border border-dashed rounded-md">
                    <p className="text-muted-foreground text-sm">
                      Add your professional skills to highlight your expertise
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              {certData.length > 0 ? (
                certData.map((cert) => (
                  <div key={cert.id} className="border rounded-md p-4">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => handleToggleExpand(cert.id)}
                    >
                      <h3 className="font-medium">
                        {cert.name || cert.organization
                          ? `${cert.name} - ${cert.organization}`
                          : "New Certificates"}
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCertificates(cert.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>

                    {expanded === cert.id && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor={`organization-${cert.id}`}>
                            Organization
                          </Label>
                          <Input
                            id={`organization-${cert.id}`}
                            value={cert.organization}
                            onChange={(e) =>
                              handleChange(
                                cert.id,
                                "organization",
                                e.target.value
                              )
                            }
                            placeholder="AWS"
                          />
                        </div>

                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor={`name-${cert.id}`}>Name</Label>
                            <Input
                              id={`name-${cert.id}`}
                              value={cert.name}
                              onChange={(e) =>
                                handleChange(cert.id, "name", e.target.value)
                              }
                              placeholder="AWS"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`issueDate-${cert.id}`}>
                              Issue Date
                            </Label>
                            <Input
                              id={`issueDate-${cert.id}`}
                              type="month"
                              value={cert.issueDate}
                              onChange={(e) =>
                                handleChange(
                                  cert.id,
                                  "issueDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor={`expireDate-${cert.id}`}>
                              Expire Date
                            </Label>
                            <Input
                              id={`expireDate-${cert.id}`}
                              type="month"
                              value={cert.expireDate}
                              onChange={(e) =>
                                handleChange(
                                  cert.id,
                                  "expireDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`url-${cert.id}`}>URL</Label>
                          <Input
                            id={`url-${cert.id}`}
                            value={cert.url}
                            onChange={(e) =>
                              handleChange(cert.id, "url", e.target.value)
                            }
                            placeholder="URL"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-4 border border-dashed rounded-md">
                  <p className="text-muted-foreground mb-4">
                    No Certificates entries added yet
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCertificates}
                  >
                    Add Your First Certificates
                  </Button>
                </div>
              )}

              {formData.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCertificates}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Certificates
                </Button>
              )}
            </div>
            <div>
              <Label htmlFor="highlight">Highlight in Description</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="highlight"
                  value={newHighlights}
                  onChange={(e) => setNewHighlights(e.target.value)}
                  onKeyDown={handleKeyDownHighlight}
                  placeholder="e.g., JavaScript|Project Management|Customer Service"
                />
                <Button type="button" onClick={addHighlight}>
                  Set HighLight
                </Button>
              </div>
            </div>

            <div className="min-h-[100px]">
              <Label>Your Highlights</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {highlightData && highlightData.length > 0 ? (
                  highlightData.split("|").map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="py-1.5">
                      {highlight}
                    </Badge>
                  ))
                ) : (
                  <div className="text-center w-full p-4 border border-dashed rounded-md">
                    <p className="text-muted-foreground text-sm">
                      Set which keywords do you want to highlight in
                      Description.
                    </p>
                  </div>
                )}
              </div>
            </div>

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
                Save All
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
