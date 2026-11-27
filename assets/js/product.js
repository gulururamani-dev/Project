/* =====================================================
   VIEW MORE / VIEW LESS PRODUCTS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const extraProducts = document.querySelectorAll(".extra-product");

    if (!viewMoreBtn || extraProducts.length === 0) {
        return;
    }

    viewMoreBtn.addEventListener("click", function () {

        const isExpanded =
            viewMoreBtn.classList.contains("expanded");

        if (!isExpanded) {

            extraProducts.forEach(function (product) {
                product.classList.add("show-product");
            });

            viewMoreBtn.classList.add("expanded");

            viewMoreBtn.innerHTML = `
                View Less Products
                <i class="bi bi-chevron-up"></i>
            `;

        } else {

            extraProducts.forEach(function (product) {
                product.classList.remove("show-product");
            });

            viewMoreBtn.classList.remove("expanded");

            viewMoreBtn.innerHTML = `
                View More Products
                <i class="bi bi-chevron-down"></i>
            `;

            /* Scroll slightly back to products */
            document.getElementById("productsGrid")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }

    });

});