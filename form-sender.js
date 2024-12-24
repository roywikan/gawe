document.getElementById("parseButton").addEventListener("click", function() {
  const inputText = document.getElementById("jobTextInput").value.trim();
  
  if (inputText === "") {
    alert("Please enter the job description!");
    return;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(inputText, "text/html");

  let jobTitle = doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf")?.textContent.trim() || "Job Title nya?";
  let companyName = doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe")?.textContent.trim() || "Company Name nya?";
  let location = doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef")?.textContent.trim() || "location nya?";
  let jobType = doc.querySelector(".RcZtZb")?.textContent.trim() || "Job Type nya?";
  let applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe")?.href.split('?')[0].trim() || "Apply Link nya?";
  let jobHighlights = "", qualifications = "", benefits = "", responsibilities = "", jobDescription = "", equalOpportunityStatement = "";

  let jobHighlightsHeader = doc.querySelector("h3.z5xCyb.cS4Vcb-pGL6qe-IRrXtf");
  if (jobHighlightsHeader) {
    let sibling = jobHighlightsHeader.nextElementSibling;
    while (sibling && sibling.tagName !== "H3") {
      if (sibling.classList.contains("QzugZ")) {
        jobHighlights += sibling.textContent.trim() + "\n";
      } else if (sibling.classList.contains("yVFmQd") && sibling.textContent.includes("Qualifications")) {
        let qualElements = sibling.nextElementSibling?.querySelectorAll("li") || [];
        qualifications = Array.from(qualElements).map(li => li.textContent.trim()).join("<br>");
      } else if (sibling.classList.contains("yVFmQd") && sibling.textContent.includes("Responsibilities")) {
        let respElements = sibling.nextElementSibling?.querySelectorAll("li") || [];
        responsibilities = Array.from(respElements).map(li => li.textContent.trim()).join("<br>");
      } else if (sibling.classList.contains("yVFmQd") && sibling.textContent.includes("Benefits")) {
        let benElements = sibling.nextElementSibling?.querySelectorAll("li") || [];
        benefits = Array.from(benElements).map(li => li.textContent.trim()).join("<br>");
      }
      sibling = sibling.nextElementSibling;
    }
  }

  let jobDescriptionHeader = doc.querySelector("h3.FkMLeb.cS4Vcb-pGL6qe-IRrXtf");
  if (jobDescriptionHeader) {
    let descriptionContent = [];
    let sibling = jobDescriptionHeader.nextElementSibling;
    while (sibling && sibling.tagName !== "H3") {
      if (sibling.tagName === "BR") {
        descriptionContent.push("<br>");
      } else {
        descriptionContent.push(sibling.innerHTML.trim());
      }
      sibling = sibling.nextElementSibling;
    }
    jobDescription = descriptionContent.join("");
  }

  equalOpportunityStatement = doc.querySelector(".FkMLeb.cS4Vcb-pGL6qe-IRrXtf")?.nextElementSibling.textContent.trim() || "Equal Opportunity Statement nya?";

  document.getElementById("output").innerHTML = `
    <h3>Parsed Job Details</h3>
    <p><strong>Job Title:</strong> ${jobTitle}</p>
    <p><strong>Company Name:</strong> ${companyName}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Job Type:</strong> ${jobType}</p>
    <p><strong>Apply Link:</strong> <a href="${applyLink}" target="_blank">${applyLink}</a></p>
    <p><strong>Job Highlights:</strong> ${jobHighlights}</p>
    <p><strong>Qualifications:</strong> ${qualifications}</p>
    <p><strong>Benefits:</strong> ${benefits}</p>
    <p><strong>Responsibilities:</strong> ${responsibilities}</p>
    <p><strong>Job Description:</strong> ${jobDescription}</p>
    <p><strong>Equal Opportunity Statement:</strong> ${equalOpportunityStatement}</p>
  `;

  const formData = {
    jobTitle,
    companyName,
    location,
    jobType,
    applyLink,
    jobHighlights,
    qualifications,
    benefits,
    responsibilities,
    jobDescription,
    equalOpportunityStatement
  };

  fetch('/.netlify/functions/saveToGitHub', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
  })
  .catch(error => {
    alert('Error: ' + error.message);
    console.error(error);
  });
});
