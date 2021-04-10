async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('description', description);

  for (let pair of formData.entries()) console.log(pair[0]+','+pair[1]);
  const response = await fetch('http://localhost:3000/api/images',{
    method: 'POST',
    mode: 'cors',
    'Content-type':'multipart/form-data',
    body: formData
  });
  return response.data;
}

let uploadFile = null;
let Description = null;
const $form = document.querySelector('form');
const $fileInput = document.querySelector('input[type="file"]');
const $descriptionInput = document.querySelector('input[type="text"]');

$descriptionInput.addEventListener('change', event => {
  Description = event.target.value;
});

$fileInput.addEventListener('change', event => {
  console.log(event.target.files);
  uploadFile = event.target.files[0];
});

$form.addEventListener('submit', event => {
  event.preventDefault();

  console.log(`uploadFile:${uploadFile} Description:${Description}`);
  postImage({ image: uploadFile, description: Description });
});