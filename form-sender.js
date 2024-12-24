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
  applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe") ? doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe").href.trim() : "Apply Link nya?";

  // 6. Job Highlights
  let jobHighlightsHeader = doc.querySelector("h3.z5xCyb.cS4Vcb-pGL6qe-IRrXtf");
  if (jobHighlightsHeader) {
    let jobHighlightsContent = [];
    let sibling = jobHighlightsHeader.nextElementSibling;
    while (sibling && sibling.tagName !== "H3") {
      jobHighlightsContent.push(sibling.textContent.trim());
      sibling = sibling.nextElementSibling;
    }
    jobHighlights = jobHighlightsContent.join("\n");
  }

  // 7. Qualifications
  qualifications = doc.querySelector(".yVFmQd.cS4Vcb-pGL6qe-KUvarc") ? doc.querySelector(".yVFmQd.cS4Vcb-pGL6qe-KUvarc").textContent.trim() : "Qualifications nya?";

  // 8. Benefits
  benefits = doc.querySelectorAll(".yVFmQd.cS4Vcb-pGL6qe-KUvarc")[1] ? doc.querySelectorAll(".yVFmQd.cS4Vcb-pGL6qe-KUvarc")[1].textContent.trim() : "Benefits nya?";

  // 9. Responsibilities
  responsibilities = doc.querySelectorAll(".yVFmQd.cS4Vcb-pGL6qe-KUvarc")[2] ? doc.querySelectorAll(".yVFmQd.cS4Vcb-pGL6qe-KUvarc")[2].textContent.trim() : "Responsibilities nya?";

  // 10. Job Description
  jobDescription = doc.querySelector(".FkMLeb.cS4Vcb-pGL6qe-IRrXtf") ? doc.querySelector(".FkMLeb.cS4Vcb-pGL6qe-IRrXtf").textContent.trim() : "Job Description nya?";

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

  // Menyiapkan data untuk dikirim ke formulir Netlify
  document.getElementById("jobTitle").value = jobTitle;
  document.getElementById("companyName").value = companyName;
  document.getElementById("location").value = location;
  document.getElementById("jobType").value = jobType;
  document.getElementById("applyLink").value = applyLink;
  document.getElementById("jobHighlights").value = jobHighlights;
  document.getElementById("qualifications").value = qualifications;
  document.getElementById("benefits").value = benefits;
  document.getElementById("responsibilities").value = responsibilities;
  document.getElementById("jobDescription").value = jobDescription;
  document.getElementById("equalOpportunityStatement").value = equalOpportunityStatement;

  // Mengirim data ke Netlify (bisa menggunakan otomatis atau manual)
  // document.getElementById("netlifyForm").submit(); // Otomatis kirim form (Opsional)
});
