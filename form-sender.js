// script.js
document.getElementById("parseButton").addEventListener("click", function() {
  const inputText = document.getElementById("jobTextInput").value.trim();
  const selectedLanguage = document.getElementById("languageSelect").value;

  if (inputText === "") {
    alert("Please enter the job description!");
    return;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(inputText, "text/html");

  const labels = {
    en: {
      jobTitle: "Job Title",
      companyName: "Company Name",
      location: "Location",
      jobType: "Job Type",
      applyLink: "Apply Link",
      salary: "Salary",
      timeworking: "Timeworking",
      jobHighlights: "Job Highlights",
      qualifications: "Qualifications",
      benefits: "Benefits",
      responsibilities: "Responsibilities",
      jobDescription: "Job Description",
      equalOpportunityStatement: "Equal Opportunity Statement"
    },
    id: {
      jobTitle: "Judul Pekerjaan",
      companyName: "Nama Perusahaan",
      location: "Lokasi",
      jobType: "Jenis Pekerjaan",
      applyLink: "Tautan Melamar",
      salary: "Gaji",
      timeworking: "Jam Kerja",
      jobHighlights: "Sorotan Pekerjaan",
      qualifications: "Kualifikasi",
      benefits: "Manfaat",
      responsibilities: "Tanggung Jawab",
      jobDescription: "Deskripsi Pekerjaan",
      equalOpportunityStatement: "Pernyataan Peluang Setara"
    },
    es: {
      jobTitle: "Título del Trabajo",
      companyName: "Nombre de la Empresa",
      location: "Ubicación",
      jobType: "Tipo de Trabajo",
      applyLink: "Enlace de Solicitud",
      salary: "Salario",
      timeworking: "Horario de Trabajo",
      jobHighlights: "Aspectos Destacados del Trabajo",
      qualifications: "Calificaciones",
      benefits: "Beneficios",
      responsibilities: "Responsabilidades",
      jobDescription: "Descripción del Trabajo",
      equalOpportunityStatement: "Declaración de Igualdad de Oportunidades"
    },
    de: {
      jobTitle: "Berufsbezeichnung",
      companyName: "Firmenname",
      location: "Standort",
      jobType: "Art der Beschäftigung",
      applyLink: "Bewerbungslink",
      salary: "Gehalt",
      timeworking: "Arbeitszeit",
      jobHighlights: "Job-Highlights",
      qualifications: "Qualifikationen",
      benefits: "Leistungen",
      responsibilities: "Verantwortlichkeiten",
      jobDescription: "Stellenbeschreibung",
      equalOpportunityStatement: "Gleichstellungserklärung"
    },
    ms: {
      jobTitle: "Tajuk Pekerjaan",
      companyName: "Nama Syarikat",
      location: "Lokasi",
      jobType: "Jenis Pekerjaan",
      applyLink: "Pautan Permohonan",
      salary: "Gaji",
      timeworking: "Waktu Bekerja",
      jobHighlights: "Sorotan Pekerjaan",
      qualifications: "Kelayakan",
      benefits: "Manfaat",
      responsibilities: "Tanggungjawab",
      jobDescription: "Deskripsi Pekerjaan",
      equalOpportunityStatement: "Pernyataan Kesetaraan Peluang"
    },
    fil: {
      jobTitle: "Pamagat ng Trabaho",
      companyName: "Pangalan ng Kumpanya",
      location: "Lokasyon",
      jobType: "Uri ng Trabaho",
      applyLink: "Link ng Aplikasyon",
      salary: "Suweldo",
      timeworking: "Oras ng Pagtatrabaho",
      jobHighlights: "Mga Highlight ng Trabaho",
      qualifications: "Mga Kwalipikasyon",
      benefits: "Mga Benepisyo",
      responsibilities: "Mga Responsibilidad",
      jobDescription: "Paglalarawan ng Trabaho",
      equalOpportunityStatement: "Pahayag ng Pantay na Pagkakataon"
    }
  };

  const label = labels[selectedLanguage] || labels.en;

  let jobTitle = doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf")?.textContent.trim() || `${label.jobTitle} nya?`;
  let companyName = doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe")?.textContent.trim() || `${label.companyName} nya?`;
  let location = doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef")?.textContent.trim() || `${label.location} nya?`;
  let jobType = doc.querySelector(".nYym1e:nth-child(3) .RcZtZb")?.textContent.trim() || `${label.jobType} nya?`;
  let applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe")?.href.trim() || `${label.applyLink} nya?`;
  let salary = doc.querySelector(".nYym1e:nth-child(2) .RcZtZb")?.textContent.trim() || `${label.salary} tidak ada?`;
  let timeworking = doc.querySelector(".nYym1e:nth-child(1) .RcZtZb")?.textContent.trim() || `${label.timeworking} tidak ada?`;
  
  // concept proposal: 
  //if (jobType && timeworking) {
    //jobType = timeworking;
  //}
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
    let salaryLines = [];
    benefitsList.forEach((item) => {
      let text = item.textContent.trim();
      if (/[\$€£¥₩₹]|Rp|USD|SGD/i.test(text)) {
        salaryLines.push(text);
      }
    });
    salary = salaryLines.join(", ");
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
  // Display parsed job details
  document.getElementById("output").innerHTML = `
    <h3>Parsed Job Details</h3>
    <p><strong>${label.jobTitle}:</strong> ${jobTitle}</p>
    <p><strong>${label.companyName}:</strong> ${companyName}</p>
    <p><strong>${label.location}:</strong> ${location}</p>
    <p><strong>${label.jobType}:</strong> ${jobType}</p>
    <p><strong>${label.applyLink}:</strong> <a href="${applyLink}" target="_blank">${applyLink}</a></p>
    <p><strong>${label.salary}:</strong> ${salary}</p>
    <p><strong>${label.timeworking}:</strong> ${timeworking}</p>
    <p><strong>${label.jobHighlights}:</strong> ${jobHighlights}</p>
    <p><strong>${label.qualifications}:</strong> ${qualifications}</p>
    <p><strong>${label.benefits}:</strong> ${benefits}</p>
    <p><strong>${label.responsibilities}:</strong> ${responsibilities}</p>
    <p><strong>${label.jobDescription}:</strong> ${jobDescription}</p>
    <p><strong>${label.equalOpportunityStatement}:</strong> ${equalOpportunityStatement}</p>
  `;

  // Add parsed results to a textarea for easy copying
  const parsedResults = `
    ${label.jobTitle}: ${jobTitle}
    ${label.companyName}: ${companyName}
    ${label.location}: ${location}
    ${label.jobType}: ${jobType}
    ${label.applyLink}: ${applyLink}
    ${label.salary}: ${salary}
    ${label.timeworking}: ${timeworking}
    ${label.jobHighlights}: ${jobHighlights}
    ${label.qualifications}: ${qualifications}
    ${label.benefits}: ${benefits}
    ${label.responsibilities}: ${responsibilities}
    ${label.jobDescription}: ${jobDescription}
    ${label.equalOpportunityStatement}: ${equalOpportunityStatement}
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
