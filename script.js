const output = document.getElementById("output");
        const errorDiv = document.getElementById("error");
        const loadingDiv = document.getElementById("loading");
        const btn = document.getElementById("download-images-button");

        const imageUrls = [
            "https://picsum.photos/id/237/200/300",
            "https://picsum.photos/id/238/200/300",
            "https://picsum.photos/id/239/200/300"
            // Uncomment the line below to test error handling:
            // "https://picsum.photos/id/999999/200/300" // broken one to test error
        ];

        function downloadImage(url, index) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                // Add loading timeout
                const timeout = setTimeout(() => {
                    reject(`⏱️ Timeout: Failed to load image ${index + 1} from ${url}`);
                }, 10000); // 10 second timeout

                img.onload = () => {
                    clearTimeout(timeout);
                    resolve(img);
                };

                img.onerror = () => {
                    clearTimeout(timeout);
                    reject(`❌ Failed to load image ${index + 1}: ${url}`);
                };

                img.src = url;
            });
        }

        function downloadImages() {
            // Clear previous results
            output.innerHTML = "";
            errorDiv.innerHTML = "";
            errorDiv.classList.remove("show");
            
            // Show loading state
            loadingDiv.style.display = "block";
            btn.disabled = true;
            btn.textContent = "Downloading...";

            // Create promises for all images with their index
            const downloadPromises = imageUrls.map((url, index) => 
                downloadImage(url, index)
            );

            return Promise.all(downloadPromises)
                .then((images) => {
                    // Hide loading state
                    loadingDiv.style.display = "none";
                    btn.disabled = false;
                    btn.textContent = "Download Images";
                    
                    // Add images directly to output without success message
                    images.forEach((img, index) => {
                        img.style.animationDelay = `${index * 0.1}s`;
                        output.appendChild(img);
                    });
                })
                .catch((err) => {
                    // Hide loading state and show error
                    loadingDiv.style.display = "none";
                    btn.disabled = false;
                    btn.textContent = "Try Again";
                    errorDiv.innerHTML = err;
                    errorDiv.classList.add("show");
                    
                    console.error("Image download error:", err);
                });
        }

        // Add click event listener
        btn.addEventListener("click", downloadImages);

        // Optional: Auto-load images on page load
        // downloadImages();