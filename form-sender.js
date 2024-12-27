//const flatted = require("flatted"); // Uncomment if using circular reference handling
// Menggunakan Flatted dari CDN :
const { stringify, parse } = Flatted;





/**
 * Sanitizes and safely stringifies an object to JSON.
 * @param {any} data - The object or value to stringify.
 * @returns {string|null} - The JSON string or null if an error occurs.
 */
function sanitizeAndStringify(data) {
  try {
    // Step 1: Handle undefined and BigInt
    const preprocessData = (obj) => {
      if (typeof obj === "bigint") {
        return obj.toString(); // Convert BigInt to string
      } else if (typeof obj === "undefined") {
        return null; // Replace undefined with null
      } else if (Array.isArray(obj)) {
        return obj.map(preprocessData); // Recursively process arrays
      } else if (obj && typeof obj === "object") {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [key, preprocessData(value)])
        );
      }
      return obj; // Return other types unchanged
    };

    const sanitizedData = preprocessData(data);

    // Step 2: Sanitize strings
    const sanitizeString = (str) => {
      if (typeof str === "string") {
        return str
          .replace(/[\u0000-\u001F]/g, "") // Remove control characters
          .replace(/\\/g, "\\\\") // Escape backslash
          .replace(/"/g, '\\"'); // Escape double quotes
      }
      return str; // Return non-strings unchanged
    };

    const recursivelySanitizeStrings = (obj) => {
      if (typeof obj === "string") {
        return sanitizeString(obj);
      } else if (Array.isArray(obj)) {
        return obj.map(recursivelySanitizeStrings);
      } else if (obj && typeof obj === "object") {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            recursivelySanitizeStrings(value),
          ])
        );
      }
      return obj;
    };

    const fullySanitizedData = recursivelySanitizeStrings(sanitizedData);

    // Step 3: Handle circular references (optional)
    // Uncomment the line below to handle circular references
    // return flatted.stringify(fullySanitizedData);

    // Step 4: Stringify with JSON.stringify
    return JSON.stringify(fullySanitizedData);
  } catch (err) {
    console.error("Error while sanitizing and stringifying JSON:", err.message);
    return null; // Return null in case of error
  }
}

// Example Usage:
const obj = {
  key1: "Normal string",
  key2: "String with \u0000 control characters",
  key3: undefined,
  key4: BigInt(123456789012345678901234567890),
  key5: { nested: "String with \"double quotes\"" },
  key6: ["Array with", "special \\ characters"],
  key7: {},
};
obj.circular = obj; // Circular reference for testing

//console.log(sanitizeAndStringify(obj));


// script.js
//make parseButton event listener to only parse the data and display it in parsedForm.
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
    slug: "Slug",
    companyName: "Company Name",
    location: "Location",
    jobType: "Job Type",
    applyLink: "Apply Link",
    salary: "Salary",
    currency: "Currency",
    timeworking: "Timeworking",
    jobHighlights: "Job Highlights",
    qualifications: "Qualifications",
    benefits: "Benefits",
    responsibilities: "Responsibilities",
    jobDescription: "Job Description",
    equalOpportunityStatement: "Equal Opportunity Statement",
    education: "Education"
  },
  id: {
    jobTitle: "Judul Pekerjaan",
    slug: "Slug",
    companyName: "Nama Perusahaan",
    location: "Lokasi",
    jobType: "Jenis Pekerjaan",
    applyLink: "Tautan Melamar",
    salary: "Gaji",
    currency: "Mata Uang",
    timeworking: "Jam Kerja",
    jobHighlights: "Sorotan Pekerjaan",
    qualifications: "Kualifikasi",
    benefits: "Manfaat",
    responsibilities: "Tanggung Jawab",
    jobDescription: "Deskripsi Pekerjaan",
    equalOpportunityStatement: "Pernyataan Peluang Setara",
    education: "Pendidikan"
  },
  es: {
    jobTitle: "Título del Trabajo",
    slug: "Slug",
    companyName: "Nombre de la Empresa",
    location: "Ubicación",
    jobType: "Tipo de Trabajo",
    applyLink: "Enlace de Solicitud",
    salary: "Salario",
    currency: "Moneda",
    timeworking: "Horario de Trabajo",
    jobHighlights: "Aspectos Destacados del Trabajo",
    qualifications: "Calificaciones",
    benefits: "Beneficios",
    responsibilities: "Responsabilidades",
    jobDescription: "Descripción del Trabajo",
    equalOpportunityStatement: "Declaración de Igualdad de Oportunidades",
    education: "Educación"
  },
  de: {
    jobTitle: "Berufsbezeichnung",
    slug: "Slug",
    companyName: "Firmenname",
    location: "Standort",
    jobType: "Art der Beschäftigung",
    applyLink: "Bewerbungslink",
    salary: "Gehalt",
    currency: "Währung",
    timeworking: "Arbeitszeit",
    jobHighlights: "Job-Highlights",
    qualifications: "Qualifikationen",
    benefits: "Leistungen",
    responsibilities: "Verantwortlichkeiten",
    jobDescription: "Stellenbeschreibung",
    equalOpportunityStatement: "Gleichstellungserklärung",
    education: "Bildung"
  },
  ms: {
    jobTitle: "Tajuk Pekerjaan",
    slug: "Slug",
    companyName: "Nama Syarikat",
    location: "Lokasi",
    jobType: "Jenis Pekerjaan",
    applyLink: "Pautan Permohonan",
    salary: "Gaji",
    currency: "Mata Wang",
    timeworking: "Waktu Bekerja",
    jobHighlights: "Sorotan Pekerjaan",
    qualifications: "Kelayakan",
    benefits: "Manfaat",
    responsibilities: "Tanggungjawab",
    jobDescription: "Deskripsi Pekerjaan",
    equalOpportunityStatement: "Pernyataan Kesetaraan Peluang",
    education: "Pendidikan"
  },
  fil: {
    jobTitle: "Pamagat ng Trabaho",
    slug: "Slug",
    companyName: "Pangalan ng Kumpanya",
    location: "Lokasyon",
    jobType: "Uri ng Trabaho",
    applyLink: "Link ng Aplikasyon",
    salary: "Suweldo",
    currency: "Pera",
    timeworking: "Oras ng Pagtatrabaho",
    jobHighlights: "Mga Highlight ng Trabaho",
    qualifications: "Mga Kwalipikasyon",
    benefits: "Mga Benepisyo",
    responsibilities: "Mga Responsibilidad",
    jobDescription: "Paglalarawan ng Trabaho",
    equalOpportunityStatement: "Pahayag ng Pantay na Pagkakataon",
    education: "Edukasyon"
  }
};

  const label = labels[selectedLanguage] || labels.en;
  window.label = labels[selectedLanguage] || labels.en;

    let jobTitle = doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf")?.textContent.trim() || ``;
  let companyName = doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe")?.textContent.trim() || ``;
  let location = doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef")?.textContent.trim() || ``;
  let jobType = doc.querySelector(".nYym1e:nth-child(3) .RcZtZb")?.textContent.trim() || ``;
  let applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe")?.href.trim() || ``;
  let salary = doc.querySelector(".nYym1e:nth-child(2) .RcZtZb")?.textContent.trim() || ``;
  let timeworking = doc.querySelector(".nYym1e:nth-child(1) .RcZtZb")?.textContent.trim() || ``;
  let education = doc.querySelector(".nYym1e:nth-child(3) .RcZtZb")?.textContent.trim() || ``;


  

  let jobHighlights = "", qualifications = "", benefits = "", responsibilities = "", jobDescription = "", equalOpportunityStatement = "";



  // Mengambil elemen berdasarkan penanda/marker

  // 1. Job Title
  jobTitle = doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf") ? doc.querySelector(".LZAQDf.cS4Vcb-pGL6qe-IRrXtf").textContent.trim() : "";

  // 2. Company Name
  companyName = doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe") ? doc.querySelector(".BK5CCe.cS4Vcb-pGL6qe-lfQAOe").textContent.trim() : "";

  // 3. Location
  location = doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef") ? doc.querySelector(".waQ7qe.cS4Vcb-pGL6qe-ysgGef").textContent.trim() : "";

  // 4. Job Type
  jobType = doc.querySelector(".nYym1e:nth-child(3) .RcZtZb") ? doc.querySelector(".nYym1e:nth-child(3) .RcZtZb").textContent.trim() : "";

  // 5. Apply Link
  applyLink = doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe") ? doc.querySelector("a.nNzjpf-cS4Vcb-PvZLI-Ueh9jd-LgbsSe-Jyewjb-tlSJBe").href.trim() : "";

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


function createSlug(jobTitle) {
  return jobTitle
    .toLowerCase() // Ubah ke huruf kecil
    .replace(/[^a-z0-9\s-]/g, "") // Hapus simbol, non-ASCII, dan non-alfanumerik
    .trim() // Hapus spasi di awal dan akhir
    .replace(/\s+/g, "-") // Ganti spasi dengan "-"
    .replace(/-+/g, "-"); // Ganti "-" berurutan menjadi satu "-"
}


// Contoh penggunaan

let slug = createSlug(jobTitle);








  
  
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


  if (jobType === "No Degree Mentioned") {
    education = jobType;
    jobType = doc.querySelector(".nYym1e:nth-child(2) .RcZtZb")?.textContent.trim() || ``;
  }

  // Correcting the values for salary and timeworking
  if (salary === "Full-time") {
    salary = doc.querySelector(".nYym1e:nth-child(1) .RcZtZb")?.textContent.trim() || ``;
    timeworking = "Full-time";
  }



  if (!jobType && timeworking) {
    jobType = timeworking;
  }

    // Remove query strings from apply link
  const url = new URL(applyLink);
  applyLink = url.origin + url.pathname;


// Detect currency from salary data
let currency = "";
if (salary) {
  if (salary.includes('Rp')) {
    currency = 'IDR'; // Indonesian Rupiah
  } else if (salary.includes('$')) {
    // Check for specific dollar types
    if (salary.toLowerCase().includes('aud') || salary.includes('A$')) {
      currency = 'AUD'; // Australian Dollar
    } else if (salary.toLowerCase().includes('sgd') || salary.includes('S$')) {
      currency = 'SGD'; // Singapore Dollar
    } else {
      currency = 'USD'; // Default to US Dollar for generic '$'
    }
  } else if (salary.includes('€')) {
    currency = 'EUR'; // Euro
  } else if (salary.includes('£')) {
    currency = 'GBP'; // British Pound
  } else if (salary.includes('¥')) {
    currency = 'JPY'; // Japanese Yen
  } else if (salary.includes('₹')) {
    currency = 'INR'; // Indian Rupee
  } else if (salary.includes('₩')) {
    currency = 'KRW'; // South Korean Won
  } else if (salary.includes('₦')) {
    currency = 'NGN'; // Nigerian Naira
  } else if (salary.includes('₱')) {
    currency = 'PHP'; // Philippine Peso
  } else if (salary.includes('฿')) {
    currency = 'THB'; // Thai Baht
  } else if (salary.includes('₫')) {
    currency = 'VND'; // Vietnamese Dong
  } else {
    currency = "IDR"; // Default currency if not detected
  }
}

  

  // Create JSON-LD script for job posting
  const jobPostingJSONLD = {
    "@context": "http://schema.org",
    "@type": "JobPosting",
    "title": jobTitle,
    "description": jobDescription,
    "identifier": {
      "@type": "PropertyValue",
      "name": companyName
    },
    "datePosted": new Date().toISOString(),
    "employmentType": jobType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": companyName,
      "sameAs": applyLink
    },
    "jobLocation": {
      "@type": "Place",
      "address": location
    },
    "workHours": timeworking
  };

  if (salary) {
    jobPostingJSONLD.baseSalary = {
      "@type": "MonetaryAmount",
      "currency": currency,
      "value": {
        "@type": "QuantitativeValue",
        "value": salary
      }
    };
  }

  const jsonLDScript = `<script type="application/ld+json">${sanitizeAndStringify(jobPostingJSONLD)}</script>`;


  // Create Google Maps iframe based on location
  let googleMapsIframe = "";
  if (location) {
    const mapsQuery = encodeURIComponent(location);
    googleMapsIframe = `<div class="mapouter"><div class="gmap_canvas"><iframe loading="lazy" id="gmap_canvas" title="${location}" src="https://maps.google.com/maps?q=${mapsQuery}&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed" width="100%" height="240px" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="width: 100%;"></iframe></div></div>`;
  }
  
  // 11. Equal Opportunity Statement
  equalOpportunityStatement = doc.querySelector(".FkMLeb.cS4Vcb-pGL6qe-IRrXtf") ? doc.querySelector(".FkMLeb.cS4Vcb-pGL6qe-IRrXtf").nextElementSibling.textContent.trim() : "Equal Opportunity Statement nya?";
  const snippet = equalOpportunityStatement ;

  
  // Menampilkan hasil parsing di halaman
  // Display parsed job details

  // Display parsed job details
  const htmlResults = `
    <h3>${jobTitle}</h3>
    <p><strong>${label.jobTitle}:</strong> ${jobTitle}</p>
        <p><strong>Slug:</strong> ${slug}</p>
    <p><strong>${label.companyName}:</strong> ${companyName}</p>
    <p><strong>${label.location}:</strong> ${location}</p>
    <p><strong>${label.jobType}:</strong> ${jobType}</p>
    <p><strong>${label.applyLink}:</strong> <a href="${applyLink}" target="_blank">Apply for ${jobTitle} at ${companyName}</a></p>
       <p><strong>${currency}:</strong> ${currency}</p>
    <p><strong>${label.salary}:</strong> ${salary}</p>
    <p><strong>${label.timeworking}:</strong> ${timeworking}</p>
    <p><strong>${label.education}:</strong> ${education}</p>
    <p><strong>${label.jobHighlights}:</strong> ${jobHighlights}</p>



<p><strong>${label.qualifications}:</strong></p>
<ul>
  ${qualifications.includes('<li>') 
    ? qualifications 
    : qualifications.split('<br>').map(item => `<li>${item}</li>`).join('')}
</ul>
<p><strong>${label.benefits}:</strong></p>
<ul>
  ${benefits.includes('<li>') 
    ? benefits 
    : benefits.split('<br>').map(item => `<li>${item}</li>`).join('')}
</ul>
<p><strong>${label.responsibilities}:</strong></p>
<ul>
  ${responsibilities.includes('<li>') 
    ? responsibilities 
    : responsibilities.split('<br>').map(item => `<li>${item}</li>`).join('')}
</ul>
<p><strong>${label.jobDescription}:</strong></p>
<ul>
  ${jobDescription.includes('<li>') 
    ? jobDescription 
    : jobDescription.split('<br>').map(item => `<li>${item}</li>`).join('')}
</ul>













    
    <p><strong>Location Map:</strong> ${googleMapsIframe}</p>
    <p><blockquote>${snippet}</blockquote>
    <p>${jsonLDScript}</p>
  `;
  
  document.getElementById("output").innerHTML = htmlResults ;

  // Add parsed results to a textarea for easy editing and copying
  const parsedResults = htmlResults ;

  document.getElementById("parsedResultsTextarea").value = parsedResults.trim();

  // Preparing data to send to Netlify form, I WISHED I CAN EDIT THEM BEFORE SUBMITTING TO NETLIFY FORMS
  document.getElementById("jobTitle").value = jobTitle;
  document.getElementById("slug").value = slug;
  document.getElementById("companyName").value = companyName;
  document.getElementById("location").value = location;
  document.getElementById("jobType").value = jobType;
  
  document.getElementById("applyLink").value = applyLink;
  document.getElementById("currency").value = currency;
  document.getElementById("salary").value = salary;
  document.getElementById("timeworking").value = timeworking;
  document.getElementById("education").value = education;
  
  document.getElementById("jobHighlights").value = jobHighlights;
  document.getElementById("qualifications").value = qualifications;
  document.getElementById("benefits").value = benefits;
  document.getElementById("responsibilities").value = responsibilities;
  document.getElementById("jobDescription").value = jobDescription;
  
  document.getElementById("snippet").value = snippet;
document.getElementById("googleMapsIframe").value = googleMapsIframe;
document.getElementById("jsonLDScript").value = jsonLDScript;

   document.getElementById("output").innerHTML = htmlResults;
  document.getElementById("parsedResultsTextarea").value = htmlResults.trim();




});

// Menambahkan event listener untuk tombol submit
document.getElementById("mergeCopyButton").addEventListener("click", function() {
  const formData = new FormData(document.getElementById("parsedForm"));
  /*
  // Kirim data ke Supabase Postgres
  fetch('URL_SUPABASE_FUNCTION', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Data successfully submitted to Supabase!');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while submitting data to Supabase.');
  });
  */
  
});
