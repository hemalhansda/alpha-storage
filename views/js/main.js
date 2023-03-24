const uploadBtn = document.querySelector('#upload-btn');
const fileInput = document.querySelector('#file-input');
const downloadBtns = document.querySelectorAll('.download-btn');
const modal = document.querySelector('#modal');
const modalDownloadBtn = document.querySelector('#modal-download-btn');
const modalCancelBtn = document.querySelector('#modal-cancel-btn');

// Show the upload form when the upload button is clicked
uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

// Show the file name in the input box after file selection
fileInput.addEventListener('change', () => {
  if (fileInput.value) {
    uploadBtn.textContent = fileInput.files[0].name;
  }
});

// Show the modal when a download button is clicked
downloadBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    const name = btn.dataset.name;
    modalDownloadBtn.href = url;
    modalDownloadBtn.download = name;
    modal.classList.add('show');
  });
});

// Hide the modal when the cancel button is clicked
modalCancelBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

// Hide the modal when the user clicks outside of it
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});
