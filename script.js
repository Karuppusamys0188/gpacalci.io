function generateCourseInputs() {
    const numCourses = document.getElementById('num-courses').value;
    const coursesContainer = document.getElementById('courses-container');
    coursesContainer.innerHTML = '';
    for (let i = 1; i <= numCourses; i++) {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-input-row');
        courseDiv.innerHTML = `
            <input type="number" step="0.01" class="input-field" placeholder="Credits" id="credits${i}">
            <input type="text" class="grade-field" placeholder="Grade" id="grade${i}">
        `;
        coursesContainer.appendChild(courseDiv);
    }
    document.getElementById('course-inputs').style.display = 'none';
    document.getElementById('calculate-button').style.display = 'inline-block';
    document.getElementById('result').innerText = '';
    document.getElementById('error').innerText = '';
}

function calculateGPA() {
    const numCourses = document.getElementById('num-courses').value;
    let totalPoints = 0;
    let totalCredits = 0;
    const gradePoints = {
        'S': 10.0,
        'A': 9.0,
        'B': 8.0,
        'C': 7.0,
        'D': 6.0,
        'E': 5.0,
        'F': 0.0
    };
    for (let i = 1; i <= numCourses; i++) {
        const grade = document.getElementById(`grade${i}`).value.toUpperCase();
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        if (isNaN(credits) || credits <= 0) {
            document.getElementById('result').innerText = '';
            document.getElementById('error').innerText = `Invalid credits entered for Course ${i}. Please enter a valid positive number.`;
            return;
        }
        if (grade in gradePoints) {
            totalPoints += gradePoints[grade] * credits;
            totalCredits += credits;
        } else {
            document.getElementById('result').innerText = '';
            document.getElementById('error').innerText = `Invalid grade entered for Course ${i}. Please enter a valid grade (S, A, B, C, D, E, F).`;
            return;
        }
    }
    const gpa = totalPoints / totalCredits;
    document.getElementById('result').innerText = `Your GPA is: ${gpa.toFixed(2)}`;
    document.getElementById('error').innerText = '';
}
