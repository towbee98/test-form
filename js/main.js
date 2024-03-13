
const submitBtn= document.querySelector('.submit-btn');
const storeName= document.querySelector('#name');
const storeEmail= document.querySelector('#email');
 const checkboxes = document.querySelectorAll('.categories');
const warningMessage= document.querySelector("#form-message-warning");
const successfulMessage= document.querySelector("#form-message-success");
const link= document.querySelector('#link');
const description= document.querySelector('#description');
const file1Name= document.querySelector('#file1-name');
const file2Name= document.querySelector('#file2-name');
const file3Name= document.querySelector('#file3-name');
const file4Name= document.querySelector('#file4-name');
const file5Name= document.querySelector('#file5-name');
const file6Name= document.querySelector('#file6-name');

const file1=document.querySelector('#file1');
const file2=document.querySelector('#file2');
const file3=document.querySelector('#file3');
const file4=document.querySelector('#file4');
const file5=document.querySelector('#file5');
const file6=document.querySelector('#file6');

submitBtn.addEventListener('click',async(e) => {
	e.preventDefault();
	console.log(e.target)
	console.log(storeName)
	console.log(storeEmail)
	console.log(checkboxes)
	const selectedOptions = [];
	 checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.value);
        }
    });
	console.log(selectedOptions)
	console.log(file1.files)

	const form = new FormData();
	form.append('name', storeName);
	form.append('email', storeEmail);
	form.append('description', description);
	form.append('category', selectedOptions);
	form.append('link', link);
	form.append(file1Name, file1.files[0]);
	form.append(file2Name, file2.files[0]);
	form.append(file3Name, file3.files[0]);
	form.append(file4Name, file4.files[0]);
	form.append(file5Name, file5.files[0]);
	form.append(file6Name, file6.files[0]);

	try {
const response= await fetch('http://localhost:3001/admin/stores', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvYmllbW1hMjAwQGdtYWlsLmNvbSIsIm5hbWUiOiJ0b2JpIG9sYWRlbGUiLCJpZCI6IjY1ZDY0YzhlNTgzMzI3OTEwZGNhNWVjMyIsInR5cGUiOiJhZG1pbiIsInJvbGUiOlsiY3JlYXRlX3N0b3JlIiwiZGVsZXRlX3N0b3JlIiwiYWRkX2FkbWluIiwiZGVsZXRlX2FkbWluIl0sImlhdCI6MTcwODYzNDI0MH0.aImBS0T1mQ4wCPvfG50RAHHufFKG6-Uu31MwMerRlug'
  },
  body: form
});
if (response.ok) {
	const data = await response.json();
	console.log('Upload successful:', data);
	setTimeout(successfulMessage.styles.display="block",5000)
	successfulMessage.styles.display="none"

} else {
	console.error('Upload failed:', response.data);
	warningMessage.textContent = response.data.
	setTimeout(warningMessage.styles.display="block",5000)
	warningMessage.styles.display="none"
}
	} catch (error) {
		console.error('Error:', error);
	}

})

