document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentText = document.getElementById('commentText');
    const commentsList = document.getElementById('commentsList');

    loadComments();

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (commentText.value.trim() !== '') {
            addComment(commentText.value);
            commentText.value = '';
        }
    });

    function addComment(text) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        const newComment = {
            id: Date.now(),
            text: text,
            date: new Date().toLocaleString(),
            likes: 0
        };
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsList.appendChild(commentElement);
        });
    }

    function createCommentElement(comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.setAttribute('data-comment-id', comment.id);
        commentElement.innerHTML = `
            <p id="commentText">${comment.text}</p>
            <small>${comment.date}</small>
            <button onclick='deleteComment(${comment.id})'>삭제</button>
            <button class="like-button" onclick='likeComment(${comment.id})'>
                <i class="fas fa-thumbs-up"></i>
                <span class="like-count">${comment.likes}</span>
            </button>`;
        
        if (comment.likes >= 100 && comment.likes < 10000) {
            const celebrationLevel = Math.floor(comment.likes / 100);
            commentElement.classList.add(`celebrate-${celebrationLevel * 100}`);
        }
        
        return commentElement;
    }

    window.deleteComment = function(id) {
        let comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments = comments.filter(comment => comment.id !== id);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    };

    window.likeComment = function(id) {
        let comments = JSON.parse(localStorage.getItem('comments') || '[]');
        const comment = comments.find(c => c.id === id);
        if (comment) {
            comment.likes++;
            localStorage.setItem('comments', JSON.stringify(comments));
            loadComments();
            
            if (comment.likes === 1000) {
                showFullScreenCelebration();
            } else if (comment.likes % 100 === 0) {
                const commentElement = document.querySelector(`[data-comment-id="${id}"]`);
                if (commentElement) {
                    commentElement.classList.add(`celebrate-${comment.likes}`);
                    setTimeout(() => {
                        commentElement.classList.remove(`celebrate-${comment.likes}`);
                    }, 3000);
                }
            }
        }
    };

    function showFullScreenCelebration() {
        const celebrationElement = document.createElement('div');
        celebrationElement.id = 'fullScreenCelebration';
        celebrationElement.innerHTML = `
            <div class="content">
                <div class="like-icon">👍</div>
                <h1>1000 Likes!</h1>
                <p>Incredible achievement!</p>
            </div>
        `;
        document.body.appendChild(celebrationElement);

        setTimeout(() => {
            document.body.removeChild(celebrationElement);
        }, 3000);
    }
});