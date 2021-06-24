const postSubmitHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector('#id').value.trim();
  const title = document.querySelector('#title').value.trim();
  const contents = document.querySelector('#contents').value.trim();
  const action = document.querySelector('#action').value.trim();
  //
  //  Action - 3: Edit
  //
  console.log('I am here');
  if (action === '2') {
    console.log('Action = 2');
    if (title && contents) {
      const res = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (res.ok) {
      // If successful, redirect the browser to the homepage
      document.location.replace('/');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.post-form-submit')
  .addEventListener('submit', postSubmitHandler);
