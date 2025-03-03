"use client"

import type { ResumeData } from '@/hooks/use-resume-data'
import { jsPDF } from "jspdf"
import * as htmlToImage from 'html-to-image';

export async function generatePDF(resumeData: ResumeData) {
  // Create a temporary container to render the resume
  const container = document.createElement("div")
  container.style.position = "absolute"
  container.style.left = "-9999px"
  container.style.top = "-9999px"
  container.style.width = "800px"

// Clone the resume preview
const resumePreviewElement = document.querySelector(".resume-preview")
if (!resumePreviewElement) {
  console.error("Resume preview element not found")
  return
}

const clone = resumePreviewElement.cloneNode(true) as HTMLElement
clone.style.background = "white"
container.appendChild(clone)
document.body.appendChild(container)

try {
  // Generate image from HTML
  const dataUrl = await htmlToImage.toPng(clone)
  
  // Initialize PDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  })
  
  // Define page dimensions and margins
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const margin = 25 // Add margins to avoid content at the very edge
  const contentWidth = pdfWidth - (margin * 2)
  
  // Split the image into multiple canvases for multi-page support
  const img = new Image();
  img.src = dataUrl;
  
  // We need to wait for the image to load before proceeding
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
  });
  
  // Calculate image dimensions to fit within content area width
  const imgAspectRatio = img.width / img.height
  const imgWidth = contentWidth
  const imgHeight = imgWidth / imgAspectRatio
  
  // Calculate how many pages we'll need
  const pageContentHeight = pdfHeight - (margin * 2)
  const totalPages = Math.ceil(imgHeight / pageContentHeight)
  
  console.log("PDF dimensions:", pdfWidth, pdfHeight);
  console.log("Image dimensions:", imgWidth, imgHeight);
  console.log("Total pages needed:", totalPages);
  
  // For each page, create a canvas with just that portion of the image
  for (let i = 0; i < totalPages; i++) {
    if (i > 0) {
      pdf.addPage()
    }
    
    // Create a canvas for this page slice
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas dimensions to match PDF content area
    canvas.width = img.width;
    canvas.height = Math.min(
      img.height / imgHeight * pageContentHeight,  // Height of this slice in original scale
      img.height - (i * img.height / imgHeight * pageContentHeight) // Remaining height
    );
    
    // Draw the appropriate portion of the image to this canvas
    const sourceY = i * (img.height / imgHeight * pageContentHeight);
    const sourceHeight = canvas.height;
    
    console.log(`Page ${i+1} - Source Y: ${sourceY}, Height: ${sourceHeight}`);
    
    ctx.drawImage(
      img,
      0, sourceY, img.width, sourceHeight,  // Source rectangle
      0, 0, canvas.width, canvas.height     // Destination rectangle
    );
    
    // Get data URL from the canvas
    const pageDataUrl = canvas.toDataURL('image/png');
    
    // Add this canvas to the PDF
    pdf.addImage(
      pageDataUrl,
      'PNG',
      margin,
      margin,
      imgWidth,
      (canvas.height / img.height) * imgHeight,
      undefined,
      'FAST'
    );
  }
  
  // Remove temporary image from DOM
  if (document.body.contains(img)) {
    document.body.removeChild(img);
  }
  
  // Generate file name
  const fileName = resumeData.personalDetails.fullName
    ? `${resumeData.personalDetails.fullName.replace(/\s+/g, "_")}_Resume.pdf`
    : "Resume.pdf"
    // Save PDF
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("Error generating PDF. Please try again.")
  } finally {
    // Clean up
    document.body.removeChild(container)
  }
}

