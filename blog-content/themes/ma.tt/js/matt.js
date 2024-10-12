/**
 * Functionality for the "Show More" button on the categorized links component.
 */
document.addEventListener("DOMContentLoaded", function() {
	const categorizedLinksContainers = document.querySelectorAll(".categorized-links");

	categorizedLinksContainers.forEach((container, index) => {
		container.setAttribute("data-index", index + 1);

		const rightContainer = container.querySelector(".right");
		const items = rightContainer.querySelectorAll(".wp-block-columns");

		items.forEach((item, index) => {
			if (index >= 12) {
				item.classList.add("hidden");
			} else {
				item.classList.add("visible");
			}
		});

		const showMoreButton = document.createElement("button");
		showMoreButton.className = "show-more-button";
		showMoreButton.innerText = "Show more";
		showMoreButton.setAttribute("aria-expanded", "false");
		showMoreButton.setAttribute("aria-controls", `links-list-${index + 1}`);

		if ( items.length > 12 ) {
			rightContainer.appendChild(showMoreButton);
			container.classList.add("has-more");
		}

		let visibleLinks = 12;

		showMoreButton.addEventListener("click", function() {
			visibleLinks += 24;

			items.forEach((item, index) => {
				if (index < visibleLinks && item.classList.contains("hidden")) {
					item.classList.remove("hidden");
					item.classList.add("fade-in");
					setTimeout(() => {
						item.classList.add("visible");
						item.classList.remove("fade-in");
					}, 25 * (index - (visibleLinks - 12)));
				}
			});

			if (visibleLinks >= items.length) {
				showMoreButton.style.display = "none";
				container.classList.remove("has-more");
			} else {
				showMoreButton.setAttribute("aria-expanded", "true");
			}
		});
	});
});