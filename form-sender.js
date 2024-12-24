//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

// script.js
document.getElementById("parseButton").addEventListener("click", function() {
  const inputText = document.getElementById("jobTextInput").value.trim();
  
  if (inputText === "") {
    alert("Please enter the job description!");
    return;
  }

  // Menggunakan DOMParser untuk mengurai input HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(inputText, "text/html");

  // Data yang akan diekstrak dari HTML
  let jobTitle = "";
  let companyName = "";
  let location = "";
  let jobType = "";
  let applyLink = "";
  let jobHighlights = "";
  let qualifications = "";
  let benefits = "";
  let responsibilities = "";
  let jobDescription = "";
  let equalOpportunityStatement = "";

  // Mengambil elemen berdasarkan penanda/marker

  // 1. Job Title
  jobTitle = doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf") ? doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf").textContent.trim() : "Job Title nya?";

  // 2. Company Name
  companyName = doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe") ? doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe").textContent.trim() : "Company Name nya?";

  // 3. Location
  location = doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef") ? doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef").textContent.trim() : "location nya?";

  // 4. Job Type
  jobType = doc.querySelector(".RcZtZb") ? doc.querySelector(".RcZtZb").textContent.trim() : "Job Type nya?";

  // 5. Apply Link
  applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe") ? doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe").href.split('?')[0].trim() : "Apply Link nya?";

  // 6. Job Highlights, Qualifications, Responsibilities, and Benefits
  let jobHighlightsHeader = doc.querySelector("h3.z5xCyb.cS4Vcb-pGL6qe-IRrXtf");
  if (jobHighlightsHeader) {
    let sibling = jobHighlightsHeader.nextElementSibling;
    while (sibling && sibling.tagName !== "H3") {
      if (sibling.classList.contains("QzugZ")) {
        jobHighlights += sibling.textContent.trim() + "\n";
      } else if (sibling.classList.contains("yVFmQd") && sibling.textContent.includes("Qualifications")) {
        let qualElements = sibling.nextElementSibling ? sibling.nextElementSibling.querySelectorAll("li") : [];
        qualifications = Array.prototype.map.call(qualElements, li => li.textContent.trim()).join("<br>");
      } else if (sibling.classList.contains("yVFmQd") && sibling.textContent.includes("Responsibilities")) {
        let respElements = sibling.nextElementSibling ? sibling.nextElementSibling.querySelectorAll("li") : [];
        responsibilities = Array.prototype.map.call(respElements, li => li.textContent.trim()).join("<br>");
      } else if (sibling.classList.contains("yVFmQd") && sibling.textContent.includes("Benefits")) {
        let benElements = sibling.nextElementSibling ? sibling.nextElementSibling.querySelectorAll("li") : [];
        benefits = Array.prototype.map.call(benElements, li => li.textContent.trim()).join("<br>");
      }
      sibling = sibling.nextElementSibling;
    }
  }

  // 10. Job Description
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

  // 11. Equal Opportunity Statement
  equalOpportunityStatement = doc.querySelector(".FkMLeb.cS4Vcb-pGL6qe-IRrXtf") ? doc.querySelector(".FkMLeb.cS4Vcb-pGL6qe-IRrXtf").nextElementSibling.textContent.trim() : "Equal Opportunity Statement nya?";

  // Menampilkan hasil parsing di halaman
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
