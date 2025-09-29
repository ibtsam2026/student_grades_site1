
async function fetchStudents() {
  const response = await fetch("https://script.google.com/macros/s/AKfycbwF6iPN5OeqQBKW9WLUhTi8mPDkmmXRkzjAAscFTfJljdUR-Xf0yUMh76Dc0V6E2M-qWg/exec");
  const students = await response.json();
  return students;
}

async function searchStudent() {
  const id = document.getElementById("nationalId").value.trim();
  const students = await fetchStudents();
  const student = students.find(s => s["السجل المدني"] == id);

  if (student) {
    const total = Number(student["المهام الأدائية والمشاركة والتفاعل/40"]) + Number(student["تقويمات تحريرية وتطبيقات عملية/60"]);
    document.getElementById("result").innerHTML = `
      <p><strong>الاسم:</strong> ${student["اسم الطالب"]}</p>
      <p><strong>الفصل:</strong> ${student["الفصل"]}</p>
      <p><strong>المهام الأدائية والمشاركة والتفاعل:</strong> ${student["المهام الأدائية والمشاركة والتفاعل/40"]} / 40</p>
      <p><strong>التقويمات التحريرية والتطبيقات العملية:</strong> ${student["تقويمات تحريرية وتطبيقات عملية/60"]} / 60</p>
      <p><strong>المجموع:</strong> ${total} / 100</p>
    `;
  } else {
    document.getElementById("result").innerHTML = "<p style='color:red;'>لم يتم العثور على الطالبة.</p>";
  }
}
