"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { ResumeData } from "@/hooks/use-resume-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UrlsFormProps {
  urls: ResumeData["personalDetails"]["urls"];
  updateUrls: (urls: ResumeData["personalDetails"]["urls"]) => void;
}

export default function UrlsForm({ urls, updateUrls }: UrlsFormProps) {
  const [formData, setFormData] = useState(urls);
  const [newType, setNewType] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    setFormData(urls);
  }, [urls]);

  const addUrl = () => {
    if (
      newType &&
      newUrl.trim() &&
      formData.findIndex((item) => item.url.includes(newUrl.trim())) < 0
    ) {
      const updatedUrls = [...formData, { type: newType, url: newUrl.trim() }];
      updateUrls(updatedUrls);
      setFormData(updatedUrls);
      setNewType("");
      setNewUrl("");
    }
  };

  const removeUrl = (Url: string) => {
    const updatedUrls = formData.filter((s) => s.url !== Url);
    setFormData(updatedUrls);
    updateUrls(updatedUrls);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addUrl();
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="Url">Add Urls</Label>
            <div className="flex gap-2 mt-1">
              <select
                id="type"
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="github">Github</option>
                <option value="linkedin">Linkedin</option>
                <option value="link">Link</option>
              </select>
              <Input
                id="Url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., JavaScript, Project Management, Customer Service"
              />
              <Button type="button" onClick={addUrl}>
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to add each Url
            </p>
          </div>

          <div className="min-h-[100px]">
            <Label>Your Urls</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.length > 0 ? (
                formData.map((Url, index) => (
                  <Badge key={index} variant="secondary" className="py-1.5">
                    {Url.type}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 -mr-1 text-muted-foreground hover:text-foreground"
                      onClick={() => removeUrl(Url.url)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))
              ) : (
                <div className="text-center w-full p-4 border border-dashed rounded-md">
                  <p className="text-muted-foreground text-sm">
                    Add your professional urls to highlight your expertise
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
