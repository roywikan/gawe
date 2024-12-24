// script.js
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
  //let jobType = doc.querySelector(".RcZtZb")?.textContent.trim() || "Job Type nya?";
  //let applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe")?.href.trim() || "Apply Link nya?";
  //let salary = doc.querySelector(".RcZtZb")?.textContent.trim() || "Salary tidak ada?";
  //let timeworking = doc.querySelector(".RcZtZb")?.textContent.trim() || "Timeworking tidak ada?";

  let jobType = doc.querySelector(".nYym1e:nth-child(3) .RcZtZb")?.textContent.trim() || "Job Type nya?";
  let applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe")?.href.trim() || "Apply Link nya?";
  let salary = doc.querySelector(".nYym1e:nth-child(2) .RcZtZb")?.textContent.trim() || "Salary tidak ada?";
  let timeworking = doc.querySelector(".nYym1e:nth-child(1) .RcZtZb")?.textContent.trim() || "Timeworking tidak ada?";

  
  let jobHighlights = "", qualifications = "", benefits = "", responsibilities = "", jobDescription = "", equalOpportunityStatement = "";




  // Mengambil elemen berdasarkan penanda/marker

  // 1. Job Title
  jobTitle = doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf") ? doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf").textContent.trim() : "Job Title nya?";

  // 2. Company Name
  companyName = doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe") ? doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe").textContent.trim() : "Company Name nya?";

  // 3. Location
  location = doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef") ? doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef").textContent.trim() : "location nya?";

  // 4. Job Type
  jobType = doc.querySelector(".nYym1e:nth-child(3) .RcZtZb") ? doc.querySelector(".nYym1e:nth-child(3) .RcZtZb").textContent.trim() : "Job Type nya?";

  // 5. Apply Link
  applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe") ? doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe").href.trim() : "Apply Link nya?";

  // 6. Salary
  salary = doc.querySelector(".nYym1e:nth-child(2) .RcZtZb") ? doc.querySelector(".nYym1e:nth-child(2) .RcZtZb").textContent.trim() : false;


  if (!salary) {
    const benefitsList = doc.querySelectorAll(".yVFmQd + ul.zqeyHd > li.LevrW");
    benefitsList.forEach((item) => {
      let text = item.textContent.trim();
      if (/[\$€£¥₩₹]|Rp|USD|SGD/i.test(text)) {
        salary = text;
      }
    });
  }
  salary = salary || "Salary tidak ada?";

  
  // 7. Timeworking
  timeworking = doc.querySelector(".nYym1e:nth-child(1) .RcZtZb") ? doc.querySelector(".nYym1e:nth-child(1) .RcZtZb").textContent.trim() : "Timeworking tidak ada?";

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
    <p><strong>Salary:</strong> ${salary}</p>
    <p><strong>Timeworking:</strong> ${timeworking}</p>
    <p><strong>Job Highlights:</strong> ${jobHighlights}</p>
    <p><strong>Qualifications:</strong> ${qualifications}</p>
    <p><strong>Benefits:</strong> ${benefits}</p>
    <p><strong>Responsibilities:</strong> ${responsibilities}</p>
    <p><strong>Job Description:</strong> ${jobDescription}</p>
    <p><strong>Equal Opportunity Statement:</strong> ${equalOpportunityStatement}</p>
  `;


   // Add parsed results to a textarea for easy copying
  const parsedResults = `
    Job Title: ${jobTitle}
    Company Name: ${companyName}
    Location: ${location}
    Job Type: ${jobType}
    Apply Link: ${applyLink}
    Salary: ${salary}
    Timeworking: ${timeworking}
    Job Highlights: ${jobHighlights}
    Qualifications: ${qualifications}
    Benefits: ${benefits}
    Responsibilities: ${responsibilities}
    Job Description: ${jobDescription}
    Equal Opportunity Statement: ${equalOpportunityStatement}
  `;

  document.getElementById("parsedResultsTextarea").value = parsedResults.trim();


  
  // Preparing data to send to Netlify form
  document.getElementById("jobTitle").value = jobTitle;
  document.getElementById("companyName").value = companyName;
  document.getElementById("location").value = location;
  document.getElementById("jobType").value = jobType;
  document.getElementById("applyLink").value = applyLink;

    document.getElementById("salary").value = salary;
  document.getElementById("timeworking").value = timeworking;

  
  document.getElementById("jobHighlights").value = jobHighlights;
  document.getElementById("qualifications").value = qualifications;
  document.getElementById("benefits").value = benefits;
  document.getElementById("responsibilities").value = responsibilities;
  document.getElementById("jobDescription").value = jobDescription;
  document.getElementById("equalOpportunityStatement").value = equalOpportunityStatement;

  // Send data to Netlify function
  fetch('/.netlify/functions/saveToGitHub', {
    method: 'POST',
      body: JSON.stringify({
      jobTitle, companyName, location, jobType, applyLink, salary, timeworking, jobHighlights, qualifications, benefits, responsibilities, jobDescription, equalOpportunityStatement
    })
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

// HTML part to add a new textarea
// <textarea id="parsedResultsTextarea" rows="10" cols="50" readonly></textarea>
