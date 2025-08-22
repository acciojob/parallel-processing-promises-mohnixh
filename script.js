const output = document.getElementById("output");
        const errorDiv = document.getElementById("error");
        const loadingDiv = document.getElementById("loading");
        const btn = document.getElementById("download-images-button");

        const imageUrls = [
            "https://picsum.photos/id/237/200/300",
            "https://picsum.photos/id/238/200/300",
            "https://picsum.photos/id/239/200/300"
        ];

        function downloadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                
                img.onload = () => resolve(img);
                img.onerror = () => reject(`❌ Failed to load image: ${url}`);
                
                img.src = url;
            });
        }

        function downloadImages() {
            console.log("downloadImages called");
            output.innerHTML = "";
            errorDiv.innerHTML = "";
            loadingDiv.style.display = "block";

            const promises = imageUrls.map(downloadImage);
            console.log("Created promises:", promises);

            Promise.all(promises)
                .then((images) => {
                    console.log("All images loaded:", images);
                    loadingDiv.style.display = "none";
                    images.forEach((img) => {
                        console.log("Appending image:", img.src);
                        output.appendChild(img);
                    });
                })
                .catch((err) => {
                    console.error("Error loading images:", err);
                    loadingDiv.style.display = "none";
                    errorDiv.innerHTML = err;
                });
        }

        btn.addEventListener("click", downloadImages);