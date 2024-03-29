const submitBtn = document.querySelector(".submit-btn");
const storeName = document.querySelector("#name");
const storeEmail = document.querySelector("#email");
const checkboxes = document.querySelectorAll(".categories");
const warningMessage = document.querySelector("#form-message-warning");
const successfulMessage = document.querySelector("#form-message-success");
const link = document.querySelector("#link");
const description = document.querySelector("#description");
const file1Name = document.querySelector("#file1-name");
const file2Name = document.querySelector("#file2-name");
const file3Name = document.querySelector("#file3-name");
const file4Name = document.querySelector("#file4-name");
const file5Name = document.querySelector("#file5-name");
const file6Name = document.querySelector("#file6-name");

const file1 = document.querySelector("#file1");
const file2 = document.querySelector("#file2");
const file3 = document.querySelector("#file3");
const file4 = document.querySelector("#file4");
const file5 = document.querySelector("#file5");
const file6 = document.querySelector("#file6");
const contactForm = document.querySelector("#contactForm");
submitBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	const selectedOptions = [];
	checkboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			selectedOptions.push(checkbox.value);
		}
	});

	const form = new FormData();
	form.append("category", selectedOptions);
	if (storeName.value != "") form.append("name", storeName.value);
	if (storeEmail.value != "") form.append("email", storeEmail.value);
	if (description.value != "") form.append("description", description.value);
	if (link.value != "") form.append("link", link.value);
	const myArr = [];
	if (file1Name.value && file1.files[0])
		form.append(file1Name.value, file1.files[0]);
	if (file2Name.value && file2.files[0])
		form.append(file2Name.value, file2.files[0]);
	if (file3Name.value && file3.files[0])
		form.append(file3Name.value, file3.files[0]);
	if (file4Name.value && file4.files[0])
		form.append(file4Name.value, file4.files[0]);
	if (file5Name.value && file5.files[0])
		form.append(file5Name.value, file5.files[0]);
	if (file6Name.value && file6.files[0])
		form.append(file6Name.value, file6.files[0]);
	try {
		myArr.push(
			file1.files[0],
			file2.files[0],
			file3.files[0],
			file4.files[0],
			file5.files[0],
			file6.files[0]
		);
		const result = myArr.filter((file) => file != undefined);
		if (result.length < 3) throw new Error("Please select at least 3 files");
		const response = await fetch("https://api.wishpo.com/admin/stores", {
			method: "POST",
			headers: {
				"Content-Encoding": "applicatopn/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvYmllbW1hMjAwQGdtYWlsLmNvbSIsIm5hbWUiOiJ0b2JpIG9sYWRlbGUiLCJpZCI6IjY1ZDY0YzhlNTgzMzI3OTEwZGNhNWVjMyIsInR5cGUiOiJhZG1pbiIsInJvbGUiOlsiY3JlYXRlX3N0b3JlIiwiZGVsZXRlX3N0b3JlIiwiYWRkX2FkbWluIiwiZGVsZXRlX2FkbWluIl0sImlhdCI6MTcwODYzNDI0MH0.aImBS0T1mQ4wCPvfG50RAHHufFKG6-Uu31MwMerRlug",
			},
			body: form,
		});

		if (response.ok) {
			const data = await response.json();
			contactForm.reset();
			console.log("Upload successful:", data);
			successfulMessage.style.display = "block";
			setTimeout(() => (successfulMessage.style.display = "none"), 5000);
		} else {
			const data = await response.json();
			contactForm.reset();
			console.log("Upload failed:", data);
			warningMessage.style.display = "block";
			warningMessage.textContent = data.message;
			setTimeout(() => (warningMessage.style.display = "none"), 10000);
		}
	} catch (error) {
		contactForm.reset();
		warningMessage.style.display = "block";
		warningMessage.textContent = error.data
			? error.data.message
			: error.message;
		setTimeout(() => (warningMessage.style.display = "none"), 10000);
	}
});
