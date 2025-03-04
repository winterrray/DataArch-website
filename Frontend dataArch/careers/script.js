function openJobDetails(jobTitle) {
    // Here you can define a job description based on the job title
    let jobDescription = {
        'Operations Specialist': 'This role involves managing various operations....',
        'Senior Credit Underwriter': 'This role requires assessing risks in lending...',
        'Senior Software Engineer (full-stack)': 'You will develop applications and manage end-to-end features...',
        'Operating Principal': 'This involves overseeing operational activities...'
    };

    localStorage.setItem('selectedJob', JSON.stringify({ title: jobTitle, description: jobDescription[jobTitle] }));
    window.location.href = 'jobDetails.html';
}

// In jobDetails.html, retrieve the job data
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('jobDetails.html')) {
        const jobData = JSON.parse(localStorage.getItem('selectedJob'));
        document.getElementById('job-title').textContent = jobData.title;
        document.getElementById('job-description').textContent = jobData.description;
    }
});