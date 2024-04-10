
// Function to fetch posts from the API
async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    return posts;
}

// Function to fetch comments for a specific post
async function fetchComments(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await response.json();
    return comments;
}

// Function to generate random avatar URL
function getRandomAvatarUrl() {
    return `https://picsum.photos/50?random=${Math.floor(Math.random() * 100)}`;
}

// Function to fetch user names from a local file
async function fetchUserNames() {
    const response = await fetch('usernames.json'); 
    const usernames = await response.json();
    return usernames;
}

// Function to render posts and comments
async function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    const posts = await fetchPosts();
    const usernames = await fetchUserNames();

    posts.forEach(async (post) => {
        const comments = await fetchComments(post.id);
        const avatarUrl = getRandomAvatarUrl();
        const user = usernames[post.userId]

        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <div class="user-profile">
                <img src="${avatarUrl}" alt="User Avatar" class="avatar">
                <div>
                    <p class="username">${user.name}</p>
                </div>
            </div>
            <div class="post-content">
                <div class="post-title">${post.title}</div>
                <div class="post-body">"${post.body}"</div>
            </div>
        `;

        postsContainer.appendChild(postElement);

        const commentsElement = document.createElement('div');
        commentsElement.classList.add('comments');

        const commentsToShow = 2; // Number of comments to initially show
        const showMoreComments = comments.length > commentsToShow;

        commentsElement.innerHTML = `
            <strong>Comments:</strong>
            ${comments.slice(0, commentsToShow).map(comment => `
                <div class="comment">
                    <div class="comment-author">${comment.name}</div>
                    <div class="comment-text">${comment.body}</div>
                </div>
            `).join('')}
            ${showMoreComments ? `<div class="show-more">Show more</div>` : ''}
        `;

        postElement.appendChild(commentsElement);

        postElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('show-more')) {
                const showMoreButton = postElement.querySelector('.show-more');
                commentsElement.innerHTML = `
                    <strong>Comments:</strong>
                    ${comments.map(comment => `
                        <div class="comment">
                            <div class="comment-author">${comment.name}</div>
                            <div class="comment-text">${comment.body}</div>
                        </div>
                    `).join('')}
                `
                showMoreButton.style.display = 'none'; // Hide show more button
                commentsElement.innerHTML += `<div class="show-less">Show less</div>`; 

            }
            if (event.target.classList.contains('show-less')) {
                commentsElement.innerHTML = `
                    <strong>Comments:</strong>
                    ${comments.slice(0, commentsToShow).map(comment => `
                        <div class="comment">
                            <div class="comment-author">${comment.name}</div>
                            <div class="comment-text">${comment.body}</div>
                        </div>
                    `).join('')}
                    ${showMoreComments ? `<div class="show-more">Show more</div>` : ''}
                `;
                const showMoreButton = postElement.querySelector('.show-more');
                showMoreButton.style.display = 'block'; // Re-enable show more button
            }
        });
    });
}

window.onload = renderPosts;