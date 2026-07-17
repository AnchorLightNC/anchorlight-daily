async function loadStories() {
    try {

        const response = await fetch("stories.json");
        const stories = await response.json();

        const featuredContainer = document.getElementById("featured-story");
        const storiesContainer = document.getElementById("stories-container");

        featuredContainer.innerHTML = "";
        storiesContainer.innerHTML = "";

        stories.forEach(story => {

            const storyCard = `
                <div class="story-card">
                    <h2>${story.title}</h2>

                    <p>${story.story}</p>

                    <div class="story-meta">
                        <strong>${story.author}</strong>
                        ${story.recovery ? " • " + story.recovery : ""}
                        ${story.date ? " • " + story.date : ""}
                    </div>
                </div>
            `;

            if (story.featured) {

                featuredContainer.innerHTML = `
                    <div class="featured">
                        <h2>⭐ Featured Story</h2>

                        <h3>${story.title}</h3>

                        <p>${story.story}</p>

                        <div class="story-meta">
                            <strong>${story.author}</strong>
                            ${story.recovery ? " • " + story.recovery : ""}
                            ${story.date ? " • " + story.date : ""}
                        </div>
                    </div>
                `;

            } else {

                storiesContainer.innerHTML += storyCard;

            }

        });

    } catch (error) {

        console.error(error);

        document.getElementById("stories-container").innerHTML =
            "<p>Stories are coming soon. Check back soon for inspiring stories from our community.</p>";
    }
}

loadStories();
