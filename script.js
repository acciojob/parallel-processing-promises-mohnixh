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
                img.src = url;

                img.onload = () => resolve(img);
                img.onerror = () => reject(`❌ Failed to load image: ${url}`);
            });
        }

        function downloadImages() {
            output.innerHTML = "";
            errorDiv.innerHTML = "";
            loadingDiv.style.display = "block";

            return Promise.all(imageUrls.map(downloadImage))
                .then((images) => {
                    loadingDiv.style.display = "none";
                    images.forEach((img) => output.appendChild(img));
                })
                .catch((err) => {
                    loadingDiv.style.display = "none";
                    errorDiv.innerHTML = err;
                });
        }

        btn.addEventListener("click", downloadImages);