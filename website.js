const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
})

const faqCards = document.querySelectorAll(".faq-card");

faqCards.forEach(clickedCard => {
    clickedCard.addEventListener("click", () => {
        faqCards.forEach(otherCard => {
            if (otherCard !== clickedCard && otherCard.classList.contains("open")) {
                otherCard.classList.remove("open");
            }
        });

        clickedCard.classList.toggle("open");
    });
});

 const api = `https://dummyjson.com/products?limit=10`;
const dealCarousel = document.querySelector('.deal-carousel');
const dealRow = document.querySelector(".deal-row");
const primaryFullCard = dealRow.querySelector('.primary');
const secondaryFullCard = dealRow.querySelector('.secondary');

function limitText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

async function fetchData() {
    try {
        dealCarousel.innerHTML = 'Loading products...';
        primaryFullCard.innerHTML = `Loading...`;
        secondaryFullCard.innerHTML = `Loading...`;

        const response = await fetch(api);
        const data = await response.json();
        let carouselProductsHtml = '';
        
        const carouselProducts = data.products.slice(0, 6);
        carouselProducts.forEach(product => {
            const imageUrl = product.images[0] || product.thumbnail;
            const formattedPrice = `$${product.price.toFixed(2)}`;
            const rating = Math.round(product.rating);

            let starIconsHtml = '';
            for (let i = 0; i < 5; i++) {
                starIconsHtml += `<i class='bx ${i < rating ? 'bxs-star' : 'bx-star'}'></i>`;
            }

            carouselProductsHtml += `
                <div class="deal-card">
                    <img src="${imageUrl}" alt="${product.title}">
                    <div class="deal-info">
                        <h4>${product.title}</h4>
                        <p>${product.description}</p>
                        <div class="deal-meta">
                            <div class="stars">${starIconsHtml}</div>
                            <div class="price">${formattedPrice}</div>
                        </div>
                        <button class="deal-btn">Shop Now<i class='bx bx-right-arrow-alt'></i></button>
                    </div>
                </div>
            `;
        });
        dealCarousel.innerHTML = carouselProductsHtml;

        const productForCard1 = data.products[8];
        const productForCard2 = data.products[9];

        const specificCardDescriptionLimit = 80;

        if (productForCard1) {
            const imageUrl = productForCard1.images[0] || productForCard1.thumbnail;
            const limitedDescription1 = limitText(productForCard1.description, specificCardDescriptionLimit);
            primaryFullCard.innerHTML = `
                <img src="${imageUrl}" alt="${productForCard1.title}">
                <div class="deal-info">
                    <h4>${productForCard1.title}</h4>
                    <p>${limitedDescription1}</p>
                    <button class="deal-btn">Shop Now <i class='bx bx-right-arrow-alt'></i></button>
                </div>
            `;
        } else {
            primaryFullCard.innerHTML = `Not available.`;
        }

        if (productForCard2) {
            const imageUrl = productForCard2.images[0] || productForCard2.thumbnail;
            const limitedDescription2 = limitText(productForCard2.description, specificCardDescriptionLimit); // Apply limit here
            secondaryFullCard.innerHTML = `
                <img src="${imageUrl}" alt="${productForCard2.title}">
                <div class="deal-info">
                    <h4>${productForCard2.title}</h4>
                    <p>${limitedDescription2}</p>
                    <button class="deal-btn">Shop Now <i class='bx bx-right-arrow-alt'></i></button>
                </div>
            `;
        } else {
            secondaryFullCard.innerHTML = `Not available.`;
        }

    } catch (error) {
        dealCarousel.innerHTML = `Failed to load products.`;
        primaryFullCard.innerHTML = `Failed to load.`;
        secondaryFullCard.innerHTML = `Failed to load.`;
    }
}

fetchData();
const testimonialAPI = `https://testimonialapi.vercel.app/api`;
const testimonialWrapper = document.querySelector(".testimonial-wrapper");

async function fetchTestimonial() {
    try {
        if (!testimonialWrapper) {
            console.error("Error: Element with class 'testimonialWrapper' not found in the DOM.");
            return;
        }
        
        testimonialWrapper.innerHTML = 'Loading testimonials...';

        const responseTestimonial = await fetch(testimonialAPI);

        if (!responseTestimonial.ok) {
            throw new Error(`HTTP Error: Could not fetch testimonials. Status: ${responseTestimonial.status}`);
        }

        const testimonialData = await responseTestimonial.json();
        
        const twoTestimonials = testimonialData.slice(0, 2);
        
        let allTestimonialsHtml = '';

        twoTestimonials.forEach(data => {
            const rating = data.rating;
            
            let starIconsHtml = '';
            for (let i = 0; i < 5; i++) {
                starIconsHtml += `<i class='bx ${i < rating ? 'bxs-star' : 'bx-star'}'></i>`;
            }

      const imageUrl = `https://i.pravatar.cc/200?u=${data.id}`;

            allTestimonialsHtml += `
                <div class="testimonial-card">
                    <div class="testimonial-top">
                        <div class="client-info">
                            <div class="testimonial-bg">
                                <img src="${imageUrl}" alt="${data.name} Avatar">
                            </div>
                            <div class="info-text">
                                <h4>${data.name}</h4>
                                <p>${data.designation}</p>
                                <div class="stars">${starIconsHtml}</div>
                            </div>
                        </div>
                        <i class='bx bxs-quote-right quote-icon'></i>
                    </div>
                    <p class="testimonial-text">
                       ${data.message}
                    </p>
                </div>`;
        });

        testimonialWrapper.innerHTML = allTestimonialsHtml;
        
        console.log("Fetched testimonials (limited to 2):", twoTestimonials);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        if (testimonialWrapper) {
            testimonialWrapper.innerHTML = `<p class="error-message">Failed to load testimonials. Please try again later.</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchTestimonial);
const newsAPI = `https://jsonplaceholder.typicode.com/posts?_limit=3`;
const newsWrapper = document.querySelector(".blog-cards");

async function fetchNews() {
    try {
        if (!newsWrapper) {
            console.error("Error: Element with class 'blog-cards' not found in the DOM.");
            return;
        }
        newsWrapper.innerHTML = 'Loading blog posts with photos...';

        const responseNews = await fetch(newsAPI);

        if (!responseNews.ok) {
            throw new Error(`HTTP Error: Could not fetch blog posts. Status: ${responseNews.status}`);
        }

        const newsData = await responseNews.json();
        console.log("Fetched News Data (JSONPlaceholder):", newsData);

        const articles = newsData;
        
        if (!articles || articles.length === 0) {
            newsWrapper.innerHTML = `<p class="info-message">No blog articles found.</p>`;
            return;
        }

        let allNewsHTML = '';

        articles.forEach(article => {
            const imageUrl = `https://picsum.photos/400/200?random=${article.id}`;
            
            const articleTitle = article.title;
            const articleBody = article.body;
            
            allNewsHTML += `
                <div class="blog-card">
                    <img src="${imageUrl}" alt="${articleTitle}">
                    <div class="blog-info">
                        <h4>${articleTitle}</h4>
                        <p>${articleBody}</p>
                        <button class="read-btn">Read More <i class='bx bx-right-arrow-alt'></i></button>
                    </div>
                </div>`;
        });

        newsWrapper.innerHTML = allNewsHTML;
        
    } catch (error) {
        console.error("Error fetching blog posts with photos:", error);
        if (newsWrapper) {
            newsWrapper.innerHTML = `<p class="error-message">Failed to load blog posts. Please try again later.</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', fetchNews);



const featureProdAPI = `https://dummyjson.com/products?fashion&limit=10&skip=0`;
const prodCarousel = document.querySelector(".product-carousel");

async function fetchProd() {
  try {
    if (!prodCarousel) {
      console.error("Element with class 'product-carousel' not found.");
      return;
    }

    prodCarousel.innerHTML = 'Loading featured products...';

    const responseProd = await fetch(featureProdAPI);

    if (!responseProd.ok) {
      throw new Error(`HTTP Error: ${responseProd.status}`);
    }

    const prodData = await responseProd.json();
    const products = prodData.products;

    let allProdHTML = '';

    products.forEach(product => {
      const imageUrl = product.images[0] || product.thumbnail;
      const { title, price, discountPercentage, rating } = product;

      allProdHTML += `
        <div class="product-card">
          <div class="discount-badge">${Math.round(discountPercentage)}% OFF</div>
          <img src="${imageUrl}" alt="${title}">
          <div class="product-info">
            <div class="rating">⭐ ${rating.toFixed(1)}</div>
            <h4>${title}</h4>
            <div class="price">₱${price.toLocaleString()}</div>
          </div>
        </div>`;
    });

    prodCarousel.innerHTML = allProdHTML;

  } catch (error) {
    console.error("Error fetching products:", error);
    prodCarousel.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchProd);

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});
