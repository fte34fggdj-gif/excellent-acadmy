// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.fade-in-up, .fade-in-up-delay, .fade-in-up-delay-2, .fade-in-up-delay-3').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Attendance Page Functions
function toggleAttendance(button) {
    const row = button.closest('tr');
    const statusSpan = row.querySelector('.status');
    
    if (button.classList.contains('present')) {
        // Change to absent
        button.classList.remove('present');
        button.classList.add('absent');
        button.innerHTML = '<i class="fas fa-times"></i>';
        statusSpan.classList.remove('present');
        statusSpan.classList.add('absent');
        statusSpan.textContent = 'Absent';
    } else {
        // Change to present
        button.classList.remove('absent');
        button.classList.add('present');
        button.innerHTML = '<i class="fas fa-check"></i>';
        statusSpan.classList.remove('absent');
        statusSpan.classList.add('present');
        statusSpan.textContent = 'Present';
    }
    
    // Update summary
    updateAttendanceSummary();
}

function updateAttendanceSummary() {
    const presentCount = document.querySelectorAll('.status.present').length;
    const absentCount = document.querySelectorAll('.status.absent').length;
    const totalCount = presentCount + absentCount;
    const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
    
    document.getElementById('present-count').textContent = presentCount;
    document.getElementById('absent-count').textContent = absentCount;
    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('attendance-rate').textContent = attendanceRate + '%';
}

// Grade filter for attendance
document.addEventListener('DOMContentLoaded', function() {
    const gradeSelect = document.getElementById('grade-select');
    if (gradeSelect) {
        gradeSelect.addEventListener('change', function() {
            const selectedGrade = this.value;
            const rows = document.querySelectorAll('#attendance-tbody tr');
            
            rows.forEach(row => {
                if (selectedGrade === 'all' || row.dataset.grade === selectedGrade) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
            
            updateAttendanceSummary();
        });
    }
});

// Results Page Functions
function searchResults() {
    const studentId = document.getElementById('studentId').value.trim();
    const resultsDisplay = document.getElementById('resultsDisplay');
    
    if (!studentId) {
        alert('Please enter a Student ID');
        return;
    }
    
    // Sample results data
    const sampleResults = {
        'STU001': {
            name: 'Ahmed Mohamed Ali',
            grade: 'Grade 5',
            gpa: '3.8',
            subjects: [
                { name: 'Mathematics', grade: 'A-', score: '88%' },
                { name: 'English', grade: 'B+', score: '85%' },
                { name: 'Science', grade: 'A', score: '92%' },
                { name: 'History', grade: 'B', score: '82%' },
                { name: 'Art', grade: 'A', score: '95%' }
            ]
        },
        'STU002': {
            name: 'Sara Ali Hassan',
            grade: 'Grade 5',
            gpa: '3.9',
            subjects: [
                { name: 'Mathematics', grade: 'A', score: '94%' },
                { name: 'English', grade: 'A-', score: '89%' },
                { name: 'Science', grade: 'A', score: '91%' },
                { name: 'History', grade: 'A-', score: '87%' },
                { name: 'Art', grade: 'A', score: '96%' }
            ]
        },
        'STU003': {
            name: 'Omar Hassan Mahmoud',
            grade: 'Grade 6',
            gpa: '3.6',
            subjects: [
                { name: 'Mathematics', grade: 'B+', score: '86%' },
                { name: 'English', grade: 'B', score: '83%' },
                { name: 'Science', grade: 'A-', score: '88%' },
                { name: 'History', grade: 'B+', score: '85%' },
                { name: 'Physical Education', grade: 'A', score: '98%' }
            ]
        }
    };
    
    const result = sampleResults[studentId.toUpperCase()];
    
    if (result) {
        displayResults(result);
        resultsDisplay.classList.add('show');
    } else {
        alert('Student ID not found. Try STU001, STU002, or STU003');
        resultsDisplay.classList.remove('show');
    }
}

function displayResults(result) {
    const studentName = document.getElementById('studentName');
    const studentGrade = document.getElementById('studentGrade');
    const studentGPA = document.getElementById('studentGPA');
    const subjectsTable = document.getElementById('subjectsTable');
    
    studentName.textContent = result.name;
    studentGrade.textContent = result.grade;
    studentGPA.textContent = result.gpa;
    
    // Clear existing table rows
    const tbody = subjectsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Add subject rows
    result.subjects.forEach(subject => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${subject.name}</td>
            <td>${subject.grade}</td>
            <td>${subject.score}</td>
        `;
    });
}

// Students Page Search and Filter Functions
document.addEventListener('DOMContentLoaded', function() {
    const studentSearch = document.getElementById('studentSearch');
    const gradeFilter = document.getElementById('gradeFilter');
    const ageFilter = document.getElementById('ageFilter');
    
    if (studentSearch) {
        studentSearch.addEventListener('input', filterStudents);
    }
    
    if (gradeFilter) {
        gradeFilter.addEventListener('change', filterStudents);
    }
    
    if (ageFilter) {
        ageFilter.addEventListener('change', filterStudents);
    }
});

function filterStudents() {
    const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
    const selectedGrade = document.getElementById('gradeFilter')?.value || 'all';
    const selectedAgeRange = document.getElementById('ageFilter')?.value || 'all';
    const rows = document.querySelectorAll('#studentsTable tbody tr');
    
    let visibleCount = 0;
    
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const id = row.cells[0].textContent.toLowerCase();
        const contact = row.cells[4].textContent.toLowerCase();
        const grade = row.dataset.grade;
        const age = parseInt(row.dataset.age);
        
        let matchesSearch = searchTerm === '' || 
                           name.includes(searchTerm) || 
                           id.includes(searchTerm) || 
                           contact.includes(searchTerm);
        
        let matchesGrade = selectedGrade === 'all' || grade === selectedGrade;
        
        let matchesAge = selectedAgeRange === 'all' || checkAgeRange(age, selectedAgeRange);
        
        if (matchesSearch && matchesGrade && matchesAge) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Update total count
    const totalStudentsElement = document.getElementById('totalStudents');
    if (totalStudentsElement) {
        totalStudentsElement.textContent = visibleCount;
    }
}

function checkAgeRange(age, range) {
    switch(range) {
        case '5-7': return age >= 5 && age <= 7;
        case '8-10': return age >= 8 && age <= 10;
        case '11-13': return age >= 11 && age <= 13;
        case '14-16': return age >= 14 && age <= 16;
        case '17-18': return age >= 17 && age <= 18;
        default: return true;
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Add loading animation for page transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// WhatsApp button pulse animation
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        setInterval(() => {
            whatsappButton.style.animation = 'pulse 2s ease-in-out';
            setTimeout(() => {
                whatsappButton.style.animation = '';
            }, 2000);
        }, 5000);
    }
});

// Add pulse animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
