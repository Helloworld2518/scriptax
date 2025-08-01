// Untuk saat ini halaman statis tanpa interaktivitas kompleks
// Jika ingin nāavigasi mobile toggle:
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
});

function showPosts(data) {
    const container = document.getElementById("blog-posts");
    container.innerHTML = "";
    const entries = data.feed.entry;

    entries.forEach(entry => {
        const title = entry.title.$t;
        const link = entry.link.find(l => l.rel === "alternate").href;
        const published = new Date(entry.published.$t).toLocaleDateString("id-ID");

        // Ambil thumbnail
        let thumbnail = "";
        if (entry.media$thumbnail && entry.media$thumbnail.url) {
            thumbnail = entry.media$thumbnail.url;
        } else {
            const content = entry.content.$t;
            const imgMatch = content.match(/<img[^>]+src=["']?([^"'>]+)["']?/);
            thumbnail = imgMatch && imgMatch[1] ? imgMatch[1] : "https://via.placeholder.com/600x300?text=No+Image";
        }

        // Card Bootstrap 5.3
        const postHTML = `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img src="${thumbnail}" class="card-img-top" alt="Thumbnail">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title"><a href="${link}" target="_blank">${title}</a></h5>
                        <p class="card-text text-muted mt-auto">Diterbitkan pada ${published}</p>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += postHTML;
    });
}

// Load data dari Blogger (pakai JSONP)
const script = document.createElement('script');
script.src = "https://infojtcargo.blogspot.com/feeds/posts/default?alt=json-in-script&callback=showPosts&max-results=6";
document.body.appendChild(script);

window.addEventListener('scroll', function () {
    const waBtn = document.getElementById('waButton');
    if (window.scrollY > 100) {
      waBtn.classList.add('show');
    } else {
      waBtn.classList.remove('show');
    }
  });
