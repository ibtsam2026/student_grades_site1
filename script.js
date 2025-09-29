async function fetchStudents() {
  const response = await fetch("https://script.google.com/macros/s/AKfycbwF6iPN5OeqQBKW9WLUhTi8mPDkmmXRkzjAAscFTfJljdUR-Xf0yUMh76Dc0V6E2M-qWg/exec");
  const students = await response.json();
  return students;
}

async function searchStudent() {
  const id = document.getElementById("nationalId").value.trim();
  const students = await fetchStudents();
  const student = students.find(s => s["national_id"] == id);

  if (student) {
    const total = Number(student["performance_score_40"]) + Number(student["assessment_score_60"]);
    document.getElementById("result").innerHTML = `
      <p><strong>الاسم:</strong> ${student["student_name"]}</p>
      <p><strong>الفصل:</strong> ${student["class"]}</p>
      <p><strong>المهام الأدائية والمشاركة:</strong> ${student["performance_score_40"]} / 40</p>
      <p><strong>التقويمات التحريرية والتطبيقات العملية:</strong> ${student["assessment_score_60"]} / 60</p>
      <p><strong>المجموع:</strong> ${total} / 100</p>
    `;
  } else {
    document.getElementById("result").innerHTML = "<p style='color:red;'>لم يتم العثور على الطالبة.</p>";
  }
}
